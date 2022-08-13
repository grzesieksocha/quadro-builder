import * as fs from "fs";

export function saveFile(dir: string, file: string, buffer: Buffer) {
  fs.access(dir, function (err) {
    if (err) {
      fs.mkdir(dir, { recursive: true }, (err) => console.log(err));
    }
  });

  fs.writeFile(`${dir}/${file}`, buffer, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}
