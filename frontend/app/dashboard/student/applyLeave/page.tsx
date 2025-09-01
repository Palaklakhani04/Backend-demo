/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import ApplyLeaveForm from "@/component/common/ApplyLeaveForm";
import { options } from "@/lib/Types";
import { api } from "@/services/services";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [faculty, setFaculty] = useState<options[]>([]);

  useEffect(() => {
    async function getFaculty() {
      try {
        const { data } = await api.get("/student/getfaculty", {
          withCredentials: true,
        });

        if (data.success) {
          const facultyOp: options[] = data.faculty.map((faculty: any) => ({
            value: faculty.id,
            label: faculty.name,
          }));
          setFaculty(facultyOp);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getFaculty();
  }, []);

  return (
    <>
      <div className="min-h-dvh grid place-items-center p-6 bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
        <div className="w-full max-w-md rounded-2xl border shadow-xl border-gray-200 bg-white p-6 ">
          <h1 className="mb-4 text-2xl font-semibold">Student Apply Leave</h1>
          <ApplyLeaveForm approverOption={faculty} />
        </div>
      </div>
    </>
  );
}
