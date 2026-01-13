import * as fs from 'fs';
import { parseTxtFile, dataToTxtFormat } from './txt-parser';
import { ALL_LANGUAGE_CODES } from './languages';

async function main(): Promise<void> {
  const data = parseTxtFile(fs.readFileSync('terms.txt', 'utf-8'));

  let english = data.description;

  const results: any = {description: english};

  for (let lang of ALL_LANGUAGE_CODES) {
    let items = results[lang] = {};
    let prev = data[lang];
    for (let key in english) {
      if (!Object.hasOwn(english, key)) continue;
      items[key] = prev[key] || '';
    }

  }

  const output = dataToTxtFormat(results);
  fs.writeFileSync('terms.txt', output, 'utf-8');
}

main();
