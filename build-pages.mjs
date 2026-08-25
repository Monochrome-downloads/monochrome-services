// Assembles privacy/index.html + support/index.html for the Monochrome bridge Pages site from
// the shared docpage.css, the wordmark lifted out of index.html, and the two body fragments.
// Re-run this rather than hand-editing the generated pages.
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
  },
  {
    dir: 'support',
    body: 'support-body.html',
    title: 'IDML Export — Support',
    desc: 'Troubleshooting for IDML Export and the Monochrome bridge companion app: install, pairing, the idle timeout, port conflicts, and export problems.',
  },
];

for (const page of PAGES) {
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
    <a href="../">Download</a>·<a href="../privacy/">Privacy</a>·<a href="../support/">Support</a>
    <div style="margin-top:10px">Monochrome bridge · part of the Monochrome Studio Tools plugin family</div>
  </footer>

</div>
</body>
</html>
`;
  const outDir = `${here}pages-site/${page.dir}`;
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(`${outDir}/index.html`, html);
  console.log(`${page.dir}/index.html  ${html.length} bytes`);
}
