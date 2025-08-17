"use server";

// face.action.ts

import { readdir } from "fs/promises";
import path from "path";

export const getStudentImage = async () => {
  try {
    const folderPath = path.join(process.cwd(), "public", "labeled_images");
    const entries = await readdir(folderPath, { withFileTypes: true });
    const names = entries.filter((e) => e.isDirectory()).map((e) => e.name);
    console.log(names);
    return names;
  } catch (err) {
    return;
  }
};
