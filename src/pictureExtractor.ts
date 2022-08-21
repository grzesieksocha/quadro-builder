import { Page } from "puppeteer";
import { Set } from "./objects";
import { fileExists, saveFile } from "./service/fileSaver";

export default async function getImages(page: Page, kits: Set[]) {
  for (const kit of kits) {
    const folder = `data/picture/${kit.type}`;

    try {
      await fileExists(`${folder}/${kit.pictureName}`);

      console.log(`'${kit.pictureName}' exists - skipping save (pre fetch)`);

      continue;
    } catch {
      const pictureSource = await page.goto(kit.pictureURL);

      if (pictureSource) {
        const buffer = await pictureSource.buffer();
        saveFile(folder, kit.pictureName, buffer);
      }
    }
  }
}
