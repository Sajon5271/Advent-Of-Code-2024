import { assert } from 'console';
import { readTestFileContentForDay } from '../utils/index';

const fileContent = readTestFileContentForDay(2);

let totalSafe = 0;

fileContent.split('\n').forEach((line) => {
  const numbers = line.split(' ').map((el) => parseInt(el));
  assert(numbers.length > 1);
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
      return;
    }
  }
  totalSafe++;
});

console.log(totalSafe);
