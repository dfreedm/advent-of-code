import { readFileSync } from "fs";

export function readData(file) {
  const data = readFileSync(new URL(file, import.meta.url), "utf-8").split(
    /\n/
  );
  return data.map((note) =>
    note.split("|").map((part) => part.trim().split(" "))
  );
}
