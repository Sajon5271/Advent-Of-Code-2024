import { readTestFileContentForDay } from '../utils/index';

const fileContent = readTestFileContentForDay(3);

const allMatchingMultiplyInstructions = [
  ...fileContent.matchAll(/mul\(\d{1,3},\d{1,3}\)|don\'t\(\)|do\(\)/g),
].map((out) => out[0]);

let currentlyOn = true;
const total = allMatchingMultiplyInstructions.reduce((acc, curr) => {
  if (curr === "don't()") {
    currentlyOn = false;
    return acc;
  }
  if (curr === 'do()') {
    currentlyOn = true;
    return acc;
  }
  if (!currentlyOn) return acc;
  const multiplied = curr
    .slice(4, -1)
    .split(',')
    .map((el) => parseInt(el))
    .reduce((a, c) => a * c, 1);
  return acc + multiplied;
}, 0);

console.log(total);
