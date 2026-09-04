#!/usr/bin/env node
/**
 * fix-chip-location.js — moves the CountryPicker chip from the wrongly-patched
 * location (in the not-found/error branch at ~line 342) to the correct main
 * render (after the SECOND "backToSearch" occurrence at ~line 372).
 *
 * Idempotent: bails if the wrong-location chip block isn't found (already fixed).
 */

const fs = require('fs');
const path = 'app/pay/[slug]/student/[studentId]/page.tsx';
const src = fs.readFileSync(path, 'utf8');

// The exact block my previous patcher inserted
const WRONG_LOCATION_BLOCK = `

            {/* Country picker chip — payer sees currency + payment method for their region */}
            <div className="mt-4 flex justify-end">
              <CountryPicker />
            </div>`;

if (!src.includes(WRONG_LOCATION_BLOCK)) {
  console.log('⚠️  Wrong-location chip block not found — already fixed?');
  process.exit(0);
}

// Count occurrences — must be exactly 1 to be safe
const occurrences = src.split(WRONG_LOCATION_BLOCK).length - 1;
if (occurrences !== 1) {
  console.error(`❌ Expected 1 occurrence of wrong-location block, found ${occurrences}. Aborting.`);
  process.exit(1);
}

// Step 1: remove from wrong location
let patched = src.replace(WRONG_LOCATION_BLOCK, '');

// Step 2: insert at correct location — after the SECOND backToSearch </Link>
// The main render has:
//   >
//     <ArrowLeft size={16} />
//     {c.student.backToSearch}
//   </Link>
//   <div className="flex items-start gap-4">    <-- student info block starts here
//
// We insert the chip BEFORE the student info div (with size={16}, not size={18})

const MAIN_RENDER_ANCHOR = `              <ArrowLeft size={16} />
              {c.student.backToSearch}
            </Link>
            <div className="flex items-start gap-4">`;

if (!patched.includes(MAIN_RENDER_ANCHOR)) {
  console.error('❌ Main render anchor not found (size={16} pattern). Aborting.');
  console.error('   Restoring original file (no changes made).');
  process.exit(1);
}

const MAIN_RENDER_REPLACEMENT = `              <ArrowLeft size={16} />
              {c.student.backToSearch}
            </Link>

            {/* Country picker chip — where the payer is paying from (currency + payment method) */}
            <div className="mb-4 flex justify-end">
              <CountryPicker />
            </div>

            <div className="flex items-start gap-4">`;

patched = patched.replace(MAIN_RENDER_ANCHOR, MAIN_RENDER_REPLACEMENT);

// Sanity checks
const chipCount = (patched.match(/<CountryPicker \/>/g) || []).length;
if (chipCount !== 1) {
  console.error(`❌ Expected exactly 1 <CountryPicker /> after fix, got ${chipCount}. Aborting.`);
  process.exit(1);
}

if (!patched.includes('<CountryPicker />')) {
  console.error('❌ Sanity check failed: no <CountryPicker /> in file after fix.');
  process.exit(1);
}

fs.writeFileSync(path, patched, 'utf8');
console.log(`✅ Fixed chip location in ${path}`);
console.log(`   Moved: from error/not-found branch → main student render`);
console.log(`   Position: between "back to search" link and student info block`);
