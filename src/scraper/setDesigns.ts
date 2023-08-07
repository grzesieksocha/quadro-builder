import browserSingleton from "../service/browserSingleton";
import { connectSetWithDesign } from "../service/db";

export default async function setDesigns(url: string, id: number) {
  const browser = await browserSingleton.getBrowser();
  const page = await browser.newPage();

  await page.goto(url);

  const designs: string[] = await page.$$eval(
    "[class^='type'].views-row",
    (designs) => {
      return designs.map(
        (design) => design.querySelector(".mdb-cat-meta-code")?.innerHTML
      );
    }
  );

  for (const design of designs) {
    await connectSetWithDesign(id, design);
  }

  await page.close();
}
