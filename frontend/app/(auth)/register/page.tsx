"use client";
import {
  RadioOptions,
  RegisterInitalValue,
  SelectOptions,
  type register,
} from "@/lib/Types";
import { RegisterSchema } from "@/lib/Validation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { registerStudent } from "@/services/auth";
import GenericForm from "@/component/common/GenericForm";
import TextInput from "@/component/common/TextInput";
import RadioGroup from "@/component/common/Radio";
import Select from "@/component/common/Select";
import FileInput from "@/component/common/FileInput";
import Button from "@/component/common/Button";
import Link from "next/link";
import { getDepartment } from "@/services/services";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [deptOption, setDeptOption] = useState<SelectOptions>([]);
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

  const onSubmit = async (valuse: register) => {
    try {
      const registerData = await registerStudent(valuse, "4");
      if (registerData.success) {
        toast.success(registerData.message);
        router.push("/login");
      } else {
        toast.error(registerData);
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const genderOptions: RadioOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
  ];

  return (
    <div className="min-h-dvh grid place-items-center p-6 bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      <div className="w-full mt-8 max-w-sm rounded-2xl border shadow-xl text-gray-700 border-gray-200 bg-white p-4">
        <h1 className="mb-4 text-2xl font-semibold">Create account</h1>
        <GenericForm<register>
          initialValues={RegisterInitalValue}
          validationSchema={RegisterSchema}
          onSubmit={onSubmit}
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
          <TextInput
            name="password"
            label="Password"
            placeholder="Your Password"
            type="password"
          />
          <RadioGroup name="gender" label="Gender" options={genderOptions} />
          <FileInput name="image" label="Image" />
          <Select name="department" label="Department" options={deptOption} />
          <TextInput
            name="grNumber"
            label="GrNumber"
            placeholder="Your grNumber"
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
            label="class Name"
            placeholder="Your ClassName Ex-A"
            type="text"
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Please wait.." : "Create Account"}
          </Button>
        </GenericForm>
        <p className="mt-3 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="underline" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
