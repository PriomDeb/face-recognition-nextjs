"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { teachers } from "@/db/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function signUpTeacherServer({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const existing = await db.query.teachers.findFirst({
    where: eq(teachers.email, email),
  });
  if (existing) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(password, 10);

  const [newTeacher] = await db
    .insert(teachers)
    .values({ name, email, passwordHash: hashed })
    .returning();

  const token = jwt.sign({ id: newTeacher.id, email }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return { token, id: newTeacher.id, email: newTeacher.email };
}

export async function signInTeacherServer({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const teacher = await db.query.teachers.findFirst({
    where: eq(teachers.email, email),
  });
  if (!teacher) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, teacher.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: teacher.id, email }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return { token, id: teacher.id, email: teacher.email };
}
