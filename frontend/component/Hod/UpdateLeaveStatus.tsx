/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { LeaveStatus, LeaveStatusData } from "@/lib/Types";
import { api } from "@/services/services";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const statusOption: Array<{ value: LeaveStatus | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];

export default function UpdateLeaveStatus() {
  const [data, setData] = useState<LeaveStatusData[]>([]);
  const [status, setStatus] = useState<LeaveStatus | "all">("all");
  const router = useRouter();

  useEffect(() => {
    async function getAllLeave() {
      const { data } = await api.get("/hodandfaculty/leavestatus");
      if (data.success === true) setData(data.data);
    }
    getAllLeave();
  }, []);

  const filterData = data.filter((s) =>
    status === "all" ? data : s.status === status
  );

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await api.put(`/hodandfaculty/updateleavestatus/${id}`, {
        status: newStatus,
      });
      if (res.data.success) {
        setData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
        toast.success(res.data.message);
      } else {
        toast.error(res.data.error);
      }
    } catch (err: any) {
      toast.error("Error updating status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* Page Title */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-center">
        <h1 className="text-2xl mt-10 sm:text-3xl font-semibold text-gray-800">
          HOD & Faculty <span className="text-blue-600">Dashboard</span>
        </h1>
        
      </div>

      {/* Table Section */}
      {/* <div className="max-w-6xl mx-auto">
        <TableContainer
          component={Paper}
          className="shadow-md rounded-xl overflow-hidden"
        >
          <Table aria-label="leave table">
            <TableHead className="bg-blue-50">
              <TableRow>
                {[
                  "Name",
                  "Start Date",
                  "End Date",
                  "Leave Type",
                  "Reason",
                  "Department",
                  "Status",
                ].map((heading) => (
                  <TableCell
                    key={heading}
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: "#1e293b",
                    }}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mb-3 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 
                          012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 
                          2z"
                        />
                      </svg>
                      <span className="text-lg font-medium">
                        No Leave Records Found
                      </span>
                      <span className="text-sm text-gray-400">
                        Try changing the filter above
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filterData.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell align="center">{row.user?.name}</TableCell>
                    <TableCell align="center">{row.startDate}</TableCell>
                    <TableCell align="center">{row.endDate}</TableCell>
                    <TableCell align="center">{row.leaveType}</TableCell>
                    <TableCell align="center">{row.reason}</TableCell>
                    <TableCell align="center">{row.user.department}</TableCell>
                    <TableCell align="center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleStatusChange(row.id, "Approved")}
                          className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                            row.status === "Approved"
                              ? "bg-green-100 text-green-700 border border-green-300"
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(row.id, "Rejected")}
                          className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                            row.status === "Rejected"
                              ? "bg-red-100 text-red-700 border border-red-300"
                              : "bg-red-500 text-white hover:bg-red-600"
                          }`}
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleStatusChange(row.id, "Pending")}
                          className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                            row.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                              : "bg-gray-500 text-white hover:bg-gray-600"
                          }`}
                        >
                          Pending
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div> */}

      <div className="bg-white text-left rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Leave Status</h3>
            <p className="text-sm text-slate-500 mt-1">
              {filterData.length} {filterData.length === 1 ? "request" : "requests"}
              {status !== "all" && ` with ${status.toLowerCase()} status`}
            </p>
          </div>
          <div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as LeaveStatus | "all")}
          className="rounded-lg border  border-gray-300 bg-white px-4 py-2 mx-12 text-sm font-medium shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          {statusOption.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        </div>
        </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Leave Type
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status & Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filterData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">No Data Available</h3>
                        <p className="text-sm text-slate-500">
                          {status === "all" ? "No leave requests found" : `No ${status.toLowerCase()} requests found`}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filterData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 text-left py-4 text-xs text-slate-600">
                          {row.user?.name.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-slate-600">
                        {new Date(row.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-slate-600">
                        {new Date(row.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {row.leaveType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-slate-600 max-w-xs">
                        <div className="truncate" title={row.reason}>
                          {row.reason}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-slate-600">{row.user.department}</td>
                      {/* <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center space-y-3">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                              row.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : row.status === "Rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {row.status}
                          </span>
                          <div className="flex space-x-2">
                            {row.status !== "Approved" && (
                              <button
                                onClick={() => handleStatusChange(row.id, "Approved")}
                                className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                              >
                                Approve
                              </button>
                            )}
                            {row.status !== "Rejected" && (
                              <button
                                onClick={() => handleStatusChange(row.id, "Rejected")}
                                className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                              >
                                Reject
                              </button>
                            )}
                            {row.status !== "Pending" && (
                              <button
                                onClick={() => handleStatusChange(row.id, "Pending")}
                                className="px-3 py-1 text-xs font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700 transition-colors"
                              >
                                Pending
                              </button>
                            )}
                          </div>
                        </div>
                      </td> */}
                      <td className="px-6 py-4 text-center">
  <div className="flex flex-col items-center space-y-3">
    {/* Status Badge */}
    <span
      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
        row.status === "Approved"
          ? "bg-green-100 text-green-800"
          : row.status === "Rejected"
          ? "bg-red-100 text-red-800"
          : "bg-amber-100 text-amber-800"
      }`}
    >
      {row.status}
    </span>

    {/* Action Buttons */}
    <div className="flex space-x-2">
      {row.status === "Pending" && (
        <>
          <button
            onClick={() => handleStatusChange(row.id, "Approved")}
            className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 transition"
          >
            Approve
          </button>
          <button
            onClick={() => handleStatusChange(row.id, "Rejected")}
            className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 transition"
          >
            Reject
          </button>
        </>
      )}

      {row.status === "Approved" && (
        <button
          onClick={() => handleStatusChange(row.id, "Approved")}
          className="px-3 py-1 text-xs font-medium hidden text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 transition"
        >
          Approve
        </button>
      )}

      {row.status === "Rejected" && (
        <button
          onClick={() => handleStatusChange(row.id, "Rejected")}
          className="px-3 py-1 text-xs hidden font-medium text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 transition"
        >
          Reject
        </button>
      )}
    </div>
  </div>
</td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}
