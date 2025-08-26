"use client";
import { Formik, Field, ErrorMessage } from "formik";
import { TextField, Button, Box, Typography } from "@mui/material";
import { RegisterInitalValue } from "@/lib/Types";
import { RegisterSchema } from "@/lib/Validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { registerStudent } from "@/services/auth";
import ReusebleForm from "@/component/common/Form";


const RegisterForm = () => {
    const [file , setFile] = useState<File | null>(null)
    const router = useRouter()

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return 
        setFile(e.target.files[0])
    }

    const onSubmit = async (valuse, {resetForm}) => {
                if(!file) return toast.error("File is required.")
                const registerData = await registerStudent(valuse, file, "4")
                if(registerData.success){
                    toast.success(registerData.message)
                    router.push("/login")
                    resetForm()
                }else{
                    toast.error(registerData)
                }
            }

  return (
    <div className="flex h-screen max-w-lg m-auto  border-amber-50 justify-center items-center">
        <div className="max-w-full h-auto border-4 p-8 ">
        <ReusebleForm
            initialValues={RegisterInitalValue}
            validationSchema={RegisterSchema}
            onSubmit={async (valuse, {resetForm}) => {
                if(!file) return toast.error("File is required.")
                const registerData = await registerStudent(valuse, file, "4")
                if(registerData.success){
                    toast.success(registerData.message)
                    router.push("/login")
                    resetForm()
                }else{
                    toast.error(registerData)
                }
            }}
        />
        </div>
    </div>
  );
};

export default RegisterForm;
