"use client"

import LeaveBalance from '@/component/common/LeaveBalance'
import { LeaveBalanceType } from '@/lib/Types'
import { getLeaveBalance } from '@/services/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function page() {
  const [data, setData] = useState<LeaveBalanceType[]>([])

  const router = useRouter()
  useEffect(() => {
    async function getLeaveBalanceData() {
      try {
        const leaveBalanceData = await getLeaveBalance()
        if(!leaveBalanceData.data){
          toast.error(leaveBalanceData.data.message)
        }

        const data = Object.values(leaveBalanceData.data)
        console.log(data)
        setData(leaveBalanceData.data)
      } catch (error: any) {
        toast.error(error.message)
      }
    }
    getLeaveBalanceData()
  },[])

  return (
    <>
      <LeaveBalance
        leaveBalanceData={data ?? []}
      />              
    </>
  )                    
}
