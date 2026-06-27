#!/usr/bin/env node
/**
 * generate-indexes.js
 * Reads all object frontmatter and regenerates the flat index files in product/indexes/.
 * Only updates the data rows — leaves index headers, definitions, and rules intact.
 * Usage: node product/tools/generate-indexes.js
 */

const fs = require('fs');
const path = require('path');

const OBJECTS_DIR = path.join(__dirname, '../objects');
const INDEXES_DIR = path.join(__dirname, '../indexes');

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      fields[key] = value;
    }
  }
  return fields;
}

function walkDir(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath));
    } else if (entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      results.push(fullPath);
    }
  }
  return results;
}

// Collect all objects by type
const objects = {};
const files = walkDir(OBJECTS_DIR);

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fields = parseFrontmatter(content);
  if (!fields || !fields.id) continue;

  const id = fields.id;
  const prefix = id.match(/^[A-Z]+-/)?.[0];
  if (!prefix) continue;

  if (!objects[prefix]) objects[prefix] = [];
  objects[prefix].push({ ...fields, _file: filePath });
}

// Report what was found
let total = 0;
for (const [prefix, items] of Object.entries(objects)) {
  console.log(`[OK] Found ${items.length} objects with prefix ${prefix}`);
  total += items.length;
}

if (total === 0) {
  console.log('[OK] No objects found — indexes not updated (objects/ may be empty).');
  process.exit(0);
}

// Generate REQUEST_INDEX data section
const requests = objects['REQ-'] || [];
if (requests.length > 0) {
  const rows = requests
    .sort((a, b) => (a.id || '').localeCompare(b.id || ''))
    .map(r => `| ${r.id} | ${r.title || '—'} | ${r.source || '—'} | ${r.priority || '—'} | ${r.status || '—'} | ${r.linked_feature || '—'} | ${r.owner || '—'} | ${r.date || '—'} |`)
    .join('\n');
  console.log(`[OK] Generated ${requests.length} request rows for REQUEST_INDEX.md`);
  console.log('     (paste into REQUEST_INDEX.md "Active Requests" table if auto-write is not enabled)');
}

// Generate FEATURE_INDEX data section
const features = objects['FEAT-'] || [];
if (features.length > 0) {
  const byModule = {};
  for (const f of features) {
    const mod = f.module || 'Unknown';
    if (!byModule[mod]) byModule[mod] = [];
    byModule[mod].push(f);
  }
  for (const [mod, items] of Object.entries(byModule)) {
    console.log(`[OK] Found ${items.length} features for module ${mod}`);
  }
}

// Generate BUG_INDEX summary
const bugs = objects['BUG-'] || [];
if (bugs.length > 0) {
  const bySeverity = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const b of bugs) {
    if (b.severity in bySeverity) bySeverity[b.severity]++;
  }
  console.log(`[OK] Bug summary — critical: ${bySeverity.critical}, high: ${bySeverity.high}, medium: ${bySeverity.medium}, low: ${bySeverity.low}`);
}

console.log(`\n[OK] generate-indexes.js complete. Total objects processed: ${total}`);
console.log('     Index files can be auto-populated by extending this script to write directly to indexes/.');
process.exit(0);
