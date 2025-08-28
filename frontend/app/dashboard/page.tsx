"use client"

import Admin from '@/component/Admin/Admin'
import Faculty from '@/component/Faculty/Faculty'
import Hod from '@/component/Hod/Hod'
import Student from '@/component/Student/Student'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const router = useRouter()
    const {data: session} = useSession()

  return session?.user?.roleId === 1 ? (
    <Admin />
  ): session?.user?.roleId === 2 ? (
    <Hod />
  ): session?.user?.roleId === 3 ? (
    <Faculty />
  ): session?.user?.roleId === 4 ? (
    router.push("/dashboard/student")
  ): (
    "hhhhh"
    // <Loder />
  )
}
