/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";

import { ProfileType } from "@/lib/Types";
import { api, changeProfileImage } from "@/services/services";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function Profile({
  profileDetail,
}: {
  profileDetail: ProfileType;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [btnDis, setBtnDis] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const avatarSrc = useMemo(() => {
    console.log(profileDetail.image);
    if (!profileDetail?.image) return "";
    return `${profileDetail.image}`;
  }, [profileDetail?.image]);

  const handleEditImageClick = () => {
    setIsModalOpen(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] || null;
    setSelectedFile(file);
    setBtnDis(!file);
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setBtnDis(true);
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    try {
      setBtnDis(true);
      setLoading(true);

      const response = await changeProfileImage(selectedFile);
      toast.success(response?.data?.message || "Profile image updated");
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Image update error:", error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update profile image";
      toast.error(msg);
    } finally {
      setLoading(false);
      setBtnDis(true);
    }
  };

  if (!profileDetail) {
    return (
      <div className="grid min-h-dvh place-items-center text-gray-600">
        No profile data found.
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col place-items-center p-6">
      <div className="min-h-full mt-14">
      <div className="flex w-md items-center px-6 justify-evenly ">
        <h1 className=" w-xs text-2xl font-bold text-gray-800">Your Profile</h1>
        <div className="w-34 ">
          <Button className="" onClick={() => router.back()}>
            back
          </Button>
        </div>
      </div>
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Avatar */}
        <div className="relative mx-auto mb-4 h-48 w-48">
          <img
            src={previewUrl ?? avatarSrc}
            alt={`${profileDetail.name}'s profile`}
            className="h-48 w-48 rounded-full object-cover"
          />
          <button
            type="button"
            aria-label="Edit profile image"
            className="absolute bottom-2 right-[-4px] rounded-full bg-gray-800 p-2 text-white transition hover:bg-gray-700"
            onClick={handleEditImageClick}
          >
            <FaCamera />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm text-gray-700">
          <DetailRow label="Name" value={profileDetail.name} />
          <DetailRow label="Email" value={profileDetail.email} />
          <DetailRow label="Gender" value={profileDetail.gender} />
          <DetailRow label="Phone" value={profileDetail.phone} />
          <DetailRow label="Address" value={profileDetail.address} />
          <DetailRow label="Gr Number" value={profileDetail.grNumber} />
          <DetailRow label="Department" value={profileDetail.department} />
          <DetailRow label="Class" value={profileDetail.class} />
          <DetailRow label="Role" value={roleLabel(profileDetail.roleId)} />
        </div>

        {/* Edit Profile Route */}
        <Link
          href={"/dashboard/editprofile"}
          className="mt-6 block transform rounded bg-indigo-600 px-4 py-2 text-center text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-indigo-500"
        >
          Edit Profile
        </Link>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Edit Profile Image</h2>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4 block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-gray-900 file:px-3 file:py-2 file:text-white hover:file:opacity-90"
            />

            {previewUrl && (
              <div className="mb-4">
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  className="h-24 w-24 rounded-full object-cover"
                />
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-900 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={btnDis || loading}
                onClick={handleSave}
                className={`flex items-center justify-center rounded px-4 py-2 text-sm text-white ${
                  btnDis || loading
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                {loading ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div className="flex items-start border-b py-1">
      <span className="mr-3 font-medium">{label}:</span>
      <span className="text-left">{value ?? "-"}</span>
    </div>
  );
}

function roleLabel(roleId?: number) {
  switch (roleId) {
    case 4:
      return "STUDENT";
    case 2:
      return "HOD";
    case 3:
      return "STAFF";
    case 1:
      return "ADMIN";
    default:
      return "-";
  }
}
