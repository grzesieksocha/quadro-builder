import { Browser } from "puppeteer";
import getConstructionKits from "./constructionKitsScraper";
import getImages from "./pictureExtractor";

const URL = "https://quadromdb.com/";

async function scraper(browser: Browser) {
  const page = await browser.newPage();
  console.log(`Navigating to ${URL}...`);
  await page.goto(URL);

  await page.waitForSelector(".views-element-container");

  const divs = await getConstructionKits(page);
  await getImages(page, divs);
  console.log(divs);
}

export default scraper;
