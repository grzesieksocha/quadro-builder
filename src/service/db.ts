import { Page } from "puppeteer";
import { Design } from "../interface/objects";
import { SetType } from "../interface/objects";
import { Set } from "../interface/objects";
import getDesignsForSet from "../scraper/design";
import sqlite3 from "better-sqlite3";

function getDatabase() {
  return new sqlite3(process.env.DB_URL);
}

export function insertSet(
  name: string,
  type: SetType,
  url: string,
  picture: string
) {
  const db = getDatabase();

  const stmt = db.prepare(
    "INSERT or IGNORE INTO sets (name, type, url, picture) VALUES (:name, :type, :url, :picture);"
  );

  return stmt.run({ name, type, url, picture });
}

export function insertDesign(design: Design) {
  const db = getDatabase();

  const stmt = db.prepare(
    "INSERT or IGNORE INTO designs (code, name, type, url, picture, age, time) VALUES (:code, :name, :type, :url, :picture, :age, :time);"
  );

  return stmt.run({
    code: design.code,
    name: design.name,
    type: design.type,
    url: design.url,
    picture: design.pictureName,
    age: design.age,
    time: design.timeToBuild,
  });
}

export function getSets(page: Page) {
  const db = getDatabase();

  const sets: Set[] = [];

  const stmt = db.prepare("SELECT * FROM sets;");

  for (const set in stmt.all()) {
    // getDesignsForSet(page, set);
  }

  // return sets;
}
