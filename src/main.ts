import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import browserSingleton from "./service/browserSingleton";

dotenv.config();

const prisma = new PrismaClient();

export { prisma };

import run from "./app";

run()
  .then(async () => {
    await prisma.$disconnect();
    await browserSingleton.closeBrowser();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await browserSingleton.closeBrowser();
    process.exit(1);
  });
