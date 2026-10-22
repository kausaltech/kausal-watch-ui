/**
 * Collects the results of tests/a11y-audit.spec.ts, prints a cross-plan
 * summary at the end of the run and writes it, with each plan's results, to
 * e2e-tests/a11y-results/. Does nothing when the audit did not run.
 */
import fs from 'node:fs';
import path from 'node:path';

import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

import { A11Y_ATTACHMENT, type PlanAudit, runSummaryMarkdown } from './common/a11y.ts';

const RESULTS_DIR = path.resolve(import.meta.dirname, 'a11y-results');

class A11yReporter implements Reporter {
  // Keyed by test so that a retry replaces the earlier attempt.
  private audits = new Map<string, PlanAudit>();

  onTestEnd(test: TestCase, result: TestResult) {
    const attachment = result.attachments.find((a) => a.name === A11Y_ATTACHMENT && a.body);
    if (!attachment?.body) return;
    this.audits.set(test.id, JSON.parse(attachment.body.toString()) as PlanAudit);
  }

  onEnd() {
    if (!this.audits.size) return;
    const audits = [...this.audits.values()].sort((a, b) => a.planId.localeCompare(b.planId));
    const summary = runSummaryMarkdown(audits);
    // Start from an empty directory so plans from earlier runs don't linger.
    fs.rmSync(RESULTS_DIR, { recursive: true, force: true });
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
    for (const audit of audits) {
      fs.writeFileSync(
        path.join(RESULTS_DIR, `${audit.planId}.json`),
        JSON.stringify(audit, null, 2)
      );
    }
    fs.writeFileSync(path.join(RESULTS_DIR, 'summary.md'), summary);
    console.log(`\n${summary}\nWritten to ${path.relative(process.cwd(), RESULTS_DIR)}/`);
  }
}

export default A11yReporter;
