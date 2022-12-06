import fs from "fs";

export const fileLoader = {
  loadFile: (filename) => {
    return fs.readFileSync(filename, { encoding: "utf-8" });
  },
};
