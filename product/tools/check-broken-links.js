#!/usr/bin/env node
/**
 * check-broken-links.js
 * Finds broken relative markdown links within the product/ directory.
 * Only checks links within product/ — external URLs are skipped.
 * Usage: node product/tools/check-broken-links.js
 */

const fs = require('fs');
const path = require('path');

const PRODUCT_DIR = path.join(__dirname, '..');

function walkDir(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath));
    } else if (entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

// Extract all relative markdown links from content: [text](path)
function extractLinks(content) {
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[2];
    // Skip external URLs, anchors-only, and email links
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) continue;
    // Strip anchor from path
    const linkPath = href.split('#')[0];
    if (linkPath) links.push(linkPath);
  }
  return links;
}

let errors = 0;
let checked = 0;
const files = walkDir(PRODUCT_DIR);

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const links = extractLinks(content);
  const fileDir = path.dirname(filePath);

  for (const link of links) {
    checked++;
    const resolved = path.resolve(fileDir, link);
    if (!fs.existsSync(resolved)) {
      const relativeSrc = path.relative(path.join(PRODUCT_DIR, '..'), filePath);
      console.log(`[ERROR] ${relativeSrc}: broken link → ${link}`);
      errors++;
    }
  }
}

if (errors === 0) {
  console.log(`[OK] All ${checked} relative links are valid.`);
}

console.log(`Checked: ${checked} links | Errors: ${errors}`);
process.exit(errors > 0 ? 1 : 0);
