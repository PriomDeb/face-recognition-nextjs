"use server";
// face.action.ts

import { db } from "@/db/drizzle";
import { students } from "@/db/schema";
import { eq } from "drizzle-orm";

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

//------------------------ Student Table ------------------------//

export async function getStudents() {
  const allStudents = await db.select().from(students);
  return allStudents;
}

type CreateStudentInput = {
  name: string;
  email: string;
  phone?: string;
  faceRegistered?: boolean;
};

//---- Create Student ----//
export async function createStudent({
  name,
  email,
  phone,
  faceRegistered = false,
}: CreateStudentInput) {
  try {
    // Check if student already exists
    const existing = await db
      .select()
      .from(students)
      .where(eq(students.email, email));

    if (existing.length > 0) {
      return {
        success: false,
        message: "Student with this email already exists",
      };
    }

    // Insert new student
    const [newStudent] = await db
      .insert(students)
      .values({
        name,
        email,
        phone,
        faceRegistered,
      })
      .returning();

    return { success: true, student: newStudent };
  } catch (error) {
    console.error("Error creating student:", error);
    return { success: false, message: "Failed to create student" };
  }
}

//---- Update Student ----//
type UpdateStudentInput = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  faceRegistered?: boolean;
};

export async function updateStudent({
  id,
  name,
  email,
  phone,
  faceRegistered,
}: UpdateStudentInput) {
  try {
    const [updatedStudent] = await db
      .update(students)
      .set({
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(faceRegistered !== undefined && { faceRegistered }),
        updatedAt: new Date(), // manually update timestamp
      })
      .where(eq(students.id, id))
      .returning();

    if (!updatedStudent) {
      return { success: false, message: "Student not found" };
    }

    return { success: true, student: updatedStudent };
  } catch (error) {
    console.error("Error updating student:", error);
    return { success: false, message: "Failed to update student" };
  }
}

//---- Delete Student ----//
export async function deleteStudent(id: string) {
  try {
    const deleted = await db
      .delete(students)
      .where(eq(students.id, id))
      .returning();

    if (!deleted.length) {
      return { success: false, message: "Student not found" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting student:", error);
    return { success: false, message: "Failed to delete student" };
  }
}

//------------------------ ------------------------//
//------------------------ ------------------------//
//------------------------ ------------------------//
//------------------------ ------------------------//
//------------------------ ------------------------//
//------------------------ ------------------------//
//------------------------ ------------------------//
//------------------------ ------------------------//
//------------------------ ------------------------//
//------------------------ ------------------------//
//------------------------ ------------------------//
//------------------------ ------------------------//
//------------------------ ------------------------//
