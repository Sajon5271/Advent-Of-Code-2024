import { readTestFileContentForDay } from '../utils/index';

const fileContent = readTestFileContentForDay(3);

const allMatchingMultiplyInstructions = [
  ...fileContent.matchAll(/mul\(\d{1,3},\d{1,3}\)/g),
].map((out) => out[0]);

const total = allMatchingMultiplyInstructions.reduce((acc, curr) => {
  const multiplied = curr
    .slice(4, -1)
    .split(',')
    .map((el) => parseInt(el))
    .reduce((a, c) => a * c, 1);
  return acc + multiplied;
}, 0);

console.log(total);
