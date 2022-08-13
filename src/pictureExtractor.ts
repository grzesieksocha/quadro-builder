import { Browser, Page } from "puppeteer";
import { ConstructionKit } from "./constructionKitsScraper";
import * as fs from "fs";
import { saveFile } from "./fileSaver";

const PICTURE_FOLDER = "data/picture";

export default async function getImages(page: Page, kits: ConstructionKit[]) {
  for (const kit of kits) {
    const pictureSource = await page.goto(kit.pictureURL);

    if (pictureSource) {
      const pictureName = kit.pictureURL.split("/").pop();

      if (pictureName) {
        const buffer = await pictureSource.buffer();
        saveFile(PICTURE_FOLDER, pictureName, buffer);
      }
    }
  }
}
