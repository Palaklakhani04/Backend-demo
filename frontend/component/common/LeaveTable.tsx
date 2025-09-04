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
import { LeaveReport } from "@/lib/Types";


type Props = {
  data: LeaveReport[];
};

export default function LeaveTable({ data }: Props) {
  console.log(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const paginatedData = data.slice(
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

  return (
    <div className=" p-4 bg-gray-50">
      <div className="w-full ">
        <h1 className="text-xl font-bold text-center mb-4">Student Leave Report</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{fontWeight: "bold"}}>Name</TableCell>
                <TableCell align="center" sx={{fontWeight: "bold"}}>Department</TableCell>
                <TableCell align="center" sx={{fontWeight: "bold"}}>Leave Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.deparment}</TableCell>
                    <TableCell align="center">{row.leaveCount.id}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      </div>
    </div>
  );
}

