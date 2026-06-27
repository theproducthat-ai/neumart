#!/usr/bin/env node
// validate-templates.js
// Validates all Product OS templates for schema compliance and registry completeness.
// Usage: node product/tools/validate-templates.js
// Exit code 0 = no errors. Exit code 1 = errors found.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const TEMPLATES_DIR = path.join(ROOT, 'product/os/templates');
const OBJECTS_DIR = path.join(ROOT, 'product/objects');
const REGISTRY_PATH = path.join(TEMPLATES_DIR, 'TEMPLATE_REGISTRY.md');

// ─────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────

const REQUIRED_FIELDS = [
  'id', 'object_type', 'title', 'status', 'priority',
  'owner', 'created_by', 'created_date', 'updated_date',
  'version', 'schema_version', 'template_version',
  'linked_risks', 'linked_decisions'
];

// These templates are intentionally cross-module and skip module_id + feature_id
const CROSS_MODULE_TEMPLATES = new Set([
  'MEASUREMENT_PLAN_TEMPLATE.md',
  'OKR_OBJECT_TEMPLATE.md',
  'RACI_OBJECT_TEMPLATE.md',
  'SOP_TEMPLATE.md',
  'STAKEHOLDER_OBJECT_TEMPLATE.md',
  'TEAM_OBJECT_TEMPLATE.md',
  'TRAINING_PLAN_TEMPLATE.md',
]);

// Skip TEMPLATE_REGISTRY.md and non-object template files from field checks
const META_FILES = new Set([
  'TEMPLATE_REGISTRY.md',
]);

// Object folders that intentionally have no template (documented exceptions)
const NO_TEMPLATE_FOLDERS = new Set([
  'integrations', 'personas', 'prompts', 'questions',
  'references', 'release-notes', 'roles', 'rollback-plans',
  'strategy', 'test-plans'
]);

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

const results = { ok: [], warn: [], error: [] };

function ok(check, message)   { results.ok.push(`[OK]    ${check}: ${message}`); }
function warn(check, message) { results.warn.push(`[WARN]  ${check}: ${message}`); }
function error(check, message){ results.error.push(`[ERROR] ${check}: ${message}`); }

function parseFrontmatter(content) {
  if (!content.startsWith('---')) return null;
  const end = content.indexOf('\n---', 4);
  if (end === -1) return null;
  return content.substring(4, end);
}

function hasField(fm, fieldName) {
  return new RegExp(`^${fieldName}\\s*:`, 'm').test(fm);
}

function extractField(fm, fieldName) {
  const match = fm.match(new RegExp(`^${fieldName}\\s*:\\s*(.+)$`, 'm'));
  return match ? match[1].trim() : null;
}

function usesCodeBlockYaml(content) {
  // Check if the first schema block uses ```yaml fence instead of real frontmatter
  if (!content.startsWith('---')) {
    // No real frontmatter — check if it uses code-block yaml
    return content.includes('```yaml') && content.includes('```');
  }
  return false;
}

// ─────────────────────────────────────────────
// CHECK 1: Real YAML frontmatter (no code-block YAML)
// ─────────────────────────────────────────────

function checkFrontmatter(files) {
  let passed = 0;
  for (const file of files) {
    if (META_FILES.has(file)) continue;
    const content = fs.readFileSync(path.join(TEMPLATES_DIR, file), 'utf8');

    if (!content.startsWith('---')) {
      error(file, 'No real YAML frontmatter (---) found at file start');
    } else if (content.indexOf('\n---', 4) === -1) {
      error(file, 'Frontmatter opened with --- but closing --- not found');
    } else {
      // Check body for code-block yaml as primary schema (vestigial)
      const body = content.substring(content.indexOf('\n---', 4) + 4);
      if (body.trimStart().startsWith('```yaml')) {
        warn(file, 'Body starts with ```yaml code fence — real frontmatter is present but body still has legacy code block');
      }
      passed++;
    }
  }
  ok('FRONTMATTER', `${passed} templates have valid --- delimiters`);
}

// ─────────────────────────────────────────────
// CHECK 2: Required canonical fields
// ─────────────────────────────────────────────

