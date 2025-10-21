"use client";
import React from "react";
import Blood from "@/app/Component/donation/Blood";
import Organ from "@/app/Component/donation/Organ";

const page = () => {
  return (
    <div className="mt-24">
      <Blood></Blood>
      <Organ></Organ>
    </div>
  );
};
export default page;
