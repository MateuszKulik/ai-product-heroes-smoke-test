const fs = require('fs');
const path = require('path');

const key = process.env.POSTHOG_KEY || '__POSTHOG_KEY__';
if (!process.env.POSTHOG_KEY) {
  console.warn('WARNING: POSTHOG_KEY not set. Using placeholder. Set it in Vercel Dashboard.');
}

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public');

fs.mkdirSync(outDir, { recursive: true });

if (fs.existsSync(path.join(root, 'img'))) {
  fs.cpSync(path.join(root, 'img'), path.join(outDir, 'img'), { recursive: true, force: true });
}

const files = [
  'index.html',
  'products.html',
  'orders.html',
  'stats.html',
  'search-results.html',
];

for (const file of files) {
  const srcPath = path.join(root, file);
  const outPath = path.join(outDir, file);
  let content = fs.readFileSync(srcPath, 'utf-8');
  const replaced = content.replace(/__POSTHOG_KEY__/g, key);
  fs.writeFileSync(outPath, replaced);
  console.log(`OK: ${file}`);
}

console.log('Build complete. Output in public/');
