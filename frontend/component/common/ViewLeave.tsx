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
} from "@mui/material";
import { useRouter } from "next/navigation";
import Button from "./Button";

type ViewLeaveTableProps = {
  requests: LeaveRequestType[];
  renderActions?: (req: LeaveRequestType) => React.ReactNode;
  className?: string;
};

const statusOption: Array<{ value: LeaveStatus | "all"; label: string }> = [
  { value: "all", label: "all" },
  { value: "Pending", label: "Pending" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
];
export default function ViewLeave({
  requests,
  renderActions,
}: ViewLeaveTableProps) {
  const router = useRouter();
  const [status, setStatus] = useState<LeaveStatus | "all">("all");
  const filtered =
    status === "all"
      ? requests || []
      : requests.filter((r) => r.status === status);

  return (
    <div
      className={`space-y-6 px-6 py-4 flex items-center justify-center min-h-dvh bg-gray-50`}
    >
      <div>
        {/* Filter Section */}
        <div className=" flex items-center w-full justify-around">
          <label className="text-sm font-medium  text-gray-700">
            Filter by Status
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
          <div className="w-40">
            <Button
              className="px-4"
              onClick={() => router.back()}
            >
              back
            </Button>
          </div>
        </div>

        {/* Conditional rendering */}
        {filtered.length === 0 ? (
          <TableContainer sx={{ margin: 4 }}>
            <Table sx={{ minWidth: 650, border: 2 }}>
              <TableHead sx={{ border: 2 }}>
                <TableRow>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Reason</TableCell>
                  <TableCell align="center">Status</TableCell>
                  {renderActions && <TableCell align="center"></TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-14 w-14 mb-3 text-gray-400"
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
                      <span className="text-lg font-semibold">
                        No Data Available
                      </span>
                      <span className="text-sm text-gray-400">
                        Please check back later
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer sx={{ margin: 4 }}>
            <Table sx={{ minWidth: 650, border: 2 }} aria-label="simple table">
              <TableHead sx={{ border: 2 }}>
                <TableRow>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Reason</TableCell>
                  <TableCell align="center">Status</TableCell>
                  {renderActions && <TableCell align="center"></TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow
                    key={r.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{r.leaveType}</TableCell>
                    <TableCell align="center">
                      {r.startDate} - {r.endDate}
                    </TableCell>
                    <TableCell align="center">{r.reason}</TableCell>
                    <TableCell align="center">{r.status}</TableCell>
                    {renderActions && (
                      <TableCell align="center">{renderActions(r)}</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}
