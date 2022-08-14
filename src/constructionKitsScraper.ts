import { NodeFor, Page } from "puppeteer";
import getImages from "./pictureExtractor";

export interface ConstructionKit {
  name: string;
  link: string;
  pictureURL: string;
  pictureName: string;
}

async function getConstructionKits(page: Page): Promise<void> {
  const constructionKits = await page.$$eval(
    ".kit.views-row",
    (constructionDivs) => {
      const constructionKits: ConstructionKit[] = [];

      const constructionKitAdder = (el: NodeFor<string>) => {
        const link = el.querySelector("a").href;
        const name = el.querySelector(".mdb-cat-meta-title").innerHTML;
        const pictureURL = el.querySelector("picture img").src;

        if (link) {
          constructionKits.push({
            name,
            link,
            pictureURL,
            pictureName: `${name.toLowerCase().replace(/ /g, "_")}.png`,
          });
        }
      };

      constructionDivs.forEach((el) => {
        constructionKitAdder(el);
      });

      return constructionKits;
    }
  );

  await getImages(page, constructionKits);
}

export default getConstructionKits;
