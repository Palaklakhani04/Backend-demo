"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LeaveBalanceType } from "@/lib/Types";

type LeaveBalanceProps = {
  leaveBalanceData: LeaveBalanceType[];
};

export default function LeaveBalance({ leaveBalanceData }: LeaveBalanceProps) {
  return (
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
          {Array.isArray(leaveBalanceData) && leaveBalanceData.length > 0 ? (
            leaveBalanceData.map((r, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{r.availableLeave}</TableCell>
                <TableCell align="center">{r.attendeancePercentage}</TableCell>
                <TableCell align="center">{r.approvedLeave}</TableCell>
                <TableCell align="center">{r.rejectedLeave}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
