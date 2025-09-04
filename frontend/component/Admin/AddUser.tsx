"use client";

import React, { useEffect, useState } from "react";
import GenericForm from "../common/GenericForm";
import TextInput from "../common/TextInput";
import RadioGroup from "../common/Radio";
import FileInput from "../common/FileInput";
import Select from "../common/Select";
import Button from "../common/Button";
import { RadioOptions, register, RegisterInitalValue, SelectOptions } from "@/lib/Types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FormikHelpers } from "formik";
import { RegisterSchema } from "@/lib/Validation";
import { addUsers, getDepartment } from "@/services/services";

type AddUserProps = {
  roleId: string;
};

export default function AddUser({ roleId }: AddUserProps) {
  const [loading, setLoading] = useState(false);
  const [deptOption , setDeptOption] = useState<SelectOptions>([])
  
  const router = useRouter();

   useEffect(() => {
    async function getAlldepartment() {
      try {
        const data = await getDepartment();
        const options = data.department.map((dep: any) => ({
          value: dep.department,
          label: dep.department,
        }));
        setDeptOption(options);
      } catch (err) {
        toast.error("Failed to fetch departments");
      }
    }
    getAlldepartment();
  }, []);

  const genderOptions: RadioOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
  ];

  const handleSubmit = async (
    values: register,
    formikHelpers?: FormikHelpers<register>
  ) => {
    try {
      setLoading(true);
      const submissionData = {
        ...values,
      };
      const data = await addUsers(submissionData, roleId);
      if (data.success) {
        toast.success(data.message || "User created successfully");
        router.back();
      } else {
        toast.error(data.message || "Failed to create user");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh grid place-items-center p-6 bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <div className="w-full mt-8 max-w-sm rounded-2xl border shadow-xl text-gray-700 border-gray-200 bg-white p-4">
        <h1 className="mb-4 text-2xl font-semibold">
          {roleId === "4"
            ? "Add Student"
            : roleId === "3"
            ? "Add Faculty"
            : roleId === "2"
            ? "Add HOD"
            : "Add User"}
        </h1>
        

        <GenericForm<register>
          initialValues={RegisterInitalValue}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          <TextInput
            name="name"
            label="Name"
            placeholder="Full Name"
            type="text"
          />
          <TextInput
            name="email"
            label="Email"
            placeholder="Email"
            type="email"
          />
          <TextInput
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <RadioGroup name="gender" label="Gender" options={genderOptions} />
          <FileInput name="image" label="Upload Profile Image" />
          {roleId === "2" ? 
            (<TextInput
                name="department"
                label="department"
                placeholder="department"
                type="text"
            />)
          :
          (<Select
            name="department"
            label="Department"
            options={deptOption}
          />)
        }
          <TextInput
            name="grNumber"
            label="GR Number"
            placeholder="Student GR Number"
            type="text"
          />
          <TextInput
            name="phone"
            label="Phone"
            placeholder="Phone Number"
            type="text"
          />
          <TextInput
            name="address"
            label="Address"
            placeholder="Address"
            type="text"
          />
          <TextInput
            name="class"
            label="Class"
            placeholder="Class Name (e.g. A, B)"
            type="text"
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Create User"}
          </Button>
        </GenericForm>

      </div>
    </div>
  );
}
