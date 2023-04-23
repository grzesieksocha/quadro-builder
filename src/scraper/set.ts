import { NodeFor, Page } from "puppeteer";
import { Set, SetType } from "../interface/objects";
import getImages from "../service/pictureExtractor";
import { insertSet } from "../service/db";

const URL = "https://quadromdb.com/";

async function getConstructionKit(
  page: Page,
  selector: string,
  type: SetType
): Promise<void> {
  await page.goto(URL);
  await page.waitForSelector(".views-element-container");

  const sets = await page.$$eval(
    selector,
    (setDivs, type) => {
      const sets: Set[] = [];

      const setAdder = (el: NodeFor<string>) => {
        const url = el.querySelector("a").href;
        const name = el.querySelector(".mdb-cat-meta-title").innerHTML;
        const pictureURL = el.querySelector("picture img").src;

        if (url) {
          sets.push({
            type,
            name,
            url,
            pictureURL,
            pictureName: `${name.toLowerCase().replace(/ /g, "_")}.png`,
          });
        }
      };

      setDivs.forEach((el) => setAdder(el));

      return sets;
    },
    type
  );

  for (const set of sets) {
    insertSet(set.name, set.type, set.url, set.pictureName);
  }

  await getImages(page, sets);
}

export default getConstructionKit;
