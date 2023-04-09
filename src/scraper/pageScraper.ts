import { Page } from "puppeteer";
import { getSets } from "../service/db";
import getDesignsForSet from "./design";
import getConstructionKit from "./set";
import { Set } from "../interface/objects";
import { type } from "os";

const CONSTRUCTION_KIT_ROW_SELECTOR = ".kit.views-row";
const EXTENSION_ROW_SELECTOR = ".expansion.views-row";

async function scraper(page: Page) {
  await getConstructionKit(
    page,
    CONSTRUCTION_KIT_ROW_SELECTOR,
    "construction_kit"
  );
  await getConstructionKit(page, EXTENSION_ROW_SELECTOR, "extension");

  // const sets = getSets(page);
}

export default scraper;
