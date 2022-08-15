import { NodeFor, Page } from "puppeteer";
import { Set } from "../objects";
import getImages from "../pictureExtractor";

const URL = "https://quadromdb.com/";

async function getSet(
  page: Page,
  selector: string,
  type: string
): Promise<void> {
  page.goto(URL);
  await page.waitForSelector(".views-element-container");

  const sets = await page.$$eval(
    selector,
    (setDivs, type) => {
      const sets: Set[] = [];

      const setAdder = (el: NodeFor<string>) => {
        const link = el.querySelector("a").href;
        const name = el.querySelector(".mdb-cat-meta-title").innerHTML;
        const pictureURL = el.querySelector("picture img").src;

        if (link) {
          sets.push({
            type,
            name,
            link,
            pictureURL,
            pictureName: `${name.toLowerCase().replace(/ /g, "_")}.png`,
          });
        }
      };

      setDivs.forEach((el) => {
        setAdder(el);
      });

      return sets;
    },
    type
  );

  console.log(sets);

  await getImages(page, sets);
}

export default getSet;
