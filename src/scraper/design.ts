import { NodeFor } from "puppeteer";
import { Design } from "../interface/objects";
import browserSingleton from "../service/browserSingleton";

async function getDesignsForSet(url: string) {
  const browser = await browserSingleton.getBrowser();
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector(".view-mdb-designs");

  const designs = await page.$$eval(
    ".view-mdb-designs .views-row",
    (elements) => {
      const designAdder = (el: NodeFor<string>): Design => {
        const name = el.querySelector(".mdb-cat-meta-title")?.innerHTML ?? "";

        return {
          code: el.querySelector(".mdb-cat-meta-code")?.innerHTML ?? "",
          name,
          type: "core",
          url: el.querySelector("a").href ?? "",
          pictureURL: el.querySelector("picture img").src ?? "",
          pictureName: `${name.toLowerCase().replace(/ /g, "_")}.png`,
          age: el.querySelector(".mdb-cat-meta-age span")?.innerHTML ?? "",
          timeToBuild:
            el.querySelector(".mdb-cat-meta-time span")?.innerHTML ?? "",
        };
      };

      return elements.map((el) => designAdder(el));
    }
  );

  await page.close();

  return designs;
}

export default getDesignsForSet;
