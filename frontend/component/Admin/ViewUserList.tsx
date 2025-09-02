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
import { UserType, UserTypeData } from "@/lib/Types";
import Button from "../common/Button";
import { useRouter } from "next/navigation";

type Props = {
  userData: UserTypeData[];
};

export default function ViewUserList({ userData}: Props) {
  const [page, setPage] = useState(0); // current page index
  const [rowsPerPage, setRowsPerPage] = useState(5); // default rows per page

  const getTitle = () => {
    if (userData.length === 0) return "User List";
    const role = userData[0].roleId;
    if (role === 2) return "View HOD Data";
    if (role === 3) return "View Faculty Data";
    return "View Student Data";
  };

  const router = useRouter()
  const handleEdit = (id: string) => {
    router.push(`/dashboard/editprofile/${id}`)
  }
  // Slice data for current page
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
    setPage(0); // Reset to first page
  };

  return (
    <div className="grid place-items-center justify-center min-h-dvh">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 my-4">
          {getTitle()}
        </h1>

        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">GR Number</TableCell>
                <TableCell align="center">Department</TableCell>
                <TableCell align="center">Class</TableCell>
                <TableCell align="center">Role ID</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.gender}</TableCell>
                    <TableCell align="center">{user.grNumber}</TableCell>
                    <TableCell align="center">{user.department}</TableCell>
                    <TableCell align="center">{user.class}</TableCell>
                    <TableCell align="center">{user.roleId}</TableCell>
                    <TableCell><Button onClick={()=> handleEdit(user.id!)}>Edit</Button></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data available
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
