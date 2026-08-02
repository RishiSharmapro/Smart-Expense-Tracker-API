import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.resolve(process.cwd(), 'data', 'expenses.json');
let writeQueue: Promise<void> = Promise.resolve();

async function ensureFileExists(filePath: string): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]', 'utf8');
  }
}

export async function readJsonFile<T>(filePath: string, defaultValue: T): Promise<T> {
  await ensureFileExists(filePath);

  try {
    const contents = await fs.readFile(filePath, 'utf8');
    if (!contents.trim()) {
      return defaultValue;
    }

    return JSON.parse(contents) as T;
  } catch (error) {
    if (error instanceof SyntaxError) {
      return defaultValue;
    }

    throw error;
  }
}

export async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  await ensureFileExists(filePath);

  const payload = `${JSON.stringify(data, null, 2)}\n`;
  const tempFilePath = `${filePath}.tmp`;

  const nextWrite = writeQueue.then(async () => {
    await fs.writeFile(tempFilePath, payload, 'utf8');
    await fs.rename(tempFilePath, filePath);
  });

  writeQueue = nextWrite.catch(() => undefined);

  return nextWrite;
}

export { dataFilePath };
