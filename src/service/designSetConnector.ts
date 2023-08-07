import { prisma } from "../main";
import setDesigns from "../scraper/setDesigns";

export default async function connectDesignsWithSets() {
  const sets = await prisma.set.findMany();

  if (!sets) {
    return;
  }

  for (const set of sets) {
    await setDesigns(set.url, set.id);
  }
}
