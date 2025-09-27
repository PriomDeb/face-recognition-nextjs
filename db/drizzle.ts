// import { config } from "dotenv";
// import { drizzle } from "drizzle-orm/neon-http";

// config({ path: [".env.local", ".env"] }); // or .env.local

// export const db = drizzle(process.env.DATABASE_URL!);

// drizzle.ts
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema"; // <-- import schema

config({ path: [".env.local", ".env"] });

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema }); // <-- pass schema
