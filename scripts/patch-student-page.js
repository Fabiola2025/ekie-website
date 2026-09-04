#!/usr/bin/env node
/**
 * patch-student-page.js — wire currency awareness into the student page.
 *
 * Four surgical changes:
 *   1. Add imports (CountryPicker, useCountry, computeFeesSync, fetchRateForCountry, FxRate)
 *   2. Add rate + country state after existing useState/useMemo hooks
 *   3. Replace inline fee calculation with computeFeesSync()
 *   4. Replace inline breakdown JSX with <FeeBreakdownCard />
 *
 * Idempotent: bails if 'CountryPicker' already imported.
 */

const fs = require('fs');
const path = 'app/pay/[slug]/student/[studentId]/page.tsx';
const src = fs.readFileSync(path, 'utf8');

if (src.includes('CountryPicker') || src.includes('computeFeesSync')) {
  console.log('⚠️  Student page already patched — skipping.');
  process.exit(0);
}

// ── Change 1: imports ──
const importAnchor = "import { payCopy } from '@/lib/pay-i18n';";
const importAddition = `import { payCopy } from '@/lib/pay-i18n';
import CountryPicker from '@/components/CountryPicker';
import FeeBreakdownCard from '@/components/FeeBreakdownCard';
import { useCountry } from '@/lib/useCountry';
import { computeFeesSync, fetchRateForCountry, type FeeBreakdown } from '@/lib/pay-fees';
import type { FxRate } from '@/lib/fx';`;

if (!src.includes(importAnchor)) {
  console.error('❌ Import anchor not found. Aborting.');
  process.exit(1);
}

// ── Change 2: replace the totals useMemo with sync compute using rate state ──
// Anchor: the whole existing totals block from "const totals = useMemo" through the returning closing brace `}, [feeBreakdown, customAmounts]);`
const OLD_TOTALS_BLOCK = `    const ekieFee = Math.round(schoolAmount * 0.015);
    const cinetpayFee = Math.round(schoolAmount * 0.01);
    const totalCharged = schoolAmount + ekieFee + cinetpayFee;
    return { schoolAmount, ekieFee, cinetpayFee, totalCharged };
  }, [feeBreakdown, customAmounts]);`;

if (!src.includes(OLD_TOTALS_BLOCK)) {
  console.error('❌ Old totals useMemo block not found — student page structure changed. Aborting.');
  process.exit(1);
}

const NEW_TOTALS_BLOCK = `    return computeFeesSync(schoolAmount, country, fxRate);
  }, [feeBreakdown, customAmounts, country, fxRate]);`;

// We also need to inject: `const { country } = useCountry(); const [fxRate, setFxRate] = useState<FxRate | null>(null); useEffect for fetching rate`
// Anchor for injection: right after the existing "const { lang } = useLang();" line
const HOOKS_ANCHOR = `const { lang } = useLang();`;
if (!src.includes(HOOKS_ANCHOR)) {
  console.error('❌ Hooks anchor "const { lang } = useLang();" not found. Aborting.');
  process.exit(1);
}
const HOOKS_ADDITION = `const { lang } = useLang();
  const { country } = useCountry();
  const [fxRate, setFxRate] = useState<FxRate | null>(null);

  // Fetch FX rate whenever country changes. Null for Cameroon or if fetch fails.
  useEffect(() => {
    let cancelled = false;
    fetchRateForCountry(country).then((r) => {
      if (!cancelled) setFxRate(r);
    });
    return () => { cancelled = true; };
  }, [country]);`;

// ── Change 3: replace the inline payment breakdown card JSX with <FeeBreakdownCard /> ──
// The existing card is a big div block. We match a stable anchor: the comment
// "{/* Payment breakdown card */}" through its own closing pair.
const OLD_BREAKDOWN_JSX_START = `              {/* Payment breakdown card */}`;
const OLD_BREAKDOWN_JSX_MARKER = `              {selected.size > 0 && (
                <div className="bg-white rounded-2xl shadow-card border border-border p-5 space-y-2">`;
if (!src.includes(OLD_BREAKDOWN_JSX_START)) {
  console.error('❌ Old breakdown card JSX comment not found. Aborting.');
  process.exit(1);
}
if (!src.includes(OLD_BREAKDOWN_JSX_MARKER)) {
  console.error('❌ Old breakdown card JSX opening div not found. Aborting.');
  process.exit(1);
}

