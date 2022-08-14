import { Browser } from "puppeteer";
import getConstructionKits from "./constructionKitsScraper";

const URL = "https://quadromdb.com/";

async function scraper(browser: Browser) {
  const page = await browser.newPage();
  console.log(`Navigating to ${URL}...`);
  await page.goto(URL);

  await page.waitForSelector(".views-element-container");

  await getConstructionKits(page);
}

export default scraper;
