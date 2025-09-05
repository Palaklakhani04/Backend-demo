"use client"
import Button from '@/component/common/Button'
import GenericForm from '@/component/common/GenericForm'
import TextInput from '@/component/common/TextInput'
import { resetPswInit, resetPswType } from '@/lib/Types'
import { ResetSchema } from '@/lib/Validation'
import { resetPsw } from '@/services/services'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function Reset() {
    const router = useRouter()
    const onsubmit =async ( valuse: resetPswType ) => {
        try {
            const data = await resetPsw(valuse)
            if(data?.success === true){
                toast.success(data.message)
                router.push("/login")
            }
        } catch (error:any) {
            toast.error(error.message)
        }
    }
  return (
    <div className='grid place-items-center min-h-dvh p-6 bg-gradient-to-br from-indigo-50 via-white to-emerald-50'>
      <div className='w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-xl'>
        <h1 className='mb-4 text-xl text-gray-700 text-center font-semibold'>Reset Password</h1>
        <GenericForm<resetPswType>
            initialValues={resetPswInit}
            validationSchema={ResetSchema}
            onSubmit={onsubmit}
        >
            <TextInput name="email" type="email" label="Email" placeholder="Your Email"/>
            <TextInput name="otp" type="text" label="OTP" placeholder="Your OTP"/>
            <TextInput name="newPassword" type="password" label="New Password" placeholder="Your New Password"/>
            <Button type='submit'>Submit</Button>
        </GenericForm>
        <p className="mt-3 text-center text-sm text-gray-600">
            Forget Password? <Link className="underline" href="/forget">Forgot Password</Link>
        </p>
      </div>
    </div>
  )
}