// Walk from the marker forward to find the matching closing )}
// The block ends with "                </div>\n              )}"
const OLD_BREAKDOWN_CLOSING = `                </div>
              )}`;

const markerIdx = src.indexOf(OLD_BREAKDOWN_JSX_MARKER);
const closingIdx = src.indexOf(OLD_BREAKDOWN_CLOSING, markerIdx);
if (closingIdx === -1) {
  console.error('❌ Could not find closing pattern of breakdown card block. Aborting.');
  process.exit(1);
}
const OLD_FULL_BREAKDOWN_BLOCK = src.slice(
  src.indexOf(OLD_BREAKDOWN_JSX_START),
  closingIdx + OLD_BREAKDOWN_CLOSING.length
);

const NEW_BREAKDOWN_BLOCK = `              {/* Payment breakdown card — currency-aware based on payer country */}
              {selected.size > 0 && totals && (
                <FeeBreakdownCard breakdown={totals} />
              )}`;

// ── Change 4: add <CountryPicker /> chip at the top of the flow ──
// Anchor: the "Back to search" link (which is at the top of the student page content).
const BACK_LINK_ANCHOR = `{c.student.backToSearch}`;
if (!src.includes(BACK_LINK_ANCHOR)) {
  console.error('❌ "Back to search" anchor not found. Aborting.');
  process.exit(1);
}

// Find the closing </Link> or </a> or </div> after the back link — insert right after.
// Simplest: find the anchor, then find the next newline followed by whitespace
// followed by </something>, insert after that <element>.
// Actually simpler: find the anchor, walk to end of enclosing tag (</Link> or similar).
// For robustness, use a well-known pattern in your page. Let me match by finding
// the anchor and inserting a new CountryPicker container two </something> tags after.
// Simpler still: insert AFTER the closing </Link> that wraps the back-to-search text.
const BACK_LINK_CLOSING = '</Link>';
const backIdx = src.indexOf(BACK_LINK_ANCHOR);
const backLinkCloseIdx = src.indexOf(BACK_LINK_CLOSING, backIdx);
if (backLinkCloseIdx === -1) {
  console.error('❌ Could not find </Link> after back-to-search anchor. Aborting.');
  process.exit(1);
}
const insertAfter = backLinkCloseIdx + BACK_LINK_CLOSING.length;
const CHIP_INSERTION = `\n\n            {/* Country picker chip — payer sees currency + payment method for their region */}\n            <div className="mt-4 flex justify-end">\n              <CountryPicker />\n            </div>`;

// ── Apply changes in reverse order (later indices first, so earlier ones don't shift) ──
let patched = src;

// 4. chip insertion (late in file)
patched = patched.slice(0, insertAfter) + CHIP_INSERTION + patched.slice(insertAfter);

// 3. breakdown replacement (uses full-block substitution, safe)
patched = patched.replace(OLD_FULL_BREAKDOWN_BLOCK, NEW_BREAKDOWN_BLOCK);

// 2. totals block replacement
patched = patched.replace(OLD_TOTALS_BLOCK, NEW_TOTALS_BLOCK);

// 2b. hooks addition (after lang hook)
patched = patched.replace(HOOKS_ANCHOR, HOOKS_ADDITION);

// 1. import addition
patched = patched.replace(importAnchor, importAddition);

// ── Sanity checks ──
if (!patched.includes('computeFeesSync(')) {
  console.error('❌ Sanity check failed: computeFeesSync not present after patch.'); process.exit(1);
}
if (!patched.includes('<CountryPicker />')) {
  console.error('❌ Sanity check failed: <CountryPicker /> not present after patch.'); process.exit(1);
}
if (!patched.includes('<FeeBreakdownCard')) {
  console.error('❌ Sanity check failed: <FeeBreakdownCard not present after patch.'); process.exit(1);
}
if (patched.includes('Math.round(schoolAmount * 0.015)')) {
  console.error('❌ Sanity check failed: old inline fee math still present.'); process.exit(1);
}

const sizeIncrease = patched.length - src.length;
if (sizeIncrease < -1500 || sizeIncrease > 2000) {
  console.error(`❌ Unexpected size change: +${sizeIncrease} bytes. Aborting.`);
  process.exit(1);
}

fs.writeFileSync(path, patched, 'utf8');
console.log(`✅ Patched ${path}`);
console.log(`   Size: ${src.length} → ${patched.length} bytes (+${sizeIncrease})`);
console.log(`   Added: imports, country hook, FX effect, sync fee compute, breakdown component, country picker chip`);
