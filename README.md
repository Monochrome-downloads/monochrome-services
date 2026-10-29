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

This site now serves the document pages for **two products**: the companion itself (whose privacy
and support pages are IDML Export's) and **Frame Multiplier**, a Figma plugin with no companion at
all — it is here because this is where the family's pages live, and Figma requires a public
privacy-policy URL for a paid plugin.

- [`index.html`](https://monochrome-downloads.github.io/monochrome-services/) — download + setup.
  Hand-maintained, including the hero dot-field script.
- [`privacy/`](https://monochrome-downloads.github.io/monochrome-services/privacy/) and
  [`support/`](https://monochrome-downloads.github.io/monochrome-services/support/) — IDML Export /
  the companion. **Generated.**
- [`frame-multiplier/privacy/`](https://monochrome-downloads.github.io/monochrome-services/frame-multiplier/privacy/)
  and [`frame-multiplier/support/`](https://monochrome-downloads.github.io/monochrome-services/frame-multiplier/support/)
  — Frame Multiplier. **Generated.** (Added 2026-09-11.)
- [`one-percent/privacy/`](https://monochrome-downloads.github.io/monochrome-services/one-percent/privacy/)
  and [`one-percent/support/`](https://monochrome-downloads.github.io/monochrome-services/one-percent/support/)
  — One Percent, the iPhone and Apple Watch gym tracker. **Generated.** (Added 2026-10-11.) The app's
  Settings and its App Store listing point at these URLs.
- [`assemblr/privacy/`](https://monochrome-downloads.github.io/monochrome-services/assemblr/privacy/)
  and [`assemblr/licence/`](https://monochrome-downloads.github.io/monochrome-services/assemblr/licence/)
  — Assemblr, the Adobe InDesign and Photoshop plugin. **Generated.** (Added 2026-10-29.) Its Adobe
  listings point at these URLs; `assemblr/Assemblr-reviewer-samples.zip` beside them is the sample
  files the listing's reviewer note links to (drawn by a script, no third-party brands).

For every generated page: edit `src/*-body.html` (or `src/docpage.css`) and run
`node build-pages.mjs`; **do not hand-edit any `index.html` under those directories.** Each page's
title, description, footer links and footer note are in `build-pages.mjs`'s `PAGES` list, and its
links back to the site root are computed from its own directory depth, so a nested page resolves.

**A published path is never moved.** A Figma listing points at these URLs, and a listing under
review cannot be corrected quickly.

The prose for all four pages is mirrored in the plugin repo, which is canonical:
`docs/indesign-export-{privacy-policy,support}.md` and
`docs/frame-multiplier-{privacy-policy,support}.md`; Assemblr's is canonical in the Catalogue Producer repo,
`docs/assemblr-privacy.md` and `docs/assemblr-licence.md`. If you change one side, change the other, or
the hosted policy and the repo will drift apart. One Percent's prose is canonical in its own repo, `site/privacy.html` and
`site/support.html`; the same rule applies.
