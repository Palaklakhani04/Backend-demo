
"use client"

import React, { JSX } from "react"
import {
  CheckCircle,
  XCircle,
  CalendarCheck,
  Percent
} from "lucide-react"

type LeaveBalanceProps = {
  leaveBalanceData: Record<string, any>[]
}

export default function LeaveBalance({ leaveBalanceData }: LeaveBalanceProps) {
  // map keys to icons
  const iconMap: Record<string, JSX.Element> = {
    AvailableLeave: <CalendarCheck className="w-6 h-6 text-indigo-500" />,
    AttendeancePercentage: <Percent className="w-6 h-6 text-blue-500" />,
    ApprovedLeave: <CheckCircle className="w-6 h-6 text-emerald-500" />,
    RejectedLeave: <XCircle className="w-6 h-6 text-red-500" />,
  }

  return (
    <div className="p-6 bg-gray-50">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-gray-800">
          Leave Balance
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {leaveBalanceData.map((item, index) => {
          const key = Object.keys(item)[0]
          const value = item[key]

          return (
            <div
              key={index}
              className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all p-6 flex items-start gap-4"
            >
              {/* Icon */}
              <div className="p-2 rounded-xl bg-gray-100 flex items-center justify-center">
                {iconMap[key] || <CalendarCheck className="w-6 h-6 text-gray-400" />}
              </div>

              {/* Text Content */}
              <div>
                <p className="text-sm text-gray-500 font-medium tracking-wide mb-1">
                  {key}
                </p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {value}
                </h3>
              </div>

              {/* Accent bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 rounded-b-2xl bg-gradient-to-r from-indigo-500 to-emerald-500"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
