import { launch } from "puppeteer";
import saveSets from "./scraper/set";
import { saveDesigns } from "./service/db";
import connectDesignsWithSets from "./service/designSetConnector";
import { describe } from "node:test";
import prisma from "./main";

const CONSTRUCTION_KIT_ROW_SELECTOR = ".kit.views-row";
const EXTENSION_ROW_SELECTOR = ".expansion.views-row";

export default async function run() {
  const browser = await launch({
    headless: "new",
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  if (!((await prisma.set.count()) > 0)) {
    console.log("Saving SETS!");

    await saveSets(page, CONSTRUCTION_KIT_ROW_SELECTOR, "construction_kit");

    await saveSets(page, EXTENSION_ROW_SELECTOR, "extension");
  }

  if (!((await prisma.design.count()) > 0)) {
    console.log("Saving DESIGNS!");

    await saveDesigns(page);
  }

  await connectDesignsWithSets();

  await page.close();
  await browser.close();
}
