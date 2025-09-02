"use client"
import Button from '@/component/common/Button'
import Card from '@/component/common/Card'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
  const router = useRouter()
  return (
    <div className='grid place-items-center  min-h-dvh justify-center'>
      <div className='w-full text-center justify-center '>
        <h1 className='tex-xl text-gray-700 font-bold'>HOD And Faculty dashboard</h1>
        <Card
          title="Update Leave Request Status"
          subtitle="Leave Request Status"
          className="m-2 text-gray-700"
        >
          <div className="w-40">
            <Button
              type="submit"
              onClick={() => router.push("/dashboard/hod/updatestatus")}
            >
              Update
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
