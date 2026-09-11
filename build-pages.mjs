// Assembles the site's document pages (privacy + support, per product) from the shared
// docpage.css, the wordmark lifted out of index.html, and one body fragment each.
// Re-run this rather than hand-editing the generated pages.
//
// Two products are served from this site now (2026-09-11): the Monochrome bridge companion, whose
// pages are IDML Export's and keep the bare /privacy/ and /support/ paths they launched on, and
// Frame Multiplier, a Figma plugin with no companion at all, under /frame-multiplier/. Paths are
// never moved once a Figma listing points at them.
//
// Each page carries its own crumb, footer links and footer note, and `up` — the relative prefix
// back to the site root, from the depth of its own directory — so a nested page's links resolve.
import fs from 'node:fs';

const here = new URL("./", import.meta.url).pathname;
const read = (p) => fs.readFileSync(here + p, 'utf8');

const css = read("src/docpage.css");
const wordmark = read("src/wordmark.svg");

const PAGES = [
  {
    dir: 'privacy',
    body: 'privacy-body.html',
    title: 'IDML Export — Privacy Policy',
    desc: 'IDML Export collects nothing. Everything happens on your own computer — what the plugin and the Monochrome bridge companion do with your data, in full.',
    footerLinks: (up) => `<a href="${up}">Download</a>·<a href="${up}privacy/">Privacy</a>·<a href="${up}support/">Support</a>`,
    footerNote: 'Monochrome bridge · part of the Monochrome Studio Tools plugin family',
  },
  {
    dir: 'support',
    body: 'support-body.html',
    title: 'IDML Export — Support',
    desc: 'Troubleshooting for IDML Export and the Monochrome bridge companion app: install, pairing, the idle timeout, port conflicts, and export problems.',
    footerLinks: (up) => `<a href="${up}">Download</a>·<a href="${up}privacy/">Privacy</a>·<a href="${up}support/">Support</a>`,
    footerNote: 'Monochrome bridge · part of the Monochrome Studio Tools plugin family',
  },
  {
    dir: 'frame-multiplier/privacy',
    body: 'frame-multiplier-privacy-body.html',
    title: 'Frame Multiplier — Privacy Policy',
    desc: 'Frame Multiplier makes no network connections at all. Everything it works out is stored inside your own Figma file — what is written there, in full.',
    footerLinks: (up) => `<a href="${up}frame-multiplier/privacy/">Privacy</a>·<a href="${up}frame-multiplier/support/">Support</a>·<a href="${up}">Monochrome bridge</a>`,
    footerNote: 'Frame Multiplier · part of the Monochrome Studio Tools plugin family',
  },
  {
    dir: 'frame-multiplier/support',
    body: 'frame-multiplier-support-body.html',
    title: 'Frame Multiplier — Support',
    desc: 'Troubleshooting for Frame Multiplier: the masters page, frames that keep saying updates available, layouts that come out wrong, and the trial.',
    footerLinks: (up) => `<a href="${up}frame-multiplier/privacy/">Privacy</a>·<a href="${up}frame-multiplier/support/">Support</a>·<a href="${up}">Monochrome bridge</a>`,
    footerNote: 'Frame Multiplier · part of the Monochrome Studio Tools plugin family',
  },
];

for (const page of PAGES) {
  const up = '../'.repeat(page.dir.split('/').length);
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${page.title}</title>
<meta name="description" content="${page.desc}">
<style>
${css}</style>
</head>
<body>
<div class="hero-band" aria-hidden="true">
  ${wordmark}
</div>
<div class="wrap">

${read("src/" + page.body)}
  <footer>
    ${page.footerLinks(up)}
    <div style="margin-top:10px">${page.footerNote}</div>
  </footer>

</div>
</body>
</html>
`;
  const outDir = `${here}${page.dir}`;
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(`${outDir}/index.html`, html);
  console.log(`${page.dir}/index.html  ${html.length} bytes`);
}
