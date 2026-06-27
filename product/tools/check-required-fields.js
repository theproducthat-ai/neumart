#!/usr/bin/env node
/**
 * check-required-fields.js
 * Finds Product OS objects with missing required frontmatter fields.
 * Usage: node product/tools/check-required-fields.js
 */

const fs = require('fs');
const path = require('path');

// Required fields per object type (determined by ID prefix)
const REQUIRED_FIELDS = {
  'REQ-': ['id', 'title', 'status', 'source', 'owner'],
  'FEAT-': ['id', 'title', 'status', 'module', 'owner'],
  'PRD-': ['id', 'title', 'status', 'owner', 'linked_feature'],
  'EPIC-': ['id', 'title', 'status', 'owner'],
  'US-': ['id', 'title', 'status', 'owner'],
  'BUG-': ['id', 'title', 'severity', 'status', 'owner'],
  'INC-': ['id', 'title', 'severity', 'status', 'owner'],
  'RCA-': ['id', 'title', 'status', 'linked_incident', 'owner'],
  'REL-': ['id', 'title', 'status', 'release_date'],
  'MET-': ['id', 'title', 'category', 'owner'],
  'EXP-': ['id', 'title', 'status', 'owner', 'hypothesis'],
  'FF-': ['id', 'title', 'status', 'scheduled_removal_date', 'owner'],
  'OKR-': ['id', 'title', 'status', 'owner'],
  'DEC-': ['id', 'title', 'status', 'owner', 'rationale'],
  'RISK-': ['id', 'title', 'status', 'owner', 'likelihood', 'impact'],
};

const OBJECTS_DIR = path.join(__dirname, '../objects');

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

function getRequiredFields(objectId) {
  for (const [prefix, fields] of Object.entries(REQUIRED_FIELDS)) {
    if (objectId && objectId.startsWith(prefix)) return fields;
  }
  return null;
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

let errors = 0;
let warnings = 0;
let checked = 0;

const files = walkDir(OBJECTS_DIR);

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fields = parseFrontmatter(content);
  if (!fields) continue;

  const objectId = fields.id;
  const required = getRequiredFields(objectId);
  if (!required) continue;

  checked++;
  const relativePath = path.relative(path.join(__dirname, '../..'), filePath);

  for (const field of required) {
    if (!fields[field] || fields[field] === '' || fields[field] === 'null') {
      console.log(`[ERROR] ${relativePath}: missing required field '${field}' (object: ${objectId || '(no id)'})`);
      errors++;
    }
  }
}

if (checked === 0) {
  console.log('[OK] No object files found to validate (objects/ may be empty).');
} else if (errors === 0) {
  console.log(`[OK] All ${checked} objects have required fields.`);
}

console.log(`Checked: ${checked} objects | Errors: ${errors} | Warnings: ${warnings}`);
process.exit(errors > 0 ? 1 : 0);
