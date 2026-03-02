#!/usr/bin/env node
// Check website translations for terms that should be translated per the glossary

import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const root = join(import.meta.dirname, '..');
const websiteDir = join(root, 'website');

// Parse terms.txt
const termsContent = readFileSync(join(root, 'terms.txt'), 'utf-8');
const sections = {};
let currentSection = null;
for (const line of termsContent.split('\n')) {
	if (line.startsWith('[') && line.endsWith(']')) {
		currentSection = line.slice(1, -1);
		sections[currentSection] = {};
	} else if (currentSection && line.includes('=')) {
		const eq = line.indexOf('=');
		const key = line.slice(0, eq);
		const value = line.slice(eq + 1);
		if (value) sections[currentSection][key] = value;
	}
}

// Terms that are OK to leave in English (brand names, common loanwords)
const skipTerms = new Set([
	'obsidian', 'obsidian sync', 'obsidian publish', 'markdown', 'catalyst',
	'web clipper', 'canvas', 'note', 'image', 'base', 'mobile', 'documentation',
	'id', 'comment', 'file', 'email', 'icon', 'pdf', 'help', 'support',
	'changelog',
]);

function getEntries(obj, prefix = '') {
	let results = [];
	for (const [k, v] of Object.entries(obj)) {
		const key = prefix ? `${prefix}.${k}` : k;
		if (typeof v === 'object' && v !== null) {
			results = results.concat(getEntries(v, key));
		} else {
			results.push({ key, value: String(v) });
		}
	}
	return results;
}

function stripMarkup(text) {
	return text
		.replace(/<[^>]+>/g, '')        // HTML tags
		.replace(/https?:\/\/\S+/g, '') // URLs
		.replace(/mailto:\S+/g, '')     // mailto
		.replace(/%LOCALE_PATH%/g, ''); // placeholder
}

let hasIssues = false;

for (const file of readdirSync(websiteDir).sort()) {
	if (file === 'en.json' || file === 'locales.json' || !file.endsWith('.json')) continue;

	const locale = basename(file, '.json');
	const terms = sections[locale];
	if (!terms) continue;

	const data = JSON.parse(readFileSync(join(websiteDir, file), 'utf8'));
	const entries = getEntries(data);

	const issues = [];

	for (const [term, expected] of Object.entries(terms)) {
		if (skipTerms.has(term.toLowerCase())) continue;

		const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');

		for (const { key, value } of entries) {
			const clean = stripMarkup(value);
			if (regex.test(clean)) {
				issues.push({ key, term, expected, snippet: clean.substring(0, 80) });
			}
		}
	}

	if (issues.length === 0) {
		console.log(`${locale}: OK`);
	} else {
		hasIssues = true;
		console.log(`\n${locale}: ${issues.length} potential glossary issues`);
		for (const { key, term, expected, snippet } of issues) {
			console.log(`  [${key}] "${term}" should be "${expected}"`);
			console.log(`    ${snippet}`);
		}
	}
}

process.exit(hasIssues ? 1 : 0);
