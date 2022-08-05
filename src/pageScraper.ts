import { Browser } from "puppeteer";

const URL = "https://quadromdb.com/";

async function scraper(browser: Browser) {
  const page = await browser.newPage();
  console.log(`Navigating to ${URL}...`);
  await page.goto(URL);

  await page.waitForSelector(".views-element-container");

  const urls = await page.$$eval(".kit.views-row", (constructionDivs) => {
    const links = constructionDivs.map((el) => el.querySelector("a").href);

    for (const link of links) {
      console.log(link);
    }

    // links = links.filter(
    // (link) =>
    // link.querySelector(".instock.availability > i").textContent !==
    // "In stock"
    // );
    // Extract the links from the data

    return links;
  });

  console.log(urls);
}

export default scraper;
