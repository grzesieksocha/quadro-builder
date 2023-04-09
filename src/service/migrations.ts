import * as dotenv from "dotenv";
import fs from "fs";

dotenv.config();

import sqlite3, { Database } from "better-sqlite3";

export function runMigrations() {
  const db = new sqlite3(process.env.DB_URL);

  createSetsDb(db);
  createDesignsDb(db);

  db.close();
}

function createSetsDb(db: Database) {
  const stmt = db.prepare(
    `CREATE TABLE IF NOT EXISTS sets (
      id INTEGER PRIMARY KEY,
      type TEXT NOT NULL,
      name TEXT NOT NULL UNIQUE,
      url TEXT NOT NULL UNIQUE,
      picture TEXT NOT NULL UNIQUE
    );`
  );

  stmt.run();
}

function createDesignsDb(db: Database) {
  const stmt = db.prepare(
    `CREATE TABLE IF NOT EXISTS designs (
      id INTEGER PRIMARY KEY,
      code TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL,
      url TEXT NOT NULL UNIQUE,
      picture TEXT NOT NULL UNIQUE,
      age INTEGER NOT NULL,
      time_to_build INTEGER NOT NULL
    );`
  );

  stmt.run();
}

runMigrations();
