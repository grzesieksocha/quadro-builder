import { Set } from "../interface/objects";
import { fileExists, saveFile } from "./fileSaver";
import browserSingleton from "./browserSingleton";

export default async function getImages(kits: Set[]) {
  const browser = await browserSingleton.getBrowser();
  const page = await browser.newPage();

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

  await page.close();
}
