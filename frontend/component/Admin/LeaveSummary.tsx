/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import { api } from "@/services/services";
import toast from "react-hot-toast";

type SummaryData = {
  AllUser: number;
  PendingLeave: number;
  ApprovedLeave: number;
  TotalLeaveCount: number;
};

export default function LeaveSummaryPage() {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        const res = await api.get("/admin/leavereport"); 

        console.log(res.data);
        if (res.data.success) {
          setData(res.data.data);
        } else {
          toast.error(res.data.message || "Failed to fetch data");
        }
      } catch (error:any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = data
    ? [
        { label: "All Users", value: data.AllUser, color: "bg-blue-100 text-blue-700" },
        { label: "Pending Leave", value: data.PendingLeave, color: "bg-yellow-100 text-yellow-700" },
        { label: "Approved Leave", value: data.ApprovedLeave, color: "bg-green-100 text-green-700" },
        { label: "Total Leave Count", value: data.TotalLeaveCount, color: "bg-indigo-100 text-indigo-700" },
      ]
    : [];

  return (
    <div className=" bg-gray-50 p-8">
      {/* Header */}
      <div className="flex mt-16 flex-col items-center mb-10">
        <h1 className="text-2xl font-extrabold text-gray-900">Leave Summary</h1>
      </div>

      {/* Loading / Error / Data */}
      {loading && (
        <p className="text-center text-gray-500">Loading...</p>
      )}
     

      {!loading && data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="shadow-md rounded-2xl border border-gray-100 hover:shadow-lg transition"
            >
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div
                  className={`w-20 h-20 flex items-center justify-center rounded-full text-black font-bold text-2xl ${stat.color}`}
                >
                  {stat.value}
                </div>
                <p className="mt-4 text-gray-700 font-semibold text-lg">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
