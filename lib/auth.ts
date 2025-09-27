// lib/auth.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const COOKIE_NAME = "auth_token";

export function getCurrentUser(cookieHeader?: string | null) {
  if (!cookieHeader) return null;

  const match = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
  const token = match?.split("=")[1];
  if (!token) return null;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };
    return payload;
  } catch {
    return null;
  }
}
