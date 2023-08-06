import saveSets from "./scraper/set";
import { saveDesigns } from "./service/db";
import connectDesignsWithSets from "./service/designSetConnector";
import { prisma } from "./main";

const CONSTRUCTION_KIT_ROW_SELECTOR = ".kit.views-row";
const EXTENSION_ROW_SELECTOR = ".expansion.views-row";

export default async function run() {
  if (!((await prisma.set.count()) > 0)) {
    console.log("Saving SETS!");

    await saveSets(CONSTRUCTION_KIT_ROW_SELECTOR, "construction_kit");

    await saveSets(EXTENSION_ROW_SELECTOR, "extension");
  } else {
    console.log("SETS already saved!");
  }

  if (!((await prisma.design.count()) > 0)) {
    console.log("Saving DESIGNS!");

    await saveDesigns();
  } else {
    console.log("DESIGNS already saved!");
  }

  await connectDesignsWithSets();
}
