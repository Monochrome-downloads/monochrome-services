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
- No login-item / no background daemon — opens when you open it, auto-stops after 30 min idle.

See the download page for setup steps and more detail.
