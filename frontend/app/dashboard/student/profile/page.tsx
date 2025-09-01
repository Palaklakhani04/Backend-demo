/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Profile from "@/component/common/Profile";
import type { ProfileType } from "@/lib/Types";
import { api } from "@/services/services";
import toast from "react-hot-toast";

export default function Page() {
  const [data, setData] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
       
        const res = await api.get("/student");
        console.log(res)
       
        if (!res?.data.student) {
          toast.error("Failed to load profile");
          return;
        }
        setData(res.data.student);
      } catch (err: any) {
        console.error(err);
        const msg = err?.response?.data?.message || err?.message || "Failed to load profile";
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <main className="grid min-h-dvh place-items-center p-6">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="grid min-h-dvh place-items-center p-6 text-gray-600">
        No profile data found.
      </main>
    );
  }

  return <Profile profileDetail={data} />;
}
