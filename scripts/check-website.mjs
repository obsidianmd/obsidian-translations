#!/usr/bin/env node
// Check website translations for missing or extra keys compared to en.txt

import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const websiteDir = join(import.meta.dirname, '..', 'website');

function getKeys(content) {
	const keys = [];
	for (const line of content.split('\n')) {
		if (line.startsWith('[') && line.endsWith(']')) {
			keys.push(line.slice(1, -1));
		}
	}
	return keys;
}

const enKeys = new Set(getKeys(readFileSync(join(websiteDir, 'en.txt'), 'utf8')));
let hasIssues = false;

for (const file of readdirSync(websiteDir).sort()) {
	if (file === 'en.txt' || file === 'locales.json' || !file.endsWith('.txt')) continue;

	const locale = basename(file, '.txt');
	const localeKeys = new Set(getKeys(readFileSync(join(websiteDir, file), 'utf8')));

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
