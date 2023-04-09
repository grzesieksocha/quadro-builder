import { launch } from "puppeteer";
import scraper from "./scraper/pageScraper";

export default async function run() {
  const browser = await launch({
    headless: true,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  await scraper(page);

  await page.close();
  await browser.close();
}
