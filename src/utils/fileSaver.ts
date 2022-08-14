import { constants } from "node:fs";
import { access, writeFile, mkdir } from "node:fs/promises";

export async function saveFile(dir: string, file: string, buffer: Buffer) {
  try {
    await access(`${dir}/${file}`);
  } catch {
    try {
      await access(dir, constants.W_OK);
    } catch {
      await mkdir(dir, { recursive: true });
    }

    try {
      await writeFile(`${dir}/${file}`, buffer);
    } catch (err) {
      return console.error(err);
    }
  }
}
