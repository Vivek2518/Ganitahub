const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const calcDir = path.join(process.cwd(), 'src', 'calculators');
function listJson(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...listJson(p));
    else if (ent.isFile() && ent.name.endsWith('.json')) out.push(p);
  }
  return out;
}

const files = listJson(calcDir);
const slugs = files.map((f) => path.basename(f, '.json'));
const missing = [];
for (const slug of slugs) {
  const expectedPrefix = `${slug}-calculator`;
  const found = urls.find((u) => u.endsWith(`/${expectedPrefix}`));
  if (!found) missing.push(slug);
}

console.log('Total calculators:', slugs.length);
console.log('Total sitemap URLs:', urls.length);
console.log('Missing in sitemap:', missing.length);
if (missing.length > 0) {
  console.log('Missing slugs:');
  console.log(missing.join('\n'));
}
