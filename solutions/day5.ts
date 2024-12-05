import assert from 'node:assert';
import { readTestFileContentForDay } from '../utils/index';

const fileContent = readTestFileContentForDay(5);
const [sequences, printOrders] = fileContent.split('\n\n');

const printOrderMap: { [key: string]: string[] } = {};

sequences.split('\n').forEach((order) => {
  const [before, after] = order.split('|');
  printOrderMap[after] = [...(printOrderMap[after] || []), before];
});

let total = 0;
printOrders.split('\n').forEach((order) => {
  const splitPageNumbers = order.split(',');
  let error = false;
  for (let i = 0; i < splitPageNumbers.length; i++) {
    if (splitPageNumbers.slice(i + 1).some((el) => printOrderMap[splitPageNumbers[i]]?.includes(el))) {
      error = true;
      break;
    }
  }
  if (!error) {
    assert(splitPageNumbers.length % 2);
    total += parseInt(splitPageNumbers[Math.floor(splitPageNumbers.length / 2)]);
  }
});

console.log('Counted Toatal: ', total);
