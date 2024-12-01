import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import assert from 'node:assert';
const __dirname = dirname(fileURLToPath(import.meta.url));

const fileContent = readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const arr1: number[] = [];
const arr2: number[] = [];

fileContent.split('\n').forEach((line) => {
  const [first, second] = line.split(/[ ]+/).map((e) => parseInt(e));
  arr1.push(first);
  arr2.push(second);
});

assert(arr1.length === arr2.length);

arr1.sort((a, b) => a - b);
arr2.sort((a, b) => a - b);

const total = arr1.reduce(
  (acc, curr, idx) => acc + Math.abs(curr - arr2[idx]),
  0
);
const arr2CountObj: { [key: string]: number } = {};

arr2.forEach((el) => {
  const stringifiedKey = '' + el;
  arr2CountObj[stringifiedKey] = (arr2CountObj[stringifiedKey] || 0) + 1;
});
let count = 0;
arr1.forEach((el) => {
  const stringifiedKey = '' + el;
  count += (arr2CountObj[stringifiedKey] || 0) * el;
});
console.log(count);
