"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Page() {
  const router = useRouter()
    const {data: session, status} = useSession()

    useEffect(()=> {
      if (status === "loading") return // Wait for session to be ready

      if(session?.user?.roleId === 1 ){
        router.push("/dashboard/admin")
      }else if(session?.user?.roleId === 2 || session?.user?.roleId === 3){
        router.push("/dashboard/hod")
      }else if(session?.user?.roleId === 4){
        router.push("/dashboard/student")
      }else{
        console.log("No valid roleId found.")
      }
    },[session, status, router])

  return (
  <div>Redirecting...
    
  </div>)
}
