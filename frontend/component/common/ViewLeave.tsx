"use client";
import { LeaveRequestType, LeaveStatus } from "@/lib/Types";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Button from "./Button";

type ViewLeaveTableProps = {
  requests: LeaveRequestType[];
  className?: string;
};

const statusOption: Array<{ value: LeaveStatus | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];

export default function ViewLeave({ requests }: ViewLeaveTableProps) {
  const router = useRouter();
  const [status, setStatus] = useState<LeaveStatus | "all">("all");

  const filtered =
    status === "all"
      ? requests || []
      : requests.filter((r) => r.status === status);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-6 py-12">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            📋 Leave Requests
          </h1>

          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as LeaveStatus | "all")
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-md hover:border-indigo-400 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none transition"
            >
              {statusOption.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <Button
              onClick={() => router.back()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              ← Back
            </Button>
          </div>
        </div>

        {/* Table */}
        <TableContainer
          component={Paper}
          className="rounded-xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <Table>
            <TableHead>
              <TableRow className="bg-gradient-to-r from-indigo-100 to-emerald-100">
                <TableCell
                  align="center"
                  className="font-semibold text-gray-700 uppercase tracking-wide py-3"
                >
                  Type
                </TableCell>
                <TableCell
                  align="center"
                  className="font-semibold text-gray-700 uppercase tracking-wide py-3"
                >
                  Date
                </TableCell>
                <TableCell
                  align="center"
                  className="font-semibold text-gray-700 uppercase tracking-wide py-3"
                >
                  Reason
                </TableCell>
                <TableCell
                  align="center"
                  className="font-semibold text-gray-700 uppercase tracking-wide py-3"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" className="py-12">
                    <div className="flex flex-col items-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 mb-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 13h6m2 8H7a2 2 0 
                          01-2-2V5a2 2 0 012-2h5l2 
                          2h5a2 2 0 012 2v12a2 2 
                          0 01-2 2z"
                        />
                      </svg>
                      <span className="text-lg font-semibold">
                        No Leave Records Found
                      </span>
                      <span className="text-sm text-gray-400">
                        Try changing the filter above
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((r) => (
                  <TableRow
                    key={r.id}
                    className="hover:bg-indigo-50 transition"
                  >
                    <TableCell align="center" className="py-4">
                      {r.leaveType}
                    </TableCell>
                    <TableCell align="center" className="py-4">
                      <span className="font-medium text-gray-700">
                        {r.startDate}
                      </span>{" "}
                      →{" "}
                      <span className="font-medium text-gray-700">
                        {r.endDate}
                      </span>
                    </TableCell>
                    <TableCell align="center" className="py-4 text-gray-600">
                      {r.reason}
                    </TableCell>
                    <TableCell align="center" className="py-4">
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                          r.status === "Approved"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : r.status === "Rejected"
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {r.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
