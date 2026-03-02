#!/usr/bin/env node
// Check website translations for missing or extra keys compared to en.json

import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const websiteDir = join(import.meta.dirname, '..', 'website');
const en = JSON.parse(readFileSync(join(websiteDir, 'en.json'), 'utf8'));

function getKeys(obj, prefix = '') {
	let keys = [];
	for (const [k, v] of Object.entries(obj)) {
		const key = prefix ? `${prefix}.${k}` : k;
		if (typeof v === 'object' && v !== null) {
			keys = keys.concat(getKeys(v, key));
		} else {
			keys.push(key);
		}
	}
	return keys;
}

const enKeys = new Set(getKeys(en));
let hasIssues = false;

for (const file of readdirSync(websiteDir).sort()) {
	if (file === 'en.json' || file === 'locales.json' || !file.endsWith('.json')) continue;

	const locale = basename(file, '.json');
	const data = JSON.parse(readFileSync(join(websiteDir, file), 'utf8'));
	const localeKeys = new Set(getKeys(data));

	const missing = [...enKeys].filter(k => !localeKeys.has(k));
	const extra = [...localeKeys].filter(k => !enKeys.has(k));

	if (missing.length === 0 && extra.length === 0) {
		console.log(`${locale}: OK (${localeKeys.size} keys)`);
		continue;
	}

	hasIssues = true;
	console.log(`\n${locale}:`);
	if (missing.length > 0) {
		console.log(`  Missing ${missing.length} keys:`);
		for (const k of missing) console.log(`    - ${k}`);
	}
	if (extra.length > 0) {
		console.log(`  Extra ${extra.length} keys:`);
		for (const k of extra) console.log(`    + ${k}`);
	}
}

process.exit(hasIssues ? 1 : 0);
