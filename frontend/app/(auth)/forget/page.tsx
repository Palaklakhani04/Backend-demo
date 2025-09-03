"use client"
import Button from '@/component/common/Button'
import GenericForm from '@/component/common/GenericForm'
import TextInput from '@/component/common/TextInput'
import { forgetPswType, LoginInitialValues, LoginVlaues } from '@/lib/Types'
import { loginSchema } from '@/lib/Validation'
import { otpSend } from '@/services/services'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function Login() {
    const router = useRouter()
    const onsubmit =async ( valuse: forgetPswType ) => {
        try {
            const data = await otpSend(valuse)
            if(data?.data.success === true){
                toast.success(data.data.message)
                router.push("/reset")
            }else{
                toast.error(data?.data.message)
            }
        } catch (error:any) {
            console.log(error)
            toast.error(error.message)
        }
    }
  return (
    <div className='grid place-items-center min-h-dvh p-6 bg-gradient-to-br from-indigo-50 via-white to-emerald-50'>
      <div className='w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-xl'>
        <h1 className='mb-4 text-xl text-gray-700 text-center font-semibold'>Forgot Password</h1>
        <GenericForm<LoginVlaues>
            initialValues={LoginInitialValues}
            validationSchema={loginSchema}
            onSubmit={onsubmit}
        >
            <TextInput name="email" type="email" label="Email" placeholder="Your Email"/>
            <Button type='submit'>SEND OTP</Button>
        </GenericForm>
        <p className="mt-3 text-center text-sm text-gray-600">
            No account? <Link className="underline" href="/register">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
