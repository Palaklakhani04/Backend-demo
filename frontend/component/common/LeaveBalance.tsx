"use client";
import React, { ReactNode, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LeaveBalanceType } from "@/lib/Types";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function LeaveBalance({
  leaveBalanceData,
}: {
  leaveBalanceData: LeaveBalanceType[];
}) {
  const router = useRouter();
  return (
    <>
      <div className="grid place-items-center justify-center min-h-dvh">
        <div>
          <div className="flex items-center p-4 justify-evenly ">
            <h1 className="mb-2 text-center w-sm text-3xl font-bold text-gray-800">
              Leave Balance
            </h1>
            <div className="w-40">
            <Button className="" onClick={() => router.back()}>
              back
            </Button>
            </div>
          </div>

          <TableContainer sx={{ margin: 4 }}>
            <Table sx={{ minWidth: 650, border: 2 }} aria-label="simple table">
              <TableHead sx={{ border: 2 }}>
                <TableRow>
                  <TableCell align="center">AvailableLeave</TableCell>
                  <TableCell align="center">AttendeancePercentage</TableCell>
                  <TableCell align="center">Approved Leave</TableCell>
                  <TableCell align="center">Rejected Leave</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {leaveBalanceData?.length > 0 ? (
                    leaveBalanceData?.map((r, index) => (
                      <TableCell key={index} align="center">
                        {r?.AvailableLeave}
                        {r?.AttendeancePercentage}
                        {r?.ApprovedLeave}
                        {r?.RejectedLeave}
                      </TableCell>
                    ))
                  ) : (
                    <TableCell colSpan={4} align="center">
                      No data available
                    </TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
