import { assert } from 'console';
import { readTestFileContentForDay } from '../utils/index';

const fileContent = readTestFileContentForDay(2);

let totalSafe = 0;

fileContent.split('\n').forEach((line) => {
  const numbers = line.split(' ').map((el) => parseInt(el));
  assert(numbers.length > 1);
  if (isSafeSequece(numbers)) totalSafe++;
  else {
    const altNumberLists = numbers.map((_, idx, arr) => {
      return [...arr].toSpliced(idx, 1);
    });
    if (altNumberLists.some((list) => isSafeSequece(list))) {
      totalSafe++;
    }
  }
});

function isSafeSequece(numbers: number[]) {
  const currentDirection =
    (numbers[1] - numbers[0]) / Math.abs(numbers[1] - numbers[0]);
  for (let i = 0; i < numbers.length - 1; i++) {
    const diff = numbers[i + 1] - numbers[i];
    const absouluteDiff = Math.abs(diff);
    if (
      diff / absouluteDiff !== currentDirection ||
      absouluteDiff < 1 ||
      absouluteDiff > 3
    ) {
      return false;
    }
  }
  return true;
}
console.log(totalSafe);
