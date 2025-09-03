
"use client"
import React, { useEffect, useState } from 'react'
import LeaveTable from '../common/LeaveTable'
import { getLeaveReport } from '@/services/services'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { LeaveReport, LessAttendanceReport, PendingLeave } from '@/lib/Types'
import LessAttendance from '../common/LessAttendance'
import PendingLeaveData from '../common/PendingLeave'

export default function LeaveReportData() {
const router = useRouter()
const [studentData, setStudentData] = useState<LeaveReport[] | []>([])
const [pendingData, setPendingData] = useState<PendingLeave[] | []>([])
const [attendanceData, setAttendanceData] = useState<LessAttendanceReport[] | []>([])

useEffect(() => {
  async function getReportData() {
  try {
     const data = await getLeaveReport()
     console.log(data.data.StudentLeaveData)
     
        setStudentData(data.data.StudentLeaveData)
        setPendingData(data.data.PendingLeave)
        setAttendanceData(data.data.LessAttendance)
          toast.success(data.message)
    } 
    catch (error:any) {
      toast.error(error.data.error)
  } 
  }getReportData()
},[])

  return (
    <div>
      <div className='flex items-center max-w-4xl'>
        <LeaveTable data={studentData}/>
        <LessAttendance data={attendanceData}/>
      </div>
        <PendingLeaveData data={pendingData}/>
    </div>
  )
}
