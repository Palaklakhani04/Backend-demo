"use client"
import Button from '@/component/common/Button'
import GenericForm from '@/component/common/GenericForm'
import TextInput from '@/component/common/TextInput'
import { LoginInitialValues, LoginVlaues } from '@/lib/Types'
import { loginSchema } from '@/lib/Validation'
import { loginval } from '@/services/services'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function Login() {
    const router = useRouter()
    const onsubmit =async (valuse: LoginVlaues ) => {
        try {
            console.log("Hit")
            const loginVlaues =  await loginval(
                valuse.email.trim(),
                valuse.password.trim()
            )
            if(loginVlaues.success){
                const authLogin = await signIn("credentials",{
                    redirect:false,
                    email:loginVlaues.user.email,
                    name:loginVlaues.user.name,
                    userId: loginVlaues.user.userId,
                    roleId:loginVlaues.user.roleId,
                    token: loginVlaues.token
                })
                if(authLogin?.ok){
                    router.push("/dashboard")
                    toast.success(loginVlaues.message)
                }
            }
        } catch (error:any) {
            console.log(error)
            toast.error(error.message)
        }
    }
  return (
    <div className='grid place-items-center min-h-dvh p-6 bg-gradient-to-br from-indigo-50 via-white to-emerald-50'>
      <div className='w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-xl'>
        <h1 className='mb-4 text-xl font-semibold'>Sign In</h1>
        <GenericForm<LoginVlaues>
            initialValues={LoginInitialValues}
            validationSchema={loginSchema}
            onSubmit={onsubmit}
        >
            <TextInput name="email" type="email" label="Email" placeholder="Your Email"/>
            <TextInput name="password" type="password" label='Password' placeholder='Your Password' />
            <Button type='submit'>Sign In</Button>
        </GenericForm>
        <p className="mt-3 text-center text-sm text-gray-600">
            No account? <Link className="underline" href="/register">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
