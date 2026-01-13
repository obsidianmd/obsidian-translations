import * as fs from 'fs';
import { parseTxtFile, dataToTxtFormat } from './txt-parser';
import { ALL_LANGUAGE_CODES } from './languages';

async function main(): Promise<void> {
  const data = parseTxtFile(fs.readFileSync('terms.txt', 'utf-8'));

  const langs: any = {description: {}};

  for (let lang of ALL_LANGUAGE_CODES) {
    langs[lang] = {};
  }

  for (let key in data) {
    if (!Object.hasOwn(data, key) || key.startsWith('==')) continue;
    let value = data[key];
    let desc = value.description;
    langs['description'][key] = desc || '';

    for (let lang of ALL_LANGUAGE_CODES) {
      langs[lang][key] = value[lang] || '';
    }
  }

  const output = dataToTxtFormat(langs);
  fs.writeFileSync('terms.txt', output, 'utf-8');
}

main();
