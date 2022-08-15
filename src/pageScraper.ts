import { Browser } from "puppeteer";
import getSet from "./scrapers/set";

const CONSTRUCTION_KIT_ROW_SELECTOR = ".kit.views-row";
const EXTENSION_ROW_SELECTOR = ".expansion.views-row";

async function scraper(browser: Browser) {
  const page = await browser.newPage();

  await getSet(page, CONSTRUCTION_KIT_ROW_SELECTOR, "construction_set");
  await getSet(page, EXTENSION_ROW_SELECTOR, "extension");
}

export default scraper;