function checkRequiredFields(files) {
  const missingByField = {};
  REQUIRED_FIELDS.forEach(f => { missingByField[f] = []; });
  const moduleIdMissing = [];

  for (const file of files) {
    if (META_FILES.has(file)) continue;
    const content = fs.readFileSync(path.join(TEMPLATES_DIR, file), 'utf8');
    const fm = parseFrontmatter(content);
    if (!fm) continue;

    for (const field of REQUIRED_FIELDS) {
      if (!hasField(fm, field)) {
        missingByField[field].push(file);
        error(file, `Missing required field: ${field}`);
      }
    }

    // module_id: required except for cross-module templates
    if (!CROSS_MODULE_TEMPLATES.has(file) && !hasField(fm, 'module_id')) {
      moduleIdMissing.push(file);
      warn(file, 'Missing module_id (expected for non-cross-module templates)');
    }
  }

  for (const field of REQUIRED_FIELDS) {
    if (missingByField[field].length === 0) {
      ok(`FIELD:${field}`, `All templates have ${field}`);
    }
  }
  if (moduleIdMissing.length === 0) {
    ok('FIELD:module_id', `All non-cross-module templates have module_id`);
  }
}

// ─────────────────────────────────────────────
// CHECK 3: schema_version and template_version
// ─────────────────────────────────────────────

function checkVersionFields(files) {
  let svMissing = [], tvMissing = [];
  for (const file of files) {
    if (META_FILES.has(file)) continue;
    const content = fs.readFileSync(path.join(TEMPLATES_DIR, file), 'utf8');
    const fm = parseFrontmatter(content);
    if (!fm) continue;
    if (!hasField(fm, 'schema_version'))   svMissing.push(file);
    if (!hasField(fm, 'template_version')) tvMissing.push(file);
  }
  if (svMissing.length === 0)   ok('FIELD:schema_version', 'All templates have schema_version');
  else svMissing.forEach(f => error(f, 'Missing schema_version'));

  if (tvMissing.length === 0)   ok('FIELD:template_version', 'All templates have template_version');
  else tvMissing.forEach(f => error(f, 'Missing template_version'));
}

// ─────────────────────────────────────────────
// CHECK 4: Active object folders have a mapped template
// Uses TEMPLATE_OBJECT_MAP.md as the authoritative folder→template mapping
// ─────────────────────────────────────────────

const OBJECT_MAP_PATH = path.join(ROOT, 'product/indexes/TEMPLATE_OBJECT_MAP.md');

