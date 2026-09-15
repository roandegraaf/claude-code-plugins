#!/usr/bin/env python3
"""Sync the Osmo Supply Vault into a local markdown library (one file per resource + INDEX.md).

Usage: sync.py            sync everything
       sync.py slug ...   refresh only these slugs
Env:   OSMO_LIBRARY_DIR   output dir (default ~/.osmo/library)
"""
import os
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen

BASE = "https://www.osmo.supply"
LIB = Path(os.environ.get("OSMO_LIBRARY_DIR", Path.home() / ".osmo" / "library"))
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


def fetch(path, attempts=3):
    req = Request(BASE + path, headers={"User-Agent": "Mozilla/5.0 (osmo-claude-plugin sync)"})
    for attempt in range(attempts):
        try:
            with urlopen(req, timeout=60) as r:
                return r.read().decode("utf-8")
        except Exception:
            if attempt == attempts - 1:
                raise
            time.sleep(2 * (attempt + 1))


class Node:
    __slots__ = ("tag", "attrs", "children", "parent")

    def __init__(self, tag, attrs=(), parent=None):
        self.tag, self.attrs, self.children, self.parent = tag, dict(attrs), [], parent

    def text(self):
        return "".join(c if isinstance(c, str) else c.text() for c in self.children)

    def walk(self):
        for c in self.children:
            if isinstance(c, Node):
                yield c
                yield from c.walk()

    def find(self, pred):
        return next((n for n in self.walk() if pred(n)), None)


class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = self.cur = Node("root")

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.cur)
        self.cur.children.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        self.cur.children.append(Node(tag, attrs, self.cur))

    def handle_endtag(self, tag):
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.cur = n.parent

    def handle_data(self, data):
        self.cur.children.append(data)


def parse(src):
    t = Tree()
    t.feed(src)
    return t.root


def catalog(root):
    items = {}
    for n in root.walk():
        a = n.attrs
        slug = a.get("sm-resource-slug")
        if not slug or slug in items:
            continue
        if a.get("sm-type-buttons") == "true":
            kind, cat, url = "button", "Button Pack", f"/button-pack/{slug}"
        elif a.get("sm-type-snippets") == "true":
            kind, cat, url = "snippet", a.get("sm-snippets-cat-title") or "Snippets", f"/resource/{slug}"
        elif a.get("sm-type-vault") == "true":
            kind, cat, url = "vault", a.get("sm-vault-cat-title") or "Uncategorized", f"/resource/{slug}"
        else:
            kind, cat, url = "tutorial", "Tutorials", f"/resource/{slug}"
        preview = n.find(lambda x: "sm-resource-preview-link" in x.attrs)
        preview = preview.attrs.get("href", "") if preview else ""
        items[slug] = {
            "slug": slug,
            "title": a.get("sm-resource-title", slug),
            "kind": kind,
            "category": cat,
            "keywords": a.get("sm-resource-keywords", ""),
            "date": a.get("sm-res-date", ""),
            "url": BASE + url,
            "preview": "" if preview == "#" else preview,
        }
    return items


def context(root, name):
    return root.find(lambda n: n.attrs.get("data-dash-context") == name)


def code_of(root, name):
    el = context(root, name)
    code = el and el.find(lambda n: n.tag == "code")
    return code.text().strip() if code else ""


def lang_of(code):
    m = re.search(r"language-([a-z0-9-]+)", code.attrs.get("class", ""), re.I)
    lang = m.group(1).lower() if m else ""
    return {"htmlbars": "html", "xml": "html", "javascript": "js"}.get(lang, lang)


def inline(n):
    if isinstance(n, str):
        return n
    if n.tag == "br":
        return "\n"
    if n.tag == "code":
        return "`" + re.sub(r"\n+", " ", n.text()).strip() + "`"
    if n.tag in ("strong", "b"):
        return "**" + inline_children(n) + "**"
    if n.tag in ("em", "i"):
        return "*" + inline_children(n) + "*"
    if n.tag == "a":
        href = n.attrs.get("href")
        txt = inline_children(n).strip() or href or ""
        return f"[{txt}]({href})" if href else txt
    return inline_children(n)


def inline_children(n):
    return "".join(inline(c) for c in n.children)


