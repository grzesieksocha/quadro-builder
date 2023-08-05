import prisma from "../main";

export default async function connectDesignsWithSets() {
  const designs = await prisma.design.findMany();

  designs.forEach((design) => console.log(design.name));

  return true;
}
