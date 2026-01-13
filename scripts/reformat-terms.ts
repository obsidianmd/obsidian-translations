import * as fs from 'fs';
import { parseTxtFile, dataToTxtFormat } from './txt-parser';

async function main(): Promise<void> {
  const data = parseTxtFile(fs.readFileSync('terms.txt', 'utf-8'));

  for (let key in data) {
    if (!Object.hasOwn(data, key)) continue;
    let value = data[key];
    let desc = value.description;
    delete value.description;
    let languages = Object.keys(value).sort();
    if (desc) {
        value.description = desc;
    }
    for (let lang of languages) {
        let val = value[lang];
        delete value[lang];
        value[lang] = val;
    }
  }

  const output = dataToTxtFormat(data);
  fs.writeFileSync('terms.txt', output, 'utf-8');
}

main();