def docs_of(root):
    el = context(root, "documentation")
    if not el:
        return ""
    blocks = []

    def block(n):
        if isinstance(n, str):
            return
        if "dash-command" in n.attrs.get("class", "").split():
            return
        if n.tag == "div":
            for c in n.children:
                block(c)
        elif n.tag in ("h2", "h3"):
            txt = inline_children(n).strip()
            txt and blocks.append("### " + txt)
        elif n.tag in ("h4", "h5"):
            txt = inline_children(n).strip()
            txt and blocks.append("#### " + txt)
        elif n.tag == "p":
            txt = re.sub(r"\n{3,}", "\n\n", inline_children(n)).strip()
            txt and blocks.append(txt)
        elif n.tag in ("ul", "ol"):
            items = [re.sub(r"\s+", " ", inline_children(li)).replace("‍", "").strip()
                     for li in n.children if isinstance(li, Node) and li.tag == "li"]
            items = [f"- {t}" for t in items if t]
            items and blocks.append("\n".join(items))
        elif n.tag == "pre":
            code = n.find(lambda x: x.tag == "code")
            body = code.text().strip() if code else ""
            body and blocks.append(f"```{lang_of(code)}\n{body}\n```")
        else:
            txt = inline_children(n).strip()
            txt and blocks.append(txt)

    for c in el.children:
        block(c)
    return re.sub(r"\n{3,}", "\n\n", "\n\n".join(blocks)).strip()


def section(title, lang, body):
    return f"## {title}\n\n```{lang}\n{body}\n```\n" if body else ""


def render(item, root):
    fm = "\n".join(f"{k}: {item[k]}" for k in ("title", "slug", "kind", "category", "keywords", "url", "preview", "date") if item[k])
    docs = docs_of(root)
    parts = [
        f"---\n{fm}\n---\n",
        f"# {item['title']}\n",
        section("Dependencies (External Scripts)", "html", code_of(root, "external-scripts")),
        section("HTML", "html", code_of(root, "html")),
        section("CSS", "css", code_of(root, "css")),
        section("JavaScript", "js", code_of(root, "js")),
        section("Webflow Custom CSS", "css", code_of(root, "webflow-custom-css")),
        f"## Documentation\n\n{docs}\n" if docs else "",
        section("Barba.js Boilerplate HTML", "html", code_of(root, "barbajs-boilerplate-html")),
        section("Barba.js Boilerplate JavaScript", "js", code_of(root, "barbajs-boilerplate-js")),
    ]
    return "\n".join(p for p in parts if p)


def rel_path(item):
    return f"{item['kind']}/{item['slug']}.md"


def sync_one(item):
    root = parse(fetch(item["url"][len(BASE):]))
    out = LIB / rel_path(item)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(render(item, root))
    return item["slug"]


def write_index(items):
    by_group = {}
    for it in sorted(items.values(), key=lambda i: (i["kind"], i["category"], i["title"])):
        by_group.setdefault((it["kind"], it["category"]), []).append(it)
    lines = [
        f"# Osmo Supply library ({len(items)} resources, synced {time.strftime('%Y-%m-%d')})",
        "",
        f"Files live in `{LIB}`. Read one with `cat {LIB}/<path>`. Each file has frontmatter,",
        "then sections: Dependencies (External Scripts), HTML, CSS, JavaScript, Webflow Custom CSS, Documentation.",
        "",
    ]
    for (kind, cat), group in by_group.items():
        lines += [f"## {kind}: {cat} ({len(group)})", ""]
        for it in group:
            kw = f" | {it['keywords']}" if it["keywords"] else ""
            lines.append(f"- {rel_path(it)} | {it['title']}{kw}")
        lines.append("")
    (LIB / "INDEX.md").write_text("\n".join(lines))


def sync_safe(item):
    try:
        sync_one(item)
        print("synced " + rel_path(item), file=sys.stderr)
    except Exception as e:
        print(f"failed {item['slug']}: {e}", file=sys.stderr)
        return item["slug"]


def main(argv):
    LIB.mkdir(parents=True, exist_ok=True)
    items = catalog(parse(fetch("/resource/3d-cards-tornado")))
    missing = [s for s in argv if s not in items]
    if missing:
        sys.exit(f"unknown slug(s): {', '.join(missing)}")
    wanted = [items[s] for s in argv] if argv else list(items.values())
    print(f"catalog: {len(items)} resources, syncing {len(wanted)}", file=sys.stderr)
    with ThreadPoolExecutor(max_workers=4) as pool:
        failed = [s for s in pool.map(sync_safe, wanted) if s]
    write_index(items)
    print(f"wrote {LIB / 'INDEX.md'}", file=sys.stderr)
    if failed:
        sys.exit(f"{len(failed)} failed: {', '.join(failed)}")


if __name__ == "__main__":
    main(sys.argv[1:])
