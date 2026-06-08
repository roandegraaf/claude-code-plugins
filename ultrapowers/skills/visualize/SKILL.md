---
name: visualize
description: Spin up a quick low-fidelity HTML mockup served on a local Python server so the user can see an idea during a brainstorm or design discussion. Use when the user says "/visualize", "show me a mockup", "sketch this idea", or wants to see a concept rendered. Token-frugal by design.
---

# Visualize an Idea

A throwaway sketch to make an idea concrete — not production UI. Built to spend **as few tokens as possible**.

## When to run
- The user runs `/visualize <what to show>`.
- `/brainstorm` (or any design chat) may run it **only after the user explicitly approves** — ask first, never auto-launch.

## Token rules — follow strictly
- **One self-contained `.html` file.** Inline everything. To keep markup terse, you may use Tailwind via CDN (`<script src="https://cdn.tailwindcss.com"></script>`); otherwise minimal inline CSS. No build step, no frameworks, no real images (use boxes/placeholders).
- **Low fidelity.** Boxes, labels, placeholder text — a wireframe, not pixel-perfect design. Small.
- **After writing the file, do NOT read it back, and do NOT screenshot it.** The user looks at it in their own browser. Re-reading burns tokens for no gain.
- **Never dump the server log.** The only thing you ever read from it is the last `__pick__` line (see Pick mode) — one filtered line, never the whole file.

## Steps
1. Write the mockup to `.mockups/<slug>.html` (derive `<slug>` from the idea; create the dir).
2. Start the server **once**, detached, logs discarded (reused for the rest of the session):
   ```bash
   mkdir -p .mockups && nohup python3 -m http.server 7331 --directory .mockups >>.mockups/.server.log 2>&1 &
   ```
   If a server is already on the port, this new process just exits quietly — that's fine, the existing one keeps serving. (The log file captures clicks for Pick mode; see below.)
3. Open it (macOS): `open "http://localhost:7331/<slug>.html"`  · Linux: `xdg-open ...`
4. Tell the user the URL in one short line. **To iterate:** overwrite the same file — the user refreshes, no restart needed.

## Pick mode — clickable options

When the point is to **choose** between variants (button styles, layouts, copy, colors), render each option as a clickable element and capture the click without a backend:

- Give each option `data-opt` and an `onclick="pick('<id>')"` with a short, meaningful id.
- Include this once (works with or without Tailwind):
  ```html
  <div id="picked" style="position:fixed;bottom:0;left:0;right:0;padding:8px;text-align:center;font:14px sans-serif;background:#111;color:#fff"></div>
  <script>
  function pick(id){
    fetch('/__pick__/'+encodeURIComponent(id)).catch(function(){});
    document.querySelectorAll('[data-opt]').forEach(function(e){e.style.outline=''});
    event.currentTarget.style.outline='3px solid #10b981';
    document.getElementById('picked').textContent='Selected: '+id+' — Claude will continue automatically…';
  }
  </script>
  ```
- **Auto-continue on click.** Right after opening the page, launch this as a **background Bash command** (`run_in_background: true`). It blocks until a *new* pick lands, prints the chosen id, then exits — which re-invokes you automatically, no message from the user needed:
  ```bash
  base=$(grep -c '__pick__' .mockups/.server.log 2>/dev/null || echo 0)
  for i in $(seq 1 600); do
    n=$(grep -c '__pick__' .mockups/.server.log 2>/dev/null || echo 0)
    [ "$n" -gt "$base" ] && { grep -o '/__pick__/[^ ]*' .mockups/.server.log | tail -1; exit 0; }
    sleep 1
  done
  echo TIMEOUT
  ```
  Tell the user *"click your preferred option — I'll pick it up automatically"* and stop your turn. When the background task returns, parse the trailing segment of `/__pick__/<id>` (URL-encoded) as the choice and continue. `TIMEOUT` (~10 min) means they didn't click — ask if they still want to.

> The server returns 404 for `/__pick__/…` — expected; we only care that it logged the request. This needs the server logging to `.mockups/.server.log` (the start command above does this). If an older server is still running with logs discarded, restart it: `lsof -ti:7331 | xargs kill` then re-run the start command.

## Notes
- Mockups live in `.mockups/` (HTML + `.server.log`) — transient. Suggest adding it to `.gitignore` if the repo is committed.
- The server runs for the session. Stop it (or clear a stale one serving the wrong folder) with: `lsof -ti:7331 | xargs kill`.
- If `python3` isn't found, fall back to `python`.
