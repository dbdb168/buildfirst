// Builds the BuildFirst site into the repo root: one folder per page with an index.html.
// Run: node site-src/build.mjs   (REVIEW=0 node site-src/build.mjs for the real deploy)
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout } from './layout.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const files = readdirSync(join(here, 'pages')).filter((f) => f.endsWith('.mjs')).sort();
for (const f of files) {
  const page = (await import(join(here, 'pages', f))).default;
  const out = page.path === '/' ? join(root, 'index.html') : join(root, page.path.slice(1), 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  const html = layout(page);
  if (/\{\{|TODO|undefined/.test(html)) console.warn(`  check ${page.path}: placeholder or undefined in output`);
  writeFileSync(out, html);
  console.log(`built ${page.path}`);
}
