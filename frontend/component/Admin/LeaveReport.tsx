"use client"
import React, { useEffect, useState } from 'react'
import LeaveTable from '../common/LeaveTable'
import { getLeaveReport } from '@/services/services'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { error } from 'console'

export default function LeaveReport() {
const router = useRouter()
const [data, setData] = useState([])

useEffect(() => {
   async function getReportData() {
    const data = await getLeaveReport()
    console.log(data)
    if(data.data.success === true)
        setData(data.data)
        toast.success(data.message)
    }
    getReportData()
})
 
useEffect

  return (
    <div>
        <LeaveTable data={data}/>
    </div>
  )
}
