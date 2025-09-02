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
import Button from "../common/Button";

const statusOption: Array<{ value: LeaveStatus | "all"; label: string }> = [
  { value: "all", label: "all" },
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];

export default function UpdateLeaveStatus() {
  const [data, setData] = useState<LeaveStatusData[]>([]);
  const [status, setStatus] = useState<LeaveStatus | "all">("all")
  const router = useRouter();
  useEffect(() => {
    async function getAllLeave() {
      const { data } = await api.get("/hodandfaculty/leavestatus");
      console.log(data);
      if (data.success === true) setData(data.data);
    }
    getAllLeave();
  }, []);


  const filterData = data.filter((s) => {
    return status === "all" ? data || [] : s.status === status
  })

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await api.put(`/hodandfaculty/updateleavestatus/${id}`, {
        status: newStatus,
      });
      console.log(res);
      if (res.data.success) {
        setData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        );
        toast.success(res.data.message)
      } else {
        toast.error(res.data.error);
      }
    } catch (err: any) {
      toast.error("Error updating status", err);
    }
  };

  return (
    <div className="grid place-items-center justify-center min-h-dvh">
      <div className="text-center mt-22 text-gray-600">
        <div className="flex w-full mb-10 items-center  justify-evenly ">
          <h1 className="text-3xl font-bold text-gray-800">
            Leave status
          </h1>
          <div>
          <label className="p-1">
            Leave status :
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as LeaveStatus | "all")}
            className="rounded-md border border-gray-400 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
          >
            {statusOption.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          </div>
          <div className="w-40">
            <Button className="" onClick={() => router.back()}>
              back
            </Button>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: 16 }}>Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 16 }}>
                  Start Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 16 }}>
                  End Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 16 }}>
                  Leave Type
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 16 }}>
                  Reason
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 16 }}>
                  Department
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", fontSize: 16 }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
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
                      <span className="text-lg font-medium">No Data Available</span>
                      <span className="text-sm text-gray-400">Please check back later</span>
                    </div>
                  </TableCell>
                </TableRow>

              ) : (
                filterData.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.user?.name}
                    </TableCell>
                    <TableCell align="center">{row.startDate}</TableCell>
                    <TableCell align="center">{row.endDate}</TableCell>
                    <TableCell align="center">{row.leaveType}</TableCell>
                    <TableCell align="center">{row.reason}</TableCell>
                    <TableCell align="center">{row.user.department}</TableCell>
                    <TableCell align="center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleStatusChange(row.id, "Approved")}
                          className={`px-2 py-1 rounded text-white text-sm ${row.status === "Approved" ? "bg-green-800" : "bg-green-300"
                            }`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(row.id, "Rejected")}
                          className={`px-2 py-1 rounded text-white text-sm ${row.status === "Rejected" ? "bg-red-800" : "bg-red-300"
                            }`}
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleStatusChange(row.id, "Pending")}
                          className={`px-2 py-1 rounded text-white text-sm ${row.status === "Pending" ? "bg-gray-800" : "bg-gray-400"
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
      </div>
    </div>
  );
}
