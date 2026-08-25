# Monochrome bridge

Distribution-only repo. This does not contain source code — it hosts the signed, notarized
macOS release of **Monochrome bridge**, the shared local companion app for the Monochrome
Studio Tools Figma plugin family (currently: InDesign Export; more plugins share this same
companion over time rather than shipping their own).

- **Download page:** https://monochrome-downloads.github.io/monochrome-services/
- **Latest release:** https://github.com/Monochrome-downloads/monochrome-services/releases/latest

## What is this?

A small menu-bar helper app. Certain plugin features (like assembling a real `.idml` file) need
to touch the local disk in ways a browser-sandboxed Figma plugin can't do on its own — this app is
the bridge, running only on your own machine, only while you have it open.

- Loopback-only (`127.0.0.1`) — never listens on your network or the internet.
- Token-gated — pairs once with the plugin, rejects everything else.
- No background daemon — it opens when you open it, and stops listening after 60 minutes idle.
  "Launch at login" is an opt-in checkbox in its own menu, off by default; it registers the app
  itself the way any application does, and nothing runs unless you switch it on.

See the download page for setup steps and more detail.

## Pages

- [`index.html`](https://monochrome-downloads.github.io/monochrome-services/) — download + setup.
  Hand-maintained, including the hero dot-field script.
- [`privacy/`](https://monochrome-downloads.github.io/monochrome-services/privacy/) and
  [`support/`](https://monochrome-downloads.github.io/monochrome-services/support/) — **generated.**
  Edit `src/*-body.html` (or `src/docpage.css`) and run `node build-pages.mjs`; do not hand-edit
  `privacy/index.html` or `support/index.html`.

The prose for those two pages is mirrored in the plugin repo as
`docs/indesign-export-privacy-policy.md` and `docs/indesign-export-support.md`. Those are the
canonical wording — if you change one side, change the other, or the hosted policy and the repo
will drift apart.
