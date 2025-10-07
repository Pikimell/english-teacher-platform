#!/usr/bin/env node

/**
 * Utility script to convert lexical lesson tables into word modules.
 * 1. Reads each HTML file in src/public/lessons/lexical.
 * 2. Extracts table rows (word / translation / example).
 * 3. Generates JS modules under src/public/scripts/communication/words.
 * 4. Replaces the table markup with a communication-style placeholder.
 */

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const lessonsDir = path.join(ROOT, 'src', 'public', 'lessons', 'lexical');
const outputDir = path.join(
  ROOT,
  'src',
  'public',
  'scripts',
  'communication',
  'words'
);

const decodeEntities = value => {
  if (!value) return '';
  const map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&ndash;': '–',
    '&mdash;': '—',
  };
  return value.replace(/&[a-zA-Z0-9#]+;/g, entity => map[entity] || entity);
};

const stripTags = value =>
  decodeEntities(
    String(value || '')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/?(strong|em|span)>/gi, '')
      .replace(/<[^>]+>/g, '')
  )
    .replace(/\s+/g, ' ')
    .trim();

const toModuleContent = words => {
  const rows = words
    .map(
      item =>
        `  { word: ${JSON.stringify(item.word)}, translation: ${JSON.stringify(
          item.translation
        )}, example: ${JSON.stringify(item.example)} }`
    )
    .join(',\n');
  return `export const words = [
${rows}
];

export default words;
`;
};

const moduleNames = [];

fs.readdirSync(lessonsDir)
  .filter(fileName => fileName.endsWith('.html'))
  .forEach(fileName => {
    const filePath = path.join(lessonsDir, fileName);
    const html = fs.readFileSync(filePath, 'utf8');
    const rows = [...html.matchAll(/<tr[\s\S]*?<\/tr>/gi)];

    if (!rows.length) {
      console.warn(`[convert-lexical] No <tr> rows found in ${fileName}`);
      return;
    }

    const words = rows
      .map(rowMatch => {
        const rowHtml = rowMatch[0];
        const wordMatch = rowHtml.match(/<th[^>]*>([\s\S]*?)<\/th>/i);
        const cellMatches = [...rowHtml.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)];
        if (!wordMatch || cellMatches.length < 2) {
          return null;
        }
        const word = stripTags(wordMatch[1]);
        const translation = stripTags(cellMatches[0][1]);
        const example = stripTags(cellMatches[1][1]);
        if (!word) return null;
        return { word, translation, example };
      })
      .filter(Boolean);

    const moduleName = path.basename(fileName, '.html');
    moduleNames.push(moduleName);

    const modulePath = path.join(outputDir, `${moduleName}.js`);
    const moduleContent = toModuleContent(words);
    fs.writeFileSync(modulePath, moduleContent, 'utf8');

    const placeholder = `<div class="lexical-topic__table" data-communication-words data-module="${moduleName}"></div>`;
    const updatedHtml = html.replace(
      /<div class="lexical-topic__table">[\s\S]*?<\/div>/,
      placeholder
    );
    fs.writeFileSync(filePath, updatedHtml, 'utf8');

    console.log(
      `[convert-lexical] Processed ${fileName} -> ${moduleName}.js (${words.length} entries)`
    );
  });

if (moduleNames.length) {
  const listPath = path.join(
    ROOT,
    'src',
    'public',
    'scripts',
    'communication',
    'words',
    '_communication-modules.json'
  );
  fs.writeFileSync(
    listPath,
    JSON.stringify(moduleNames.sort(), null, 2),
    'utf8'
  );
  console.log(
    `[convert-lexical] Wrote module manifest with ${moduleNames.length} entries`
  );
}
