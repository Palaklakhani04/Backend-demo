"use client"

import ViewUserList from '@/component/Admin/ViewUserList'
import { UserType } from '@/lib/Types'
import { getAllStudent } from '@/services/services'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Page() {
      const [data, setData] = useState<UserType[]>([])
    
      const router = useRouter()
      useEffect(() => {
        async function getStudentData() {
          try {
            const data = await getAllStudent()
            console.log(data)
            if(!data.data){
              toast.error(data.data.message)
            }
    
            console.log(data)
            setData(data.data)
          } catch (error: any) {
            console.log(error)
          }
        }
        getStudentData()
      },[])
    
  return (
    <div>
      <ViewUserList userData={data}/>
    </div>
  )
}
