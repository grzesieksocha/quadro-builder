import { Page } from "puppeteer";
import { ConstructionKit } from "./constructionKitsScraper";
import { fileExists, saveFile } from "./utils/fileSaver";

const PICTURE_FOLDER = "data/picture/construction_kit";

export default async function getImages(page: Page, kits: ConstructionKit[]) {
  for (const kit of kits) {
    try {
      await fileExists(`${PICTURE_FOLDER}/${kit.pictureName}`);

      console.log(`'${kit.pictureName}' exists - skipping save (pre fetch)`);

      continue;
    } catch {
      const pictureSource = await page.goto(kit.pictureURL);

      if (pictureSource) {
        const buffer = await pictureSource.buffer();
        saveFile(PICTURE_FOLDER, kit.pictureName, buffer);
      }
    }
  }
}
