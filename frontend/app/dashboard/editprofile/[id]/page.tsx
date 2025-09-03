"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserType } from "@/lib/Types";
import { RegisterSchema } from "@/lib/Validation";
import toast from "react-hot-toast";
import GenericForm from "@/component/common/GenericForm";
import TextInput from "@/component/common/TextInput";
import RadioGroup from "@/component/common/Radio";
import Select from "@/component/common/Select";
import Button from "@/component/common/Button";
import { getUserById, updateUser } from "@/services/services";

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Others", label: "Others" },
];

const departmentOptions = [
  { value: "computer", label: "Computer" },
  { value: "BCA", label: "BCA" },
];

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id as string);
        if (res?.success) {
          setUserData(res.data);
        } else {
          toast.error("Failed to load user data.");
        }
      } catch (error) {
        toast.error("Error fetching user.");
      }
    };
    if (id) fetchUser();
  }, [id]);

  const handleSubmit = async (values: UserType) => {
    try {
      setLoading(true);
      const res = await updateUser(id as string, values);
      if (res?.data.success) {
        toast.success("User updated successfully!");
        router.back();
      } else {
        toast.error(res?.data.message || "Update failed.");
      }
    } catch (error) {
      toast.error("Error updating user.");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-dvh grid place-items-center p-6 bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <div className="w-full max-w-sm rounded-2xl border shadow-xl text-gray-700 border-gray-200 bg-white p-4">
        <h1 className="mb-4 text-2xl font-semibold text-center">Edit User</h1>

        <GenericForm<UserType>
          initialValues={{
            name: userData.name || "",
            email: userData.email || "",
            gender: userData.gender || "",
            department: userData.department || "",
            grNumber: userData.grNumber || "",
            phone: userData.phone || "",
            address: userData.address || "",
            class: userData.class || "",
            roleId: userData.roleId || 4,
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          <TextInput name="name" label="Name" placeholder="Name" type="text" />
          <TextInput name="email" label="Email" placeholder="Email" type="email" />
          <RadioGroup name="gender" label="Gender" options={genderOptions} />
          <Select name="department" label="Department" options={departmentOptions} />
          <TextInput name="grNumber" label="GR Number" placeholder="GR Number" type="text" />
          <TextInput name="phone" label="Phone" placeholder="Phone" type="text" />
          <TextInput name="address" label="Address" placeholder="Address" type="text" />
          <TextInput name="class" label="Class" placeholder="Class (e.g. A)" type="text" />

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update User"}
          </Button>
        </GenericForm>
      </div>
    </div>
  );
}
