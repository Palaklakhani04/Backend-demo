"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiLogOut, FiUser } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { FaTachometerAlt } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const isLoggedIn = status === "authenticated";
  const user = session?.user;

  return (
    <nav className="fixed w-full bg-white border-b shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
          LMS
        </Link>
        {(isLoggedIn && session.user.roleId === 1) &&
          <div className="grid place-items-center justify-end w-1/3 text-gray-700 font-bold text-xl">
            <h1>Admin Dashboard</h1>
          </div>
        }

        <div className="flex ">
          {isLoggedIn && session.user.roleId === 1 && (
              <button
                onClick={() => router.back()}
                className="flex ml-4 items-center  hover:text-blue-600 transition-colors"
              >
                <FaTachometerAlt className="text-lg " />
                <span className="hidden sm:inline px-2 "> dashboard</span>
              </button>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600"
              >
                <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  {user?.name ? getInitials(user.name) : <FiUser />}
                </div>

                <span className="hidden sm:inline">{user?.name ?? "User"}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
              >
                <FiLogOut className="text-lg" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
