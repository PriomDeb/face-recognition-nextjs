// route.js

export const runtime = "nodejs";

import { readdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const folderPath = path.join(process.cwd(), "public", "labeled_images");
    const entries = await readdir(folderPath, { withFileTypes: true });
    const names = entries.filter((e) => e.isDirectory()).map((e) => e.name);
    return new Response(JSON.stringify({ names }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ names: [], error: String(err) }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
