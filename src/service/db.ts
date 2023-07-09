import { Page } from "puppeteer";
import { Design } from "../interface/objects";
import { SetType } from "../interface/objects";
import getDesignsForSet from "../scraper/design";
import prisma from '../main';
import { Prisma } from "@prisma/client";

export async function insertSet(
  name: string,
  type: SetType,
  url: string,
  picture: string
) {
  try {
    await prisma.set.create(
      {
        data: {
          url,
          name,
          type,
          picture,
        }
      }
    );
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log('Set exists');

        return;
      }
    }

    throw e;
  }
}

export async function insertDesign(design: Design) {
  console.log(design.age)
  console.log(design.timeToBuild)
  try {
    await prisma.design.create(
      {
        data: {
          code: design.code,
          name: design.name,
          type: design.type,
          url: design.url,
          picture: design.pictureName,
          age: 0, // string fix later if needed
          time_to_build: 0, // string - fix later if needed
        }
      }
    )
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log('Design exists');

        return;
      }
    }

    throw e;
  }
}

export async function getSets(page: Page) {
  const allSets = await prisma.set.findMany(
    {
      select: {
        url: true
      },
    }
  )

  for (const set of allSets) {
    console.log(set);
    const designs = await getDesignsForSet(page, set.url);

    designs.forEach((design) => {
      if (design.url) insertDesign(design);
    });
  }
}
