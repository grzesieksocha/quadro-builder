import { Browser } from "puppeteer";
import scraper from "./pageScraper";

async function scrapeAll(browserInstance: Promise<Browser>) {
  let browser: Browser;
  try {
    browser = await browserInstance;

    await scraper(browser);

    await browser.close();
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

export default scrapeAll;
