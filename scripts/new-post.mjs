// Usage: npm run new -- "My post title"
import { writeFileSync, existsSync, readFileSync } from 'node:fs';

const title = process.argv.slice(2).join(' ').trim();
if (!title) { console.error('Usage: npm run new -- "Post title"'); process.exit(1); }
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const file = `src/content/blog/${slug}.md`;
if (existsSync(file)) { console.error(`${file} already exists`); process.exit(1); }
const today = new Date().toISOString().slice(0, 10);
const body = readFileSync('docs/post-template.md', 'utf8')
  .replace('title: ""', `title: "${title.replace(/"/g, '\\"')}"`)
  .replace('pubDate: YYYY-MM-DD', `pubDate: ${today}`);
writeFileSync(file, body);
console.log(`Created ${file} (draft: true)`);
