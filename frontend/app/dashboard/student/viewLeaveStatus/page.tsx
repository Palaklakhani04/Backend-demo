"use client"

import Button from '@/component/common/Button'
import ViewLeave from '@/component/common/ViewLeave'
import { getAllLeave } from '@/services/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function page() {
  const [data, setData] = useState([])

  const router = useRouter()
  useEffect(() => {
    async function getLeave() {
      try {
        const leaveData = await getAllLeave()
        if(!leaveData.data){
          toast.error(leaveData.data.message)
        }
        setData(leaveData.data)
      } catch (error: any) {
        console.log(error)
      }
    }
    getLeave()
  },[])

  return (
    <>
      <ViewLeave 
        requests={data ?? []}
      />
      
    </>
  )
}
