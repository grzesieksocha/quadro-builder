import { Design } from "../interface/objects";
import { SetType } from "../interface/objects";
import getDesignsForSet from "../scraper/design";
import { prisma } from "../main";
import { Prisma } from "@prisma/client";

export async function insertSet(
  name: string,
  type: SetType,
  url: string,
  picture: string
) {
  try {
    await prisma.set.create({
      data: {
        url,
        name,
        type,
        picture,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log("Set exists");

        return;
      }
    }

    throw e;
  }
}

export async function insertDesign(design: Design) {
  try {
    await prisma.design.create({
      data: {
        code: design.code,
        name: design.name,
        type: design.type,
        url: design.url,
        picture: design.pictureName,
        age: 0, // string fix later if needed
        time_to_build: 0, // string - fix later if needed
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log("Design exists");

        return;
      }
    }

    throw e;
  }
}

export async function saveDesigns() {
  const allSets = await prisma.set.findMany({
    select: {
      url: true,
    },
  });

  for (const set of allSets) {
    const designs = await getDesignsForSet(set.url);

    for (const design of designs) {
      if (design.url) await insertDesign(design);
    }
  }
}

export async function connectSetWithDesign(setId: number, designCode: string) {
  try {
    await prisma.set.update({
      where: {
        id: setId,
      },
      data: {
        designs: {
          connect: {
            code: designCode,
          },
        },
      },
      include: {
        designs: true,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        console.log(`Unknown code ${designCode} for set ${setId}`);

        return;
      }
    }

    throw e;
  }
}
