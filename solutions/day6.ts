import { writeFile, writeFileSync } from 'node:fs';
import { readTestFileContentForDay } from '../utils/index';

const fileContent = readTestFileContentForDay(6);
const mapGrid = fileContent.split('\n').map((el) => el.split(''));
const guardStartPos = '^';
const obstacle = '#';
const directions = [
  { symbol: '^', dir: [0, -1] },
  { symbol: '>', dir: [1, 0] },
  { symbol: 'v', dir: [0, 1] },
  { symbol: '<', dir: [-1, 0] },
] as const;

let startingPosition: [number, number] | undefined;
for (let i = 0; i < mapGrid.length; i++) {
  for (let j = 0; j < mapGrid.length; j++) {
    if (mapGrid[i][j] === guardStartPos) {
      startingPosition = [j, i];
      break;
    }
  }
  if (startingPosition) {
    break;
  }
}
if (startingPosition) {
  let iter = 0;
  let currentPosition = startingPosition;
  mapGrid[currentPosition[1]][currentPosition[0]] = 'X';
  let currentDirectionIndex = directions.findIndex((el) => el.symbol === guardStartPos);
  if (currentDirectionIndex === -1) throw new Error('Could not find direction');

  while (checkInBounds(currentPosition[0], currentPosition[1])) {
    let currentDirection = directions[currentDirectionIndex % 4].dir;
    const [currentX, currentY] = currentPosition;
    const [dirX, dirY] = currentDirection;
    const [x, y] = [currentX + dirX, currentY + dirY];
    if (!checkInBounds(x, y)) {
      break;
    }
    if (mapGrid[y][x] === obstacle) {
      currentDirectionIndex++;
      continue;
    }
    currentPosition = [x, y];
    mapGrid[y][x] = 'X';
    iter++;
  }
}

function checkInBounds(x: number, y: number) {
  return x >= 0 && x < mapGrid[0].length && y >= 0 && y < mapGrid.length;
}

console.log(
  'Part 1 solution: ',
  mapGrid.reduce((acc, curr) => {
    return acc + curr.reduce((a, c) => (c === 'X' ? ++a : a), 0);
  }, 0)
);
