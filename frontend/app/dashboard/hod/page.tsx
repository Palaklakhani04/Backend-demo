"use client"

import UpdateLeaveStatus from '@/component/Hod/UpdateLeaveStatus'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const router = useRouter()
  return (
      <div className='w-full m-auto '>
      <UpdateLeaveStatus />
      </div>
  )
}
