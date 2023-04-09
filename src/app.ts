import { launch } from "puppeteer";
import getConstructionKit from "./scraper/set";
import { getSets } from "./service/db";

const CONSTRUCTION_KIT_ROW_SELECTOR = ".kit.views-row";
const EXTENSION_ROW_SELECTOR = ".expansion.views-row";

export default async function run() {
  const browser = await launch({
    headless: true,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  await getConstructionKit(
    page,
    CONSTRUCTION_KIT_ROW_SELECTOR,
    "construction_kit"
  );
  await getConstructionKit(page, EXTENSION_ROW_SELECTOR, "extension");

  // const sets = getSets(page);

  await page.close();
  await browser.close();
}