function parseObjectMap() {
  if (!fs.existsSync(OBJECT_MAP_PATH)) return null;
  const content = fs.readFileSync(OBJECT_MAP_PATH, 'utf8');
  const map = {}; // folder (short name) → template file
  // Match table rows like: | `product/objects/features/` | Feature | `FEATURE_OBJECT_TEMPLATE.md` | ...
  const rowRegex = /\|\s*`product\/objects\/([^`/]+)\/`\s*\|[^|]+\|\s*`([A-Z_]+\.md)`/g;
  let m;
  while ((m = rowRegex.exec(content)) !== null) {
    const folderName = m[1];
    const templateFile = m[2];
    if (!map[folderName]) map[folderName] = [];
    map[folderName].push(templateFile);
  }
  return map;
}

function checkObjectFolderCoverage(templateFiles) {
  if (!fs.existsSync(OBJECTS_DIR)) {
    warn('COVERAGE', 'product/objects/ directory not found — skipping folder coverage check');
    return;
  }

  const objectFolders = fs.readdirSync(OBJECTS_DIR).filter(f => {
    return fs.statSync(path.join(OBJECTS_DIR, f)).isDirectory();
  });

  const templateSet = new Set(templateFiles);
  const objectMap = parseObjectMap();

  if (!objectMap) {
    warn('COVERAGE', 'TEMPLATE_OBJECT_MAP.md not found — using filename heuristics for coverage check');
  }

  for (const folder of objectFolders) {
    if (NO_TEMPLATE_FOLDERS.has(folder)) {
      ok(`COVERAGE:${folder}`, `No template (documented exception in TEMPLATE_REGISTRY.md)`);
      continue;
    }

    if (objectMap && objectMap[folder]) {
      // Check that every mapped template for this folder exists on disk
      const templates = objectMap[folder];
      const allExist = templates.every(t => templateSet.has(t));
      if (allExist) {
        ok(`COVERAGE:${folder}`, `Mapped to ${templates.join(', ')}`);
      } else {
        const missing = templates.filter(t => !templateSet.has(t));
        error(`COVERAGE:${folder}`, `Mapped template(s) not found on disk: ${missing.join(', ')}`);
      }
    } else {
      // Not in the object map — check registry as fallback
      warn(`COVERAGE:${folder}`, `Folder not in TEMPLATE_OBJECT_MAP.md — add a mapping or document as exception`);
    }
  }
}

// ─────────────────────────────────────────────
// CHECK 5: Every mapped template exists on disk
// ─────────────────────────────────────────────

function checkRegistryMappings(templateFiles) {
  if (!fs.existsSync(REGISTRY_PATH)) {
    error('REGISTRY', 'TEMPLATE_REGISTRY.md not found in templates directory');
    return;
  }

  const registryContent = fs.readFileSync(REGISTRY_PATH, 'utf8');
  const templateSet = new Set(templateFiles);

  // Extract template filenames referenced in registry (pattern: `FILENAME.md`)
  const refs = [...registryContent.matchAll(/`([A-Z_]+\.md)`/g)].map(m => m[1]);
  const uniqueRefs = [...new Set(refs)];

  let missingFromDisk = [];
  for (const ref of uniqueRefs) {
    if (!templateSet.has(ref)) {
      missingFromDisk.push(ref);
      error('REGISTRY', `Registry references ${ref} but file does not exist on disk`);
    }
  }

  if (missingFromDisk.length === 0) {
    ok('REGISTRY', `All ${uniqueRefs.length} registry-referenced templates exist on disk`);
  }

  return uniqueRefs;
}

// ─────────────────────────────────────────────
// CHECK 6: Every template appears in TEMPLATE_REGISTRY.md
// ─────────────────────────────────────────────

function checkRegistryCoverage(templateFiles, registryRefs) {
  if (!registryRefs) return;

  const refSet = new Set(registryRefs);
  const unregistered = templateFiles.filter(f => !META_FILES.has(f) && !refSet.has(f));

  if (unregistered.length === 0) {
    ok('REGISTRY_COVERAGE', 'All templates are listed in TEMPLATE_REGISTRY.md');
  } else {
    unregistered.forEach(f => warn(f, 'Template exists on disk but is not listed in TEMPLATE_REGISTRY.md'));
  }
}

// ─────────────────────────────────────────────
// CHECK 7: Use-this-when guidance present
// ─────────────────────────────────────────────

function checkGuidanceBlocks(files) {
  let missing = [];
  for (const file of files) {
    if (META_FILES.has(file)) continue;
    const content = fs.readFileSync(path.join(TEMPLATES_DIR, file), 'utf8');
    if (!content.includes('Use this when') && !content.includes('**Use when**')) {
      missing.push(file);
    }
  }
  if (missing.length === 0) {
    ok('GUIDANCE', 'All templates have Use-this-when guidance');
  } else {
    missing.forEach(f => warn(f, 'Missing Use-this-when guidance block'));
  }
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

console.log('='.repeat(60));
console.log('  Product OS — Template Validation');
console.log('  Schema version: 2.0');
console.log(`  Run date: ${new Date().toISOString().slice(0, 10)}`);
console.log('='.repeat(60));
console.log();

const templateFiles = fs.readdirSync(TEMPLATES_DIR)
  .filter(f => f.endsWith('.md'))
  .sort();

console.log(`Templates found: ${templateFiles.length}`);
console.log();

checkFrontmatter(templateFiles);
checkRequiredFields(templateFiles);
checkVersionFields(templateFiles);
checkGuidanceBlocks(templateFiles);
const registryRefs = checkRegistryMappings(templateFiles);
checkRegistryCoverage(templateFiles, registryRefs);
checkObjectFolderCoverage(templateFiles);

// ─────────────────────────────────────────────
// SUMMARY
// ─────────────────────────────────────────────

console.log();
console.log('='.repeat(60));
console.log('  RESULTS');
console.log('='.repeat(60));
console.log();

if (results.error.length > 0) {
  console.log('ERRORS:');
  results.error.forEach(m => console.log(m));
  console.log();
}

if (results.warn.length > 0) {
  console.log('WARNINGS:');
  results.warn.forEach(m => console.log(m));
  console.log();
}

console.log(`[OK] checks:    ${results.ok.length}`);
console.log(`[WARN] checks:  ${results.warn.length}`);
console.log(`[ERROR] checks: ${results.error.length}`);
console.log();

if (results.error.length === 0) {
  console.log('✓  No errors. Product OS templates are schema-compliant.');
  process.exit(0);
} else {
  console.log('✗  Errors found. Fix [ERROR] items before proceeding to Level 3.');
  process.exit(1);
}
