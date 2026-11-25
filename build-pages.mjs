// Assembles the site's document pages (privacy, support, licence, per product) from one body fragment
// each, on the Monochrome website's design (since 2026-11-23): every page links assets/css/main.css,
// published here by ms-website's `npm run bridge` with the download page, and inlines src/docpage.css
// for the long-form type. Each product has a local nav (NAV below) and the house footer.
// Re-run this rather than hand-editing the generated pages.
//
// Two products are served from this site now (2026-09-11): the Monochrome bridge companion, whose
// pages are IDML Export's and keep the bare /privacy/ and /support/ paths they launched on, and
// Frame Multiplier, a Figma plugin with no companion at all, under /frame-multiplier/. Paths are
// never moved once a Figma listing points at them. One Percent, an iOS app, followed on 2026-10-11 under
// /one-percent/; the app's Settings and its App Store listing point at those paths.
// Assemblr, an Adobe InDesign and Photoshop plugin, followed on 2026-10-29 under /assemblr/ (privacy and
// licence, with the reviewer's sample files beside them); its Adobe listings point at those paths.
// Automated Assemblr, an Adobe InDesign plugin, followed on 2026-11-09 under /automated-assemblr/ (privacy and licence).
//
// Each page carries its own crumb, footer links and footer note, and `up` — the relative prefix
// back to the site root, from the depth of its own directory — so a nested page's links resolve.
import fs from 'node:fs';

const here0 = new URL("./", import.meta.url).pathname;
const read = (p) => fs.readFileSync(here0 + p, 'utf8');

const css = read("src/docpage.css");
const year = new Date().getFullYear();
const DMG = 'https://github.com/Monochrome-downloads/monochrome-services/releases/latest/download/Monochrome-bridge.dmg';

// Each product's local nav: its name (linked to `home`, relative to the site root, when it has a page
// here), its pages, and a button. The same links are repeated in the footer, because the site's local
// nav hides its links on a phone.
const NAV = {
  bridge: {
    title: 'Monochrome Bridge', home: '',
    links: [['Privacy', 'privacy/'], ['Support', 'support/']],
    footer: [['Download page', '']],
    button: ['Download', DMG],
  },
  'frame-multiplier': { title: 'Frame Multiplier', links: [['Privacy', 'frame-multiplier/privacy/'], ['Support', 'frame-multiplier/support/']] },
  'one-percent': { title: 'One Percent', links: [['Privacy', 'one-percent/privacy/'], ['Support', 'one-percent/support/']] },
  assemblr: { title: 'Assemblr', links: [['Privacy', 'assemblr/privacy/'], ['Licence', 'assemblr/licence/']] },
  'automated-assemblr': { title: 'Automated Assemblr', links: [['Privacy', 'automated-assemblr/privacy/'], ['Licence', 'automated-assemblr/licence/']] },
};

