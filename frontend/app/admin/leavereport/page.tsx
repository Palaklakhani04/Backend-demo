"use client"
import LeaveReportData from "@/component/Admin/LeaveReport";
import React from "react";

export default function Page() {
  return (
    <div className="max-h-dvh grid justify-start">
      <div className=" mt-14">
        <div className="text-gray-800 grid place-items-center w-dvw">
          <div className="m-4">
            <LeaveReportData />
          </div>
        </div>
      </div>
    </div>
  );
}
