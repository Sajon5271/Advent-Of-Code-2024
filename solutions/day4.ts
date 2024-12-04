import assert from 'node:assert';
import { readTestFileContentForDay } from '../utils/index';

const fileContent = readTestFileContentForDay(4);

let total = 0;
const linesOfInput = fileContent.split('\n');
// Slide sideways
linesOfInput.forEach((line) => {
  for (let i = 0; i <= line.length - 4; i++) {
    const substr = line.substring(i, i + 4);
    if (substr === 'XMAS' || substr === 'SAMX') {
      total++;
    }
  }
});
//Slide Topdown all 3 combinations
const individulaCharactersOfLine = linesOfInput.map((el) => el.split(''));
assert(individulaCharactersOfLine.every((el) => el.length === individulaCharactersOfLine[0].length));
const lineLength = individulaCharactersOfLine[0].length;
for (let i = 0; i <= linesOfInput.length - 4; i++) {
  const line1 = individulaCharactersOfLine[i];
  const line2 = individulaCharactersOfLine[i + 1];
  const line3 = individulaCharactersOfLine[i + 2];
  const line4 = individulaCharactersOfLine[i + 3];
  // Slide for vertical
  for (let j = 0; j < lineLength; j++) {
    const constructedString = `${line1[j]}${line2[j]}${line3[j]}${line4[j]}`;
    if (constructedString === 'XMAS' || constructedString === 'SAMX') {
      total++;
    }
  }
  // Slide for '\' orientation
  for (let j = 0; j <= lineLength - 4; j++) {
    const constructedString = `${line1[j]}${line2[j + 1]}${line3[j + 2]}${line4[j + 3]}`;
    if (constructedString === 'XMAS' || constructedString === 'SAMX') {
      total++;
    }
  }
  // Slide for '/' orientation
  for (let j = 0; j <= lineLength - 4; j++) {
    const constructedString = `${line1[j + 3]}${line2[j + 2]}${line3[j + 1]}${line4[j]}`;
    if (constructedString === 'XMAS' || constructedString === 'SAMX') {
      total++;
    }
  }
}
console.log('Total found: ', total);
// Start of second part
let part2Total = 0;
for (let i = 0; i <= linesOfInput.length - 3; i++) {
  const line1 = individulaCharactersOfLine[i];
  const line2 = individulaCharactersOfLine[i + 1];
  const line3 = individulaCharactersOfLine[i + 2];
  for (let j = 0; j <= lineLength - 3; j++) {
    // Construct '\' of x
    const left = `${line1[j]}${line2[j + 1]}${line3[j + 2]}`;
    const right = `${line1[j + 2]}${line2[j + 1]}${line3[j]}`;
    if ((left === 'MAS' || left === 'SAM') && (right === 'MAS' || right === 'SAM')) {
      part2Total++;
    }
  }
}
console.log('Part two total: ', part2Total);
