const fs = require('fs');
const path = require('path');

const key = process.env.POSTHOG_KEY;
if (!key) {
  console.error('ERROR: POSTHOG_KEY environment variable is not set.');
  console.error('Set it in Vercel Dashboard: Project Settings > Environment Variables');
  process.exit(1);
}

const files = [
  'index.html',
  'products.html',
  'orders.html',
  'stats.html',
  'search-results.html',
];

for (const file of files) {
  const filePath = path.join(__dirname, '..', file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const replaced = content.replace(/__POSTHOG_KEY__/g, key);

  if (content === replaced) {
    console.warn(`WARNING: No placeholder found in ${file}`);
  } else {
    fs.writeFileSync(filePath, replaced);
    console.log(`OK: ${file}`);
  }
}

console.log('Done. PostHog key injected.');
