import StudentsTable from "@/components/StudentsTable";
import { getStudents } from "@/lib/actions/server.action";
import React from "react";

const ManageStudents = async () => {
  return (
    <div>
      {/* <pre>{JSON.stringify(students)}</pre> */}
      <StudentsTable />
    </div>
  );
};

export default ManageStudents;
