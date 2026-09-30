#!/usr/bin/env python3
"""Sync Made With GSAP (madewithgsap.com) effects into the Osmo library, under mwg/ plus INDEX-mwg.md.

Usage: sync_mwg.py              sync everything
       sync_mwg.py slug ...     refresh only these (effect119, free-effect002)
Env:   MWG_EMAIL, MWG_PASSWORD  member login (required for the premium effects)
       OSMO_LIBRARY_DIR         library dir (default ~/.osmo/library)
"""
import os
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from http.cookiejar import CookieJar
from urllib.parse import urlencode
from urllib.request import HTTPCookieProcessor, Request, build_opener

from sync import LIB, Node, inline_children, lang_of, parse


class Locked(Exception):
    pass

BASE = "https://madewithgsap.com"
OUT = LIB / "mwg"
UA = {"User-Agent": "Mozilla/5.0 (osmo-claude-plugin mwg sync)"}
opener = build_opener(HTTPCookieProcessor(CookieJar()))

GSAP_PLUGINS = ["ScrollTrigger", "ScrollToPlugin", "Observer", "Flip", "SplitText", "Draggable", "InertiaPlugin",
                "CustomEase", "MorphSVGPlugin", "MotionPathPlugin", "DrawSVGPlugin", "Physics2DPlugin", "ScrambleTextPlugin"]
OTHER_LIBS = [("Lenis", "Lenis smooth scroll"), ("Matter", "matter-js 0.20.0")]


def fetch(path, data=None, attempts=3):
    body = urlencode(data).encode() if data else None
    for attempt in range(attempts):
        try:
            with opener.open(Request(BASE + path, data=body, headers=UA), timeout=60) as r:
                return r.read().decode("utf-8")
        except Exception:
            if attempt == attempts - 1:
                raise
            time.sleep(2 * (attempt + 1))


def login():
    email, password = os.environ.get("MWG_EMAIL"), os.environ.get("MWG_PASSWORD")
    if not (email and password):
        sys.exit("MWG_EMAIL and MWG_PASSWORD must be set (Made With GSAP member login)")
    fetch("/login")
    res = fetch("/ajax/ajax_login.php", {"form_type": "login", "email": email, "password": password})
    if '"redirect"' not in res:
        sys.exit(f"Made With GSAP login failed: {res[:200]}")


def classes(n):
    return n.attrs.get("class", "").split()


def has_class(name):
    return lambda n: name in classes(n)


def norm_tags(raw):
    return ", ".join(t.strip().title() for t in raw.split(",") if t.strip())


def catalog(root):
    items = {}
    for li in root.walk():
        if li.tag != "li" or "push" not in classes(li):
            continue
        link = li.find(has_class("e-link"))
        tuto = li.find(lambda n: n.tag == "a" and "tutorial" in n.attrs.get("href", ""))
        if not link or not tuto:
            continue
        slug = link.attrs["href"].rstrip("/").rsplit("/", 1)[-1]
        spans = [c for c in link.children if isinstance(c, Node) and c.tag == "span"]
        media = li.find(lambda n: "data-video-src" in n.attrs)
        items[slug] = {
            "slug": slug,
            "tags": norm_tags(spans[1].text()) if len(spans) > 1 else "",
            "tutorial": tuto.attrs["href"],
            "demo": link.attrs["href"],
            "video": media.attrs["data-video-src"] if media else "",
        }
    return items


def md_block(n, blocks):
    if isinstance(n, str):
        return
    if n.tag == "div":
        for c in n.children:
            md_block(c, blocks)
    elif n.tag in ("h2", "h3"):
        blocks.append("### " + inline_children(n).strip())
    elif n.tag == "p":
        txt = inline_children(n).strip()
        txt and blocks.append(txt)
    elif n.tag in ("ul", "ol"):
        items = [re.sub(r"\s+", " ", inline_children(li)).strip()
                 for li in n.children if isinstance(li, Node) and li.tag == "li"]
        items and blocks.append("\n".join(f"- {t}" for t in items))
    elif n.tag == "pre":
        code = n.find(lambda x: x.tag == "code")
        code and blocks.append(f"```{lang_of(code)}\n{code.text().strip()}\n```")


