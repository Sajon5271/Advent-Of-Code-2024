import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';

export const readTestFileContentForDay = (day: number): string => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  return readFileSync(path.join(__dirname, `../inputs/day${day}.txt`), 'utf-8');
};
