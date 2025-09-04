"use client";

import React, { useEffect, useState } from "react";
import { getLeaveBalance } from "@/services/services";
import { LeaveBalanceType } from "@/lib/Types";
import LeaveBalance from "@/component/common/LeaveBalance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentDashboard() {
  const [data, setData] = useState<LeaveBalanceType[]>([]);
  const router = useRouter()

  useEffect(() => {
    async function getLeaveBalanceData() {
      try {
        const leaveBalanceData = await getLeaveBalance();
        if (!leaveBalanceData.success) {
          toast.error(leaveBalanceData.message);
          return;
        }
        setData(leaveBalanceData.data as LeaveBalanceType[]);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    getLeaveBalanceData();
  }, []);

  const handleClick = () => {
    console.log("Clicked")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50 p-10">
      {/* Header */}
      <div className="max-w-7xl mt-8 mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow-sm">
          Student Dashboard
        </h1>
        <p className="text-gray-600 mt-3 text-lg font-medium">
          Manage your leaves and track attendance with ease
        </p>
      </div>

      {/* Top Action Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Apply Leave */}
        <div className="group relative rounded-3xl bg-white/80 backdrop-blur-lg border border-indigo-100 shadow-md hover:shadow-2xl transition-all p-8 overflow-hidden">
          {/* Accent Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
          <div className="relative flex items-center space-x-5 mb-6">
            <div className="p-4 rounded-2xl bg-indigo-500/20 text-indigo-600 text-3xl">
              📅
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Apply Leave</h2>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Submit your leave request quickly and easily.
          </p>
          <Link href={'/dashboard/student/applyLeave'} className="px-6 py-3 cursor-pointer absolute z-10 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow hover:opacity-90 transition-all">
            Apply Now
          </Link>
        </div>

        {/* Leave Status */}
        <div className="group relative rounded-3xl bg-white/80 backdrop-blur-lg border border-green-100 shadow-md hover:shadow-2xl transition-all p-8 overflow-hidden">
          {/* Accent Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-green-100/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
          <div className="relative flex items-center space-x-5 mb-6">
            <div className="p-4 rounded-2xl bg-green-500/20 text-green-600 text-3xl">
              📋
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Leave Status</h2>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Track the approval progress of your leave requests.
          </p>
          <Link href={'/dashboard/student/viewLeaveStatus'} className="px-6 py-3 relative z-11 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow hover:opacity-90 transition-all">
            View Status
          </Link>
          
        </div>
      </div>

      {/* Leave Balance Section */}
      <div className="max-w-6xl mx-auto">
        <LeaveBalance leaveBalanceData={data ?? []} />
      </div>
    </div>
  );
}
