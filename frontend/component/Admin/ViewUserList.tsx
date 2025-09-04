
"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { UserTypeData } from "@/lib/Types";
import Button from "../common/Button";
import { useRouter } from "next/navigation";

type Props = {
  userData: UserTypeData[];
};

export default function ViewUserList({ userData }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/dashboard/editprofile/${id}`);
  };

  const paginatedData = userData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTitle = () => {
    if (userData.length === 0) return "User List";
    const role = userData[0].roleId;
    if (role === 2) return "View HOD Data";
    if (role === 3) return "View Faculty Data";
    return "View Student Data";
  };

  return (
    <div className="flex place-items-center justify-center min-h-dvh">
      <div className="w-full px-8 ">
        <h1 className="text-2xl px-4 font-semibold  text-slate-700 mb-8">
          {getTitle()}
        </h1>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <Table aria-label="user table">
            {/* Table Head */}
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(90deg, #f8fafc, #f1f5f9)",
                }}
              >
                <TableCell align="left" sx={{ fontWeight: "600" }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Email
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Gender
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  GR Number
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Department
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Class
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Role ID
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((user, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9fafb" },
                      "&:hover": { backgroundColor: "#f1f5f9" },
                      transition: "background 0.3s",
                    }}
                  >
                    <TableCell align="left">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.gender}</TableCell>
                    <TableCell align="center">{user.grNumber}</TableCell>
                    <TableCell align="center">{user.department}</TableCell>
                    <TableCell align="center">{user.class}</TableCell>
                    <TableCell align="center">{user.roleId}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleEdit(user.id!)}
                        className="px-4 py-1 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                        <svg
                          className="w-6 h-6 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-slate-600 font-medium">
                        No data available
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={userData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </TableContainer>
      </div>
    </div>
  );
}
