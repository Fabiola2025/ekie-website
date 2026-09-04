#!/usr/bin/env node
/**
 * patch-landing-page.js — safely add CountryPicker to app/pay/[slug]/page.tsx
 *
 * Two changes:
 *   1. Add: import CountryPicker from '@/components/CountryPicker';
 *   2. Add: <CountryPicker /> chip right after the school name/badge section
 *
 * Idempotent: bails if already patched.
 */

const fs = require('fs');
const path = 'app/pay/[slug]/page.tsx';
const src = fs.readFileSync(path, 'utf8');

if (src.includes('CountryPicker')) {
  console.log('⚠️  CountryPicker already present in landing page — skipping.');
  process.exit(0);
}

// Change 1: Add the import.
const importAnchor = "import { payCopy } from '@/lib/pay-i18n';";
const importAddition = "import { payCopy } from '@/lib/pay-i18n';\nimport CountryPicker from '@/components/CountryPicker';";

if (!src.includes(importAnchor)) {
  console.error(`❌ Could not find import anchor: ${importAnchor}`);
  process.exit(1);
}
if (src.split(importAnchor).length > 2) {
  console.error(`❌ Import anchor found multiple times — ambiguous.`);
  process.exit(1);
}

// Change 2: Insert <CountryPicker /> after the Ékié badge.
// The landing page has an "Ékié badge" section. Insert the chip AFTER it,
// before whatever comes next. Anchor: the closing </div> of the school-info block
// followed by the search form section. We'll place it right after the badge.
const badgeAnchor = `{/* Ékié badge */}`;
if (!src.includes(badgeAnchor)) {
  console.error(`❌ Could not find Ékié badge anchor comment.`);
  console.error(`   Landing page structure may have changed. Aborting.`);
  process.exit(1);
}

// Find the end of the Ékié badge div block. The pattern is:
// {/* Ékié badge */}
// <div className="inline-flex ...">
//   ... contents ...
// </div>
// We insert AFTER that closing </div>.
// Safest: find the badge marker, then find the NEXT </div> after opening <div ...>.
const badgeStart = src.indexOf(badgeAnchor);
const afterBadgeStart = src.indexOf('<div', badgeStart);
// Now walk forward until we find the matching </div>. Simple depth counter.
let depth = 0;
let scan = afterBadgeStart;
let afterBadgeEnd = -1;
while (scan < src.length) {
  const openIdx = src.indexOf('<div', scan);
  const closeIdx = src.indexOf('</div>', scan);
  if (closeIdx === -1) break;
  if (openIdx !== -1 && openIdx < closeIdx) {
    depth++;
    scan = openIdx + 4;
  } else {
    depth--;
    scan = closeIdx + 6;
    if (depth === 0) { afterBadgeEnd = scan; break; }
  }
}
if (afterBadgeEnd === -1) {
  console.error(`❌ Could not find closing </div> for Ékié badge block.`);
  process.exit(1);
}

const chipInsertion = `\n\n            {/* Country picker — where the payer is paying from */}\n            <div className="mt-4 flex justify-center">\n              <CountryPicker />\n            </div>`;

// Apply both changes.
let patched = src.slice(0, afterBadgeEnd) + chipInsertion + src.slice(afterBadgeEnd);
patched = patched.replace(importAnchor, importAddition);

// Sanity checks.
const countryPickerRefs = (patched.match(/CountryPicker/g) || []).length;
if (countryPickerRefs !== 3) {  // 1 import + 1 JSX comment + 1 JSX tag
  console.error(`❌ Expected 3 CountryPicker references after patch, got ${countryPickerRefs}. Aborting.`);
  process.exit(1);
}

const sizeIncrease = patched.length - src.length;
if (sizeIncrease < 100 || sizeIncrease > 400) {
  console.error(`❌ Unexpected size change: +${sizeIncrease} bytes. Aborting.`);
  process.exit(1);
}

fs.writeFileSync(path, patched, 'utf8');
console.log(`✅ Patched ${path}`);
console.log(`   Size: ${src.length} → ${patched.length} bytes (+${sizeIncrease})`);
console.log(`   Added: CountryPicker import + chip below school badge`);
