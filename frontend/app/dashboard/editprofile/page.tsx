
"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "@/component/common/Button";
import GenericForm from "@/component/common/GenericForm";
import RadioGroup from "@/component/common/Radio";
import Select from "@/component/common/Select";
import TextInput from "@/component/common/TextInput";
import {
  ProfileDetailsType,
  ProfileInitalValue,
  RadioOptions,
} from "@/lib/Types";
import { RegisterSchema } from "@/lib/Validation";
import { api } from "@/services/services";
import { FormikHelpers } from "formik";
import { useRouter } from "next/navigation";

const genderOptions: RadioOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Others", label: "Others" },
];

const departmentOptions: RadioOptions = [
  { value: "computer", label: "Computer" },
  { value: "BCA", label: "BCA" },
];

export default function EditProfileDetail() {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<ProfileDetailsType | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/student");

        console.log("Raw profile response:", data);

        const profile = data?.student;

        if (!profile) {
          toast.error("User data not found.");
          return;
        }

        setInitialValues({
          name: profile.name || "",
          email: profile.email || "",
          gender: profile.gender || "",
          grNumber: profile.grNumber || "",
          department: profile.department || "",
          class: profile.class || "",
          address: profile.address || "",
          phone: profile.phone || "",
        });
      } catch (error) {
        console.error("Failed to load profile", error);
        toast.error("Failed to load profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading || !initialValues) {
    return (
      <div className="text-center mt-10 text-gray-500">Loading profile...</div>
    );
  }

  return (
    <div className="grid place-items-center p-4 bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <div className="w-full mt-8 max-w-md rounded-2xl border shadow-xl border-gray-200 bg-white p-6 ">
        <div className="flex items-center mb-4 justify-evenly ">
          <h1 className=" w-md text-2xl font-bold text-gray-800">
            Edit Profile
          </h1>
          <div className="w-40">
            <Button className="" onClick={() => router.back()}>
              back
            </Button>
          </div>
        </div>

        <GenericForm<ProfileDetailsType>
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={async (
            values,
            formikHelpers?: FormikHelpers<ProfileDetailsType>
          ) => {
            try {
              const payload = {
                name: values.name,
                email: values.email,
                gender: values.gender,
                grNumber: values.grNumber,
                department: values.department,
                className: values.class,
                address: values.address,
                phone: values.phone,
                roleId: "4",
              };

              const { data } = await api.put(
                "/student/update/profiledetail",
                payload
              );
              console.log(data);
              if (data.success) {
                toast.success(data.message);
                formikHelpers?.resetForm({ values: data.user });
              }
            } catch (error: any) {
              console.error("Error updating profile:", error);
              toast.error("Update failed. Try again.");
            }
          }}
        >
          <TextInput
            name="name"
            label="Name"
            placeholder="Your Name"
            type="text"
          />
          <TextInput
            name="email"
            label="Email"
            placeholder="Your Email"
            type="email"
          />
          <RadioGroup name="gender" label="Gender" options={genderOptions} />
          <Select
            name="department"
            label="Department"
            options={departmentOptions}
          />
          <TextInput
            name="grNumber"
            label="Gr Number"
            placeholder="Your Gr Number"
            type="text"
          />
          <TextInput
            name="phone"
            label="Phone"
            placeholder="Your Phone No"
            type="text"
          />
          <TextInput
            name="address"
            label="Address"
            placeholder="Your Address"
            type="text"
          />
          <TextInput
            name="class"
            label="Class Name"
            placeholder="Your Class (e.g., A)"
            type="text"
          />

          <Button type="submit" onClick={() => router.back()}>
            Submit
          </Button>
        </GenericForm>
      </div>
    </div>
  );
}
