import { chromium } from '@playwright/test';
const plans = (process.env.PLANS || '').split(',');
const paths = (process.env.PATHS || '/').split(',');
const widths = [390, 700, 1000, 1300, 1600];
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1300, height: 900 } });
const results = {};
for (const plan of plans) for (const path of paths) {
  const url = `http://${plan}.watch-ui.test:8052${path}`;
  const r = await p.goto(url, { waitUntil: 'networkidle', timeout: 300000 }).catch(() => null);
  if (!r || r.status() >= 400) continue;
  for (const w of widths) {
    await p.setViewportSize({ width: w, height: 900 }); await p.waitForTimeout(400);
    const rows = await p.evaluate(() => {
      const evalLen = (len) => { const d = document.createElement('div'); d.style.cssText = `position:absolute;visibility:hidden;width:${len}`; document.body.appendChild(d); const v = d.getBoundingClientRect().width; d.remove(); return v; };
      const resolve = (sizes) => { for (const part of sizes.split(/,(?![^(]*\))/)) { const t = part.trim(); const m = t.match(/^(\(.*\))\s+(.+)$/); if (m) { if (matchMedia(m[1]).matches) return evalLen(m[2]); } else return evalLen(t); } return null; };
      return [...document.querySelectorAll('img[sizes]')].filter((i) => i.offsetParent && i.getAttribute('sizes') !== 'auto').map((i) => {
        let owner = i; let name = '';
        while (owner && !name) { owner = owner.parentElement; const m = owner && owner.className.toString().match(/[A-Za-z]+-([A-Z][A-Za-z]+)(?:-[A-Z][A-Za-z]+)?/); if (m) name = m[0].split('-').slice(1).join('-'); }
        return { name, sizes: i.getAttribute('sizes'), hint: resolve(i.getAttribute('sizes')), actual: i.getBoundingClientRect().width };
      });
    });
    for (const row of rows) {
      const key = `${row.name} | ${row.sizes}`;
      (results[key] ??= { pages: new Set(), byWidth: {} }).pages.add(`${plan}${path}`);
      const e = (results[key].byWidth[w] ??= { hint: row.hint, actual: [] }); e.actual.push(Math.round(row.actual));
    }
  }
}
for (const [key, v] of Object.entries(results)) {
  console.log(`\n${key}\n  seen on: ${[...v.pages].slice(0, 3).join(', ')}`);
  for (const w of widths) { const e = v.byWidth[w]; if (!e) continue; const mx = Math.max(...e.actual); const ratio = e.hint / mx; const flag = ratio < 0.95 ? '  TOO SMALL' : ratio > 1.3 ? '  oversized' : ''; console.log(`  ${String(w).padStart(4)}: hint ${Math.round(e.hint)}  actual ${[...new Set(e.actual)].slice(0, 4).join('/')}${flag}`); }
}
await b.close();
