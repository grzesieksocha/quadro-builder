import { NodeFor, Page } from "puppeteer";
import { Set } from "../interface/objects";
import { Design } from "../interface/objects";
import { insertDesign } from "../service/db";

const DESIGN_SELECTOR = ".view-mdb-designs .views-row";

async function getDesignsForSet(page: Page, set: Set): Promise<Design[]> {
  page.goto(set.url);
  await page.waitForSelector(".views-element-container");

  const designs = await page.$$eval(DESIGN_SELECTOR, (designDivs) => {
    const designs: Design[] = [];

    const designAdder = (el: NodeFor<string>) => {
      const url = el.querySelector("a").href;
      const code = el.querySelector(".mdb-cat-meta-code").innerHTML;
      const name = el.querySelector(".mdb-cat-meta-title").innerHTML;
      const age = el.querySelector(".mdb-cat-meta-age").innerHTML;
      const timeToBuild = el.querySelector(".mdb-cat-meta-time span").innerHTML;
      const pictureURL = el.querySelector("picture img").src;
      const type = "core"; // @todo change

      if (url) {
        designs.push({
          code,
          name,
          type,
          url,
          pictureURL,
          pictureName: `${name.toLowerCase().replace(/ /g, "_")}.png`,
          age: 1,
          timeToBuild,
        });
      }
    };

    designDivs.forEach((el) => {
      designAdder(el);
    });

    return designs;
  });

  for (const design of designs) {
    insertDesign(design);
  }

  // await getImages(page, sets);
  return designs;
}

export default getDesignsForSet;
