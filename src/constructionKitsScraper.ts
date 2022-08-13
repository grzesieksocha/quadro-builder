import { NodeFor, Page } from "puppeteer";

export interface ConstructionKit {
  name: string;
  link: string;
  pictureURL: string;
}

async function getConstructionKits(page: Page): Promise<ConstructionKit[]> {
  const constructionKits = await page.$$eval(
    ".kit.views-row",
    (constructionDivs) => {
      const constructionKits: ConstructionKit[] = [];

      const constructionKitAdder = (el: NodeFor<string>) => {
        const link = el.querySelector("a").href;
        const name = el.querySelector(".mdb-cat-meta-title").innerHTML;
        const pictureURL = el.querySelector("picture img").src;

        if (link) {
          constructionKits.push({ name, link, pictureURL });
        }
      };

      constructionDivs.forEach((el) => {
        constructionKitAdder(el);
      });

      return constructionKits;
    }
  );

  return constructionKits;
}

export default getConstructionKits;