def render(item, root):
    tuto = root.find(has_class("t-tuto"))
    final = tuto and tuto.find(has_class("t-final"))
    if not final:
        raise Locked()
    hero = tuto.find(has_class("t-hero"))
    h1 = hero.find(lambda n: n.tag == "h1")
    title = [c for c in h1.children if isinstance(c, Node)][-1].text().strip()
    desc_el = hero.find(lambda n: n.tag == "p")
    desc = re.sub(r"\s+", " ", desc_el.text()).strip() if desc_el else ""

    code = {}
    for c in final.walk():
        if c.tag == "code":
            code.setdefault(lang_of(c), []).append(c.text().strip())
    code = {lang: "\n\n".join(parts) for lang, parts in code.items()}
    js = code.get("js", "")
    registered = {n.strip() for args in re.findall(r"registerPlugin\(([^)]*)\)", js) for n in args.split(",") if n.strip()}
    plugins = sorted(registered | {p for p in GSAP_PLUGINS if re.search(rf"\b{p}\b", js)})
    deps = (["GSAP core"] if "gsap" in js else []) + [f"GSAP {p}" for p in plugins]
    deps += [label for ident, label in OTHER_LIBS if re.search(rf"\b{ident}\b", js)]

    walkthrough = []
    for c in tuto.children:
        if isinstance(c, Node) and not {"t-hero", "final-anchor"} & set(classes(c)):
            md_block(c, walkthrough)

    meta = {
        "title": title,
        "slug": item["slug"],
        "kind": "mwg",
        "category": item["tags"],
        "description": desc,
        "url": item["tutorial"],
        "preview": item["video"],
        "demo": item["demo"],
    }
    fm = "\n".join(f"{k}: {v}" for k, v in meta.items() if v)
    names = {"html": "HTML", "css": "CSS", "js": "JavaScript"}
    dep_list = "\n".join(f"- {d}" for d in deps)
    parts = [
        f"---\n{fm}\n---\n",
        f"# {title}\n",
        f"{desc}\n" if desc else "",
        f"## Dependencies\n\n{dep_list}\n\nDerived from the globals the JavaScript uses; MWG loads them site-wide and lists none.\n" if deps else "",
        *(f"## {names.get(lang, lang)}\n\n```{lang}\n{body}\n```\n" for lang, body in code.items()),
        "## Documentation\n\n" + "\n\n".join(walkthrough) + "\n" if walkthrough else "",
    ]
    return "\n".join(p for p in parts if p)


def sync_one(item):
    text = render(item, parse(fetch(item["tutorial"][len(BASE):])))
    (OUT / f"{item['slug']}.md").write_text(text)


def frontmatter(path):
    head = path.read_text().split("\n---\n", 1)[0]
    return dict(line.split(": ", 1) for line in head.splitlines()[1:] if ": " in line)


def write_index():
    items = sorted((frontmatter(p) | {"file": p.name} for p in OUT.glob("*.md")), key=lambda m: m["file"])
    lines = [
        f"# Made With GSAP library ({len(items)} effects, synced {time.strftime('%Y-%m-%d')})",
        "",
        f"Files live in `{OUT}`. Each file has frontmatter, then sections: Dependencies, HTML, CSS,",
        "JavaScript (the tutorial's final code), then Documentation (the step-by-step tutorial).",
        "",
        f"## mwg: Made With GSAP ({len(items)})",
        "",
    ]
    for m in items:
        lines.append(f"- mwg/{m['file']} | {m.get('title', '')} | {m.get('category', '')} | {m.get('description', '')}")
    (LIB / "INDEX-mwg.md").write_text("\n".join(lines) + "\n")


def sync_safe(item):
    try:
        sync_one(item)
        print(f"synced mwg/{item['slug']}.md", file=sys.stderr)
    except Locked:
        print(f"locked {item['slug']} (not included in this membership)", file=sys.stderr)
        return "locked", item["slug"]
    except Exception as e:
        print(f"failed {item['slug']}: {e}", file=sys.stderr)
        return "failed", item["slug"]


def main(argv):
    OUT.mkdir(parents=True, exist_ok=True)
    login()
    listing = fetch("/effects")
    if 'class="not-log' in listing:
        sys.exit("Made With GSAP session did not stick after login")
    items = catalog(parse(listing))
    missing = [s for s in argv if s not in items]
    if missing:
        sys.exit(f"unknown slug(s): {', '.join(missing)}")
    wanted = [items[s] for s in argv] if argv else list(items.values())
    print(f"catalog: {len(items)} effects, syncing {len(wanted)}", file=sys.stderr)
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = [r for r in pool.map(sync_safe, wanted) if r]
    write_index()
    print(f"wrote {LIB / 'INDEX-mwg.md'}", file=sys.stderr)
    locked = [s for kind, s in results if kind == "locked"]
    failed = [s for kind, s in results if kind == "failed"]
    if locked:
        print(f"{len(locked)} locked (subscribe to unlock): {', '.join(sorted(locked))}", file=sys.stderr)
    if len(locked) == len(wanted):
        sys.exit("nothing synced: every effect is locked - check the MWG login and membership")
    if failed:
        sys.exit(f"{len(failed)} failed: {', '.join(failed)}")


if __name__ == "__main__":
    main(sys.argv[1:])
