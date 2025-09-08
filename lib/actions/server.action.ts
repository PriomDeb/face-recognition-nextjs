"use server";
// face.action.ts

import { db } from "@/db/drizzle";
import { attendanceRecords, studentImages, students } from "@/db/schema";
import { eq, gte, and } from "drizzle-orm";

import { readdir } from "fs/promises";
import path from "path";
import fs from "fs";

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
  rollNumber?: string;
  phone?: string;
  faceRegistered?: boolean;
};

//---- Create Student ----//
export async function createStudent({
  name,
  email,
  phone,
  rollNumber = "",
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
        rollNumber,
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
  rollNumber?: string;
  faceRegistered?: boolean;
};

export async function updateStudent({
  id,
  name,
  email,
  phone,
  faceRegistered,
  rollNumber,
}: UpdateStudentInput) {
  try {
    const [updatedStudent] = await db
      .update(students)
      .set({
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(rollNumber !== undefined && { rollNumber }),
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

//------------------------ Upload Images ------------------------//

export async function saveStudentImage(
  file: File,
  studentName: string,
  studentId: string
) {
  try {
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure directory exists
    const dir = path.join(
      process.cwd(),
      "public",
      "labeled_images",
      studentName
    );
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Save file as 1.jpg (or increment later if multiple)
    const filePath = path.join(dir, "1.jpg");
    fs.writeFileSync(filePath, buffer);

    // Convert to public path (for frontend use)
    const publicPath = `/labeled_images/${studentName}/1.jpg`;

    // Insert record into student_images table
    await db.insert(studentImages).values({
      studentId,
      imagePath: publicPath,
    });

    // Optionally update student’s faceRegistered flag
    await db
      .update(students)
      .set({ faceRegistered: true })
      .where(eq(students.id, studentId));

    return { success: true, filePath: publicPath };
  } catch (error) {
    console.error("Error saving student image:", error);
    return { success: false, message: "Failed to save image" };
  }
}

//------------------------ Get Student by StudentID ------------------------//
export async function getStudentById(studentId: string) {
  const [student] = await db
    .select()
    .from(students)
    .where(eq(students.id, studentId));

  // optionally, get imagePath
  const [image] = await db
    .select()
    .from(studentImages)
    .where(eq(studentImages.studentId, studentId));

  return { ...student, imagePath: image?.imagePath };
}

//------------------------ ------------------------//

// Marks attendance for a student
export async function markAttendance(
  studentName: string,
  sectionName: string,
  confidence: number
) {
  // 1) Get student by name & section
  const [student] = await db
    .select()
    .from(students)
    .where(
      and(eq(students.name, studentName), eq(students.section, sectionName))
    );

  if (!student) {
    console.log(student);
    return { success: false, message: "Student not found" };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // start of today

  // 2) Check if attendance already exists for today
  const existing = await db
    .select()
    .from(attendanceRecords)
    .where(
      and(
        eq(attendanceRecords.studentId, student.id),
        gte(attendanceRecords.date, today)
      )
    );

  if (existing.length > 0) {
    return { success: true, alreadyTaken: true };
  }

  // 3) Insert attendance
  await db.insert(attendanceRecords).values({
    studentId: student.id,
    section: sectionName,
    status: "Present",
    confidence: confidence.toFixed(2),
    date: new Date(),
  });

  return { success: true, alreadyTaken: false };
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
