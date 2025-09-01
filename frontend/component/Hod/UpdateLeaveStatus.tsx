"use client";

import { LeaveStatusData } from "@/lib/Types";
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

export default function UpdateLeaveStatus() {
  const [data, setData] = useState<LeaveStatusData[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function getAllLeave() {
      const { data } = await api.get("/hodandfaculty/leavestatus");
      console.log(data);
      if (data.success === true) setData(data.data);
    }
    getAllLeave();
  }, []);

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
      } else {
        toast.error("Failed to update status");
      }
    } catch (err: any) {
      toast.error("Error updating status", err);
    }
  };

  return (
    <div className="grid place-items-center justify-center min-h-dvh">
      <div className="text-center text-gray-600">
        <div className="flex w-full mb-10 items-center  justify-evenly ">
          <h1 className="w-sm text-3xl font-bold text-gray-800">
            Leave status
          </h1>
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
                <TableCell sx={{ fontWeight: "bold", fontSize:16 }}>Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" , fontSize:16}}>
                  Start Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" , fontSize:16 }}>
                  End Date
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" , fontSize:16}}>
                  Leave Type
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" , fontSize:16}}>
                  Reason
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" , fontSize:16}}>
                  Department
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" , fontSize:16}}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
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
                        className={`px-2 py-1 rounded text-white text-sm ${
                          row.status === "Approved"
                            ? "bg-green-800"
                            : "bg-green-400"
                        }`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(row.id, "Rejected")}
                        className={`px-2 py-1 rounded text-white text-sm ${
                          row.status === "Rejected"
                            ? "bg-red-800"
                            : "bg-red-400"
                        }`}
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleStatusChange(row.id, "Pending")}
                        className={`px-2 py-1 rounded text-white text-sm ${
                          row.status === "Pending"
                            ? "bg-gray-800"
                            : "bg-gray-400"
                        }`}
                      >
                        Pending
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
