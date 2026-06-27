#!/usr/bin/env node
/**
 * check-status-transitions.js
 * Finds objects with stale or invalid status values.
 * Usage: node product/tools/check-status-transitions.js
 */

const fs = require('fs');
const path = require('path');

// Valid statuses per object type prefix
const VALID_STATUSES = {
  'REQ-': ['intake', 'grilling', 'assessed', 'approved', 'parked', 'rejected', 'in-progress', 'delivered', 'closed'],
  'FEAT-': ['planned', 'in-design', 'in-development', 'in-qa', 'released', 'post-release', 'deprecated'],
  'PRD-': ['draft', 'in-review', 'approved', 'active', 'delivered', 'superseded', 'archived'],
  'EPIC-': ['backlog', 'in-progress', 'done', 'cancelled'],
  'US-': ['backlog', 'sprint-ready', 'in-progress', 'in-review', 'in-qa', 'done', 'carried-over', 'rejected'],
  'BUG-': ['open', 'triaged', 'in-progress', 'in-review', 'in-qa', 'resolved', 'closed'],
  'INC-': ['open', 'investigating', 'identified', 'in-progress', 'resolved', 'closed'],
  'RCA-': ['draft', 'in-review', 'approved', 'closed'],
  'REL-': ['planned', 'in-progress', 'rc', 'released', 'rolled-back'],
  'EXP-': ['setup', 'running', 'paused', 'completed', 'cancelled'],
  'FF-': ['off', 'canary', 'partial', 'full', 'removed'],
  'OKR-': ['draft', 'active', 'complete', 'missed', 'cancelled'],
  'DEC-': ['active', 'superseded', 'reversed'],
  'RISK-': ['identified', 'active', 'mitigated', 'accepted', 'materialised', 'closed'],
  'MET-': ['active', 'proposed', 'deprecated'],
};

// How long (in days) a status is considered stale without an update
const STALE_THRESHOLDS = {
  'in-progress': 14,
  'grilling': 7,
  'intake': 14,
  'in-design': 21,
  'in-development': 21,
  'in-qa': 7,
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

function getValidStatuses(objectId) {
  for (const [prefix, statuses] of Object.entries(VALID_STATUSES)) {
    if (objectId && objectId.startsWith(prefix)) return statuses;
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
const now = Date.now();

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fields = parseFrontmatter(content);
  if (!fields || !fields.id) continue;

  const objectId = fields.id;
  const status = fields.status;
  const validStatuses = getValidStatuses(objectId);
  if (!validStatuses) continue;

  checked++;
  const relativePath = path.relative(path.join(__dirname, '../..'), filePath);

  // Check status is valid
  if (status && !validStatuses.includes(status)) {
    console.log(`[ERROR] ${relativePath}: invalid status '${status}' for ${objectId}. Valid: ${validStatuses.join(', ')}`);
    errors++;
  }

  // Check for stale status
  const staleThresholdDays = STALE_THRESHOLDS[status];
  if (staleThresholdDays && fields.updated_at) {
    const updated = new Date(fields.updated_at).getTime();
    if (!isNaN(updated)) {
      const ageDays = (now - updated) / (1000 * 60 * 60 * 24);
      if (ageDays > staleThresholdDays) {
        console.log(`[WARN] ${relativePath}: ${objectId} has status '${status}' unchanged for ${Math.round(ageDays)} days (threshold: ${staleThresholdDays} days)`);
        warnings++;
      }
    }
  }

  // Feature flags must have scheduled_removal_date
  if (objectId.startsWith('FF-') && (!fields.scheduled_removal_date || fields.scheduled_removal_date === '')) {
    console.log(`[ERROR] ${relativePath}: feature flag ${objectId} is missing 'scheduled_removal_date'`);
    errors++;
  }
}

if (checked === 0) {
  console.log('[OK] No object files found to validate.');
} else if (errors === 0 && warnings === 0) {
  console.log(`[OK] All ${checked} objects have valid status values.`);
}

console.log(`Checked: ${checked} objects | Errors: ${errors} | Warnings: ${warnings}`);
process.exit(errors > 0 ? 1 : 0);
