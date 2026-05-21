#!/usr/bin/env node
/**
 * Run tsc and pipe only errors from git-changed files to tsc-baseline check.
 * Filters both the primary error line and its indented continuation lines.
 */
import { execSync, spawnSync } from 'child_process';

const changedFiles = execSync('git diff --name-only HEAD', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean);

if (!changedFiles.length) {
  console.log('No changed files.');
  process.exit(0);
}

const tscOutput = execSync('tsc -b 2>&1 || true', {
  encoding: 'utf8',
  maxBuffer: 100 * 1024 * 1024,
});

let keep = false;
const filtered = tscOutput
  .split('\n')
  .filter((line) => {
    if (/^\S/.test(line)) {
      keep = changedFiles.some((f) => line.includes(f));
    }
    return keep;
  })
  .join('\n');

const result = spawnSync('tsc-baseline', ['-p', 'tsc-baseline.json', 'check'], {
  input: filtered,
  encoding: 'utf8',
  stdio: ['pipe', 'inherit', 'inherit'],
  shell: true,
});

process.exit(result.status ?? 0);
