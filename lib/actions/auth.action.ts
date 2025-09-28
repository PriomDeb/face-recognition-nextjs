// // // lib/actions/auth.action.ts
// // "use server";

// // import { eq } from "drizzle-orm";
// // import { db } from "@/db/drizzle";
// // import { teachers } from "@/db/schema";
// // import bcrypt from "bcrypt";
// // import jwt from "jsonwebtoken";

// // const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// // export async function signUpTeacherServer({
// //   name,
// //   email,
// //   password,
// // }: {
// //   name: string;
// //   email: string;
// //   password: string;
// // }) {
// //   const existing = await db.query.teachers.findFirst({
// //     where: eq(teachers.email, email),
// //   });
// //   if (existing) throw new Error("Email already exists");

// //   const hashed = await bcrypt.hash(password, 10);

// //   const [newTeacher] = await db
// //     .insert(teachers)
// //     .values({ name, email, passwordHash: hashed })
// //     .returning();

// //   const token = jwt.sign({ id: newTeacher.id, email }, JWT_SECRET, {
// //     expiresIn: "7d",
// //   });
// //   return { token, id: newTeacher.id, email: newTeacher.email };
// // }

// // export async function signInTeacherServer({
// //   email,
// //   password,
// // }: {
// //   email: string;
// //   password: string;
// // }) {
// //   const teacher = await db.query.teachers.findFirst({
// //     where: eq(teachers.email, email),
// //   });
// //   if (!teacher) throw new Error("Invalid credentials");

// //   const valid = await bcrypt.compare(password, teacher.passwordHash);
// //   if (!valid) throw new Error("Invalid credentials");

// //   const token = jwt.sign({ id: teacher.id, email }, JWT_SECRET, {
// //     expiresIn: "7d",
// //   });
// //   return { token, id: teacher.id, email: teacher.email };
// // }
// // lib/actions/auth.action.ts
// "use server";

// import { eq } from "drizzle-orm";
// import { db } from "@/db/drizzle";
// import { teachers } from "@/db/schema";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// async function setAuthCookie(token: string) {
//   const cookieStore = await cookies(); // ⬅️ await here
//   cookieStore.set("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24 * 7, // 7 days
//   });
// }

// export async function signUpTeacherServer({
//   name,
//   email,
//   password,
// }: {
//   name: string;
//   email: string;
//   password: string;
// }) {
//   const existing = await db.query.teachers.findFirst({
//     where: eq(teachers.email, email),
//   });
//   if (existing) throw new Error("Email already exists");

//   const hashed = await bcrypt.hash(password, 10);

//   const [newTeacher] = await db
//     .insert(teachers)
//     .values({ name, email, passwordHash: hashed })
//     .returning();

//   const token = jwt.sign({ id: newTeacher.id, email }, JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   await setAuthCookie(token); // ⬅️ must await

//   return { id: newTeacher.id, email: newTeacher.email };
// }

// export async function signInTeacherServer({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) {
//   const teacher = await db.query.teachers.findFirst({
//     where: eq(teachers.email, email),
//   });
//   if (!teacher) throw new Error("Invalid credentials");

//   const valid = await bcrypt.compare(password, teacher.passwordHash);
//   if (!valid) throw new Error("Invalid credentials");

//   const token = jwt.sign({ id: teacher.id, email }, JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   await setAuthCookie(token); // ⬅️ must await
//   console.log("✅ Cookie set for", email);

//   return { id: teacher.id, email: teacher.email };
// }

// export async function signOutTeacherServer() {
//   const cookieStore = await cookies();
//   cookieStore.delete("token");
// }
// lib/actions/auth.action.ts
"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { teachers } from "@/db/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const COOKIE_NAME = "auth_token"; // ✅ unified

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

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return { id: newTeacher.id, email: newTeacher.email };
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

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return { id: teacher.id, email: teacher.email };
}

export async function signOutTeacherServer() {
  (await cookies()).delete(COOKIE_NAME);
}

// app/sign-in/actions.ts

import { redirect } from "next/navigation";

export async function handleSignIn(values: {
  email: string;
  password: string;
}) {
  await signInTeacherServer(values);
  redirect("/"); // server-side redirect after cookie is set
}
