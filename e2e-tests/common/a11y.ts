/**
 * Result types and formatting shared by tests/a11y-audit.spec.ts and
 * a11y-reporter.ts.
 */

/** Name of the per-plan JSON attachment that a11y-reporter.ts collects. */
export const A11Y_ATTACHMENT = 'a11y-results';

export const IMPACTS = ['critical', 'serious', 'moderate', 'minor'];

export type AuditedViolation = {
  id: string;
  impact: string | null;
  help: string;
  helpUrl: string;
  nodeCount: number;
  nodes: { target: string; html: string; failureSummary: string }[];
};

export type AuditedPage = {
  name: string;
  url: string;
  error?: string;
  violations: AuditedViolation[];
};

export type PlanAudit = {
  planId: string;
  auditedAt: string;
  pages: AuditedPage[];
};

type RuleTotals = {
  impact: string;
  help: string;
  helpUrl: string;
  plans: Set<string>;
  pages: number;
  nodes: number;
};

function impactRank(impact: string | null) {
  const rank = IMPACTS.indexOf(impact ?? '');
  return rank === -1 ? IMPACTS.length : rank;
}

/** Offending elements per impact level, summed over the plan's pages. */
export function countByImpact(audit: PlanAudit): Map<string, number> {
  const counts = new Map<string, number>();
  for (const page of audit.pages) {
    for (const v of page.violations) {
      const impact = v.impact ?? 'unknown';
      counts.set(impact, (counts.get(impact) ?? 0) + v.nodeCount);
    }
  }
  return counts;
}

export function formatImpactCounts(audit: PlanAudit): string {
  const counts = countByImpact(audit);
  return IMPACTS.map((impact) => `${impact} ${String(counts.get(impact) ?? 0)}`).join(' · ');
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** A standalone page listing one plan's violations, attached to its test. */
export function planAuditHtml(audit: PlanAudit): string {
  const sections = audit.pages.map((page) => {
    const heading = `<h2>${escapeHtml(page.name)} <a href="${escapeHtml(page.url)}">${escapeHtml(page.url)}</a></h2>`;
    if (page.error)
      return `${heading}<p class="error">Could not be audited: ${escapeHtml(page.error)}</p>`;
    if (!page.violations.length) return `${heading}<p>No violations.</p>`;
    const rows = [...page.violations]
      .sort((a, b) => impactRank(a.impact) - impactRank(b.impact))
      .map((v) => {
        const nodes = v.nodes
          .map(
            (n) => `<li><code>${escapeHtml(n.target)}</code><pre>${escapeHtml(n.html)}</pre></li>`
          )
          .join('');
        const more =
          v.nodeCount > v.nodes.length
            ? `<p>…and ${String(v.nodeCount - v.nodes.length)} more</p>`
            : '';
        return (
          `<tr><td class="${escapeHtml(v.impact ?? '')}">${escapeHtml(v.impact ?? '')}</td>` +
          `<td><a href="${escapeHtml(v.helpUrl)}">${escapeHtml(v.id)}</a></td>` +
          `<td>${escapeHtml(v.help)}<details><summary>${String(v.nodeCount)} ${v.nodeCount === 1 ? 'element' : 'elements'}</summary><ul>${nodes}</ul>${more}</details></td></tr>`
        );
      })
      .join('');
    return `${heading}<table><tr><th>Impact</th><th>Rule</th><th>Description</th></tr>${rows}</table>`;
  });
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${escapeHtml(audit.planId)} accessibility</title>
<style>
  body { font: 14px/1.5 system-ui, sans-serif; margin: 2rem; color: #222; }
  table { border-collapse: collapse; width: 100%; }
  th, td { text-align: left; vertical-align: top; padding: 4px 8px; border-bottom: 1px solid #ddd; }
  h2 { font-size: 16px; margin-top: 2rem; } h2 a { font-weight: normal; font-size: 13px; }
  pre { white-space: pre-wrap; word-break: break-all; margin: 2px 0 8px; font-size: 12px; }
  .critical { color: #b00020; font-weight: bold; } .serious { color: #c45500; font-weight: bold; }
  .error { color: #b00020; }
</style></head><body>
<h1>${escapeHtml(audit.planId)}</h1><p>${escapeHtml(formatImpactCounts(audit))} (offending elements)</p>
${sections.join('\n')}
</body></html>
`;
}

/** A Markdown rollup of all audited plans. */
export function runSummaryMarkdown(audits: PlanAudit[]): string {
  const rules = new Map<string, RuleTotals>();
  const lines: string[] = ['# Accessibility audit', ''];

  lines.push('## Plans', '');
  lines.push(`| Plan | Pages | ${IMPACTS.join(' | ')} | Errors |`);
  lines.push(`| --- | --- | ${IMPACTS.map(() => '---').join(' | ')} | --- |`);
  for (const audit of audits) {
    for (const page of audit.pages) {
      for (const v of page.violations) {
        const totals = rules.get(v.id) ?? {
          impact: v.impact ?? 'unknown',
          help: v.help,
          helpUrl: v.helpUrl,
          plans: new Set(),
          pages: 0,
          nodes: 0,
        };
        totals.plans.add(audit.planId);
        totals.pages += 1;
        totals.nodes += v.nodeCount;
        rules.set(v.id, totals);
      }
    }
    const byImpact = countByImpact(audit);
    const errors = audit.pages.filter((page) => page.error).length;
    const counts = IMPACTS.map((impact) => String(byImpact.get(impact) ?? 0));
    lines.push(
      `| ${audit.planId} | ${String(audit.pages.length)} | ${counts.join(' | ')} | ${String(errors)} |`
    );
  }
  lines.push('', 'Counts are offending elements, summed over the audited pages.', '');

  lines.push('## Rules', '');
  lines.push('| Rule | Impact | Plans | Pages | Elements | Description |');
  lines.push('| --- | --- | --- | --- | --- | --- |');
  const sortedRules = [...rules].sort(
    ([, a], [, b]) =>
      impactRank(a.impact) - impactRank(b.impact) ||
      b.plans.size - a.plans.size ||
      b.nodes - a.nodes
  );
  for (const [id, r] of sortedRules) {
    lines.push(
      `| [${id}](${r.helpUrl}) | ${r.impact} | ${String(r.plans.size)}/${String(audits.length)} | ` +
        `${String(r.pages)} | ${String(r.nodes)} | ${r.help} |`
    );
  }

  const failed = audits.flatMap((audit) =>
    audit.pages.filter((page) => page.error).map((page) => ({ planId: audit.planId, page }))
  );
  if (failed.length) {
    lines.push('', '## Pages that could not be audited', '');
    for (const { planId, page } of failed) {
      lines.push(`- ${planId} / ${page.name} (${page.url}): ${page.error}`);
    }
  }
  return lines.join('\n') + '\n';
}
