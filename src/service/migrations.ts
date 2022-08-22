import * as dotenv from "dotenv";
dotenv.config();

import sqlite3, { Database, OPEN_READWRITE } from "sqlite3";

export function runMigrations() {
  console.log(process.env.DB_URL);

  const db = new sqlite3.Database(process.env.DB_URL, OPEN_READWRITE);

  createSetsDb(db);
  createDesignsDb(db);
}

function createSetsDb(db: Database) {
  db.run(
    `CREATE TABLE IF NOT EXISTS sets (
      id INTEGER PRIMARY KEY,
      type TEXT NOT NULL,
      name TEXT NOT NULL UNIQUE,
      url TEXT NOT NULL UNIQUE,
      picture TEXT NOT NULL UNIQUE
    );`
  );
}

function createDesignsDb(db: Database) {
  db.run(
    `CREATE TABLE IF NOT EXISTS designs (
      id INTEGER PRIMARY KEY,
      code TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL,
      url TEXT NOT NULL UNIQUE,
      picture TEXT NOT NULL UNIQUE,
      age INTEGER NOT NULL,
      time INTEGER NOT NULL
    );`
  );
}

runMigrations();
