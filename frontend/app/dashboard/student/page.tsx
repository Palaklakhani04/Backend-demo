"use client";

import Button from "@/component/common/Button";
import Card from "@/component/common/Card";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();
  return (
    <>
    <div className="grid items-center min-h-dvh justify-center">
      <div className="">
      <h1 className="text-3xl text-gray-700 font-bold text-center m-8">Student Dashboard</h1>
        <div className="flex">
          <Card
            title="Apply Leave Request"
            subtitle="Leave Request"
            className="m-2 text-gray-700"
          >
            <div className="w-40">
              <Button
                type="submit"
                onClick={() => router.push("/dashboard/student/applyLeave")}
              >
                Apply
              </Button>
            </div>
          </Card>

          <Card
            title="View Leave Request Status"
            subtitle="View Leave Request Status"
            className="m-2 text-gray-700"
          >
            <div className="w-40">
              <Button
                type="submit"
                onClick={() =>
                  router.push("/dashboard/student/viewLeaveStatus")
                }
              >
                View
              </Button>
            </div>
          </Card>
        </div>
        <div className="flex">
          <Card
            title="View Leave Balance"
            subtitle="View Leave Balance"
            className="m-2 text-gray-700"
          >
            <div className="w-40">
              <Button
                type="submit"
                onClick={() => router.push("/dashboard/student/leavebalance")}
              >
                View
              </Button>
            </div>
          </Card>

          <Card
            title="Profile"
            subtitle="Profile"
            className="m-2 text-gray-700"
          >
            <div className="w-40">
              <Button
                type="submit"
                onClick={() => router.push("/dashboard/profile")}
              >
                View
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
     </>
  );
}
