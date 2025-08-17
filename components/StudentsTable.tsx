import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStudents } from "@/lib/actions/server.action";

import React from "react";

const StudentsTable = async () => {
  const students = await getStudents();

  return (
    <Table>
      <TableCaption className="pt-8">
        All students currently registered in this class.
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Student Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Face Registered</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {students.map((student) => (
          <TableRow key={student.email}>
            <TableCell className="font-medium">{student.name}</TableCell>
            <TableCell>{student.email}</TableCell>
            <TableCell>{student.phone}</TableCell>
            <TableCell className="">
              {student.faceRegistered ? "Yes" : "No"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentsTable;
