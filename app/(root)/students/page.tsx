import AddStudent from "@/components/AddStudent";
import StudentsTable from "@/components/StudentsTable";
import { Button } from "@/components/ui/button";
import React from "react";

const ManageStudents = () => {
  return (
    <div>
      <AddStudent />
      <StudentsTable />
    </div>
  );
};

export default ManageStudents;
