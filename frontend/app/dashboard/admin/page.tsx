import LeaveReport from "@/component/Admin/LeaveReport";
import Sidebar from "@/component/Admin/Sidebar";
import React from "react";

export default function Page() {
  return (
    <div className="max-h-dvh grid justify-start">
      <div className=" mt-14">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className="text-gray-800 grid place-items-center w-dvw">
          <div className="m-4">
            <h1 className="text-2xl min-w-full">Admin Dashboard</h1>
            <LeaveReport />
          </div>
        </div>
      </div>
    </div>
  );
}
