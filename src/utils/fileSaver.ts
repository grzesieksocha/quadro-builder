import { constants } from "node:fs";
import { access, writeFile, mkdir } from "node:fs/promises";

export async function saveFile(dir: string, file: string, buffer: Buffer) {
  try {
    await fileExists(`${dir}/${file}`);

    console.log(`'${file}' exists - skipping save`);
  } catch {
    await createDir(dir);
    await write(`${dir}/${file}`, buffer);
  }
}

export async function fileExists(path: string) {
  await access(path);
}

async function write(path: string, buffer: Buffer) {
  try {
    await writeFile(path, buffer);
  } catch (err) {
    console.error(err);
  }
}

async function createDir(dir: string) {
  try {
    await access(dir, constants.W_OK);
  } catch {
    await mkdir(dir, { recursive: true });
  }
}