const PAGES = [
  {
    dir: 'privacy',
    nav: 'bridge',
    body: 'privacy-body.html',
    title: 'IDML Export — Privacy Policy',
    desc: 'IDML Export collects nothing. Everything happens on your own computer — what the plugin and the Monochrome bridge companion do with your data, in full.',
    footerNote: 'IDML Export · a plugin for Figma, with Monochrome Bridge for Mac',
  },
  {
    dir: 'support',
    nav: 'bridge',
    body: 'support-body.html',
    title: 'IDML Export — Support',
    desc: 'Troubleshooting for IDML Export and the Monochrome bridge companion app: install, pairing, the idle timeout, port conflicts, and export problems.',
    footerNote: 'IDML Export · a plugin for Figma, with Monochrome Bridge for Mac',
  },
  {
    dir: 'frame-multiplier/privacy',
    nav: 'frame-multiplier',
    body: 'frame-multiplier-privacy-body.html',
    title: 'Frame Multiplier — Privacy Policy',
    desc: 'Frame Multiplier makes no network connections at all. Everything it works out is stored inside your own Figma file — what is written there, in full.',
    footerNote: 'Frame Multiplier · a plugin for Figma',
  },
  {
    dir: 'frame-multiplier/support',
    nav: 'frame-multiplier',
    body: 'frame-multiplier-support-body.html',
    title: 'Frame Multiplier — Support',
    desc: 'Troubleshooting for Frame Multiplier: the masters page, frames that keep saying updates available, layouts that come out wrong, and the trial.',
    footerNote: 'Frame Multiplier · a plugin for Figma',
  },
  {
    dir: 'one-percent/privacy',
    nav: 'one-percent',
    body: 'one-percent-privacy-body.html',
    title: 'One Percent — Privacy Policy',
    desc: 'One Percent keeps your workouts and Health data on your iPhone and Apple Watch. What leaves the device, only if you join a training group, in full.',
    footerNote: 'One Percent · a gym tracker for iPhone and Apple Watch',
  },
  {
    dir: 'one-percent/support',
    nav: 'one-percent',
    body: 'one-percent-support-body.html',
    title: 'One Percent — Support',
    desc: 'Help for One Percent: the Apple Watch, Apple Health permissions, deleting group data, and switching between kilograms and pounds.',
    footerNote: 'One Percent · a gym tracker for iPhone and Apple Watch',
  },
  {
    dir: 'assemblr/privacy',
    nav: 'assemblr',
    body: 'assemblr-privacy-body.html',
    title: 'Assemblr — Privacy Policy',
    desc: 'Assemblr runs entirely on your computer: no account, no network access, no analytics. What it reads and stores, and where, in full.',
    footerNote: 'Assemblr · a plugin for Adobe InDesign and Photoshop',
  },
  {
    dir: 'assemblr/licence',
    nav: 'assemblr',
    body: 'assemblr-licence-body.html',
    title: 'Assemblr — Licence Agreement',
    desc: 'The licence agreement for Assemblr and Assemblr for Photoshop: what a purchase lets you do, and what it does not.',
    footerNote: 'Assemblr · a plugin for Adobe InDesign and Photoshop',
  },
  {
    dir: 'automated-assemblr/privacy',
    nav: 'automated-assemblr',
    body: 'automated-assemblr-privacy-body.html',
    title: 'Automated Assemblr — Privacy Policy',
    desc: 'Automated Assemblr runs entirely on your computer: no account, no network access, no analytics. What it reads, writes and stores, and where, in full.',
    footerNote: 'Automated Assemblr · a plugin for Adobe InDesign',
  },
  {
    dir: 'automated-assemblr/licence',
    nav: 'automated-assemblr',
    body: 'automated-assemblr-licence-body.html',
    title: 'Automated Assemblr — Licence Agreement',
    desc: 'The licence agreement for Automated Assemblr: what a purchase lets you do, and what it does not.',
    footerNote: 'Automated Assemblr · a plugin for Adobe InDesign',
  },
];

for (const page of PAGES) {
  const up = '../'.repeat(page.dir.split('/').length);
  const nav = NAV[page.nav];
  const here = page.dir + '/';
  const link = ([label, path]) => `<a href="${up}${path}"${path === here ? ' class="is-current" aria-current="page"' : ''}>${label}</a>`;
  const title = nav.home === undefined
    ? `<span class="localnav-title">${nav.title}</span>`
    : `<a class="localnav-title" href="${up}${nav.home}">${nav.title}</a>`;
  const button = nav.button ? `\n      <a class="button button-small" href="${nav.button[1]}">${nav.button[0]}</a>` : '';
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page.title}</title>
<meta name="description" content="${page.desc}">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="${up}favicon.svg" type="image/svg+xml">
<link rel="preload" href="${up}assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${up}assets/css/main.css">
<style>
${css}</style>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<nav class="localnav theme-light" aria-label="${nav.title}">
  <div class="localnav-content">
    ${title}
    <div class="localnav-menu">
      <ul class="localnav-links">${nav.links.map((l) => `<li>${link(l)}</li>`).join('')}</ul>${button}
    </div>
  </div>
</nav>
<main id="main" class="doc theme-light">
<div class="container doc-col">

${read("src/" + page.body)}
</div>
</main>
<footer class="footer">
  <div class="footer-content">
    <nav class="doc-footer-links" aria-label="${nav.title} pages">${[...(nav.footer || []), ...nav.links].map(([label, path]) => `<a href="${up}${path}">${label}</a>`).join('')}</nav>
    <div class="footer-legal doc-footer-legal">
      <p>${page.footerNote}</p>
      <p>Copyright © ${year} Monochrome Systems. All rights reserved.</p>
    </div>
  </div>
</footer>
</body>
</html>
`;
  const outDir = `${here0}${page.dir}`;
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(`${outDir}/index.html`, html);
  console.log(`${page.dir}/index.html  ${html.length} bytes`);
}
