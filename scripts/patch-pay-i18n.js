#!/usr/bin/env node
/**
 * patch-pay-i18n.js — safely add countryPicker section to lib/pay-i18n.ts
 *
 * Idempotent: if 'countryPicker:' already exists, skips.
 * Bails safely if file structure isn't what we expect (no corruption).
 *
 * Run once: node scripts/patch-pay-i18n.js
 */

const fs = require('fs');
const path = 'lib/pay-i18n.ts';
const src = fs.readFileSync(path, 'utf8');

const EN_BLOCK = `    countryPicker: {
      payingFrom: 'Paying from',
      change: 'Change',
      modalTitle: 'Where are you paying from?',
      modalSubtitle: 'This determines your payment currency and available methods.',
      cameroon: 'In Cameroon',
      diaspora: 'Outside Cameroon',
      confirm: 'Continue',
      close: 'Cancel',
      autoDetected: 'Auto-detected',
      approximateCost: '\u2248',
      finalRateNote: "Final amount depends on your card's exchange rate at time of charge.",
    },
`;

const FR_BLOCK = `    countryPicker: {
      payingFrom: 'Vous payez depuis',
      change: 'Modifier',
      modalTitle: "D'où effectuez-vous ce paiement ?",
      modalSubtitle: 'Cela détermine la devise et les modes de paiement disponibles.',
      cameroon: 'Au Cameroun',
      diaspora: 'Hors du Cameroun',
      confirm: 'Continuer',
      close: 'Annuler',
      autoDetected: 'Détecté automatiquement',
      approximateCost: '\u2248',
      finalRateNote: 'Le montant final dépend du taux de change de votre carte au moment du paiement.',
    },
`;

if (src.includes('countryPicker:')) {
  console.log('⚠️  countryPicker section already present — skipping.');
  process.exit(0);
}

const localeEndPattern = /\n  \},\n/g;
const matches = [...src.matchAll(localeEndPattern)];

if (matches.length < 2) {
  console.error(`❌ Expected at least 2 locale-closing braces, found ${matches.length}. Aborting.`);
  process.exit(1);
}

const enEnd = matches[0].index;
const frEnd = matches[1].index;

let patched = src.slice(0, frEnd) + '\n' + FR_BLOCK + src.slice(frEnd);
patched = patched.slice(0, enEnd) + '\n' + EN_BLOCK + patched.slice(enEnd);

const sizeIncrease = patched.length - src.length;
const expectedIncrease = EN_BLOCK.length + FR_BLOCK.length + 2;

if (Math.abs(sizeIncrease - expectedIncrease) > 50) {
  console.error(`❌ Unexpected size change: +${sizeIncrease} bytes (expected ~${expectedIncrease}). Aborting.`);
  process.exit(1);
}

const countryPickerCount = (patched.match(/countryPicker:/g) || []).length;
if (countryPickerCount !== 2) {
  console.error(`❌ Expected 2 countryPicker: sections after patch, got ${countryPickerCount}. Aborting.`);
  process.exit(1);
}

fs.writeFileSync(path, patched, 'utf8');
console.log(`✅ Patched ${path}`);
console.log(`   Size: ${src.length} → ${patched.length} bytes (+${sizeIncrease})`);
console.log(`   Added: countryPicker section to both en and fr locales`);
