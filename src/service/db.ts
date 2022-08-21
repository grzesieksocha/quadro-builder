import sqlite3 from "sqlite3";
import { SetType } from "../objects";

export async function insertConstructionKit(
  name: string,
  type: SetType,
  url: string,
  picture: string
) {
  const db = new sqlite3.Database(process.env.DB_URL);

  db.run(
    "INSERT INTO sets (name, type, url, picture) VALUES ($name, $type, $url, $picture);",
    {
      $name: name,
      $type: type,
      $url: url,
      $picture: picture,
    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Inserted id: ${this.lastID}`);
      }
    }
  );
}
