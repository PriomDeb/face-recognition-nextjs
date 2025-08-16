"use client";

import FaceRecognition from "@/components/FaceRecognition";
import React from "react";

const Task1 = () => {
  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">Cam</h1>
        <FaceRecognition />
      </section>
    </div>
  );
};

export default Task1;
