#!/usr/bin/env node
/**
 * validate-product-os.js
 * Full Product OS validation suite. Runs all checks and reports results.
 * Usage: node product/tools/validate-product-os.js
 */

const { execSync } = require('child_process');
const path = require('path');

const scripts = [
  'check-required-fields.js',
  'check-broken-links.js',
  'check-status-transitions.js',
];

let totalErrors = 0;
let totalWarnings = 0;

console.log('=== Product OS Validation ===\n');

for (const script of scripts) {
  const scriptPath = path.join(__dirname, script);
  console.log(`--- Running: ${script} ---`);
  try {
    const output = execSync(`node "${scriptPath}"`, { encoding: 'utf8' });
    process.stdout.write(output);
    const errors = (output.match(/\[ERROR\]/g) || []).length;
    const warnings = (output.match(/\[WARN\]/g) || []).length;
    totalErrors += errors;
    totalWarnings += warnings;
  } catch (err) {
    // Script exited with non-zero — capture its output
    process.stdout.write(err.stdout || '');
    const output = err.stdout || '';
    const errors = (output.match(/\[ERROR\]/g) || []).length;
    const warnings = (output.match(/\[WARN\]/g) || []).length;
    totalErrors += errors + 1; // +1 for the crash itself if no output
    totalWarnings += warnings;
  }
  console.log('');
}

console.log('=== Summary ===');
console.log(`Errors:   ${totalErrors}`);
console.log(`Warnings: ${totalWarnings}`);

if (totalErrors > 0) {
  console.log('\n[FAIL] Product OS validation failed — fix errors before release.');
  process.exit(1);
} else if (totalWarnings > 0) {
  console.log('\n[PASS with warnings] Product OS is valid but has warnings to review.');
  process.exit(0);
} else {
  console.log('\n[PASS] Product OS validation passed.');
  process.exit(0);
}
