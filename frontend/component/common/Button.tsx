"use client"

import React from 'react'

export default function Button({children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
        {...props}
        className='w-full rounded-lg bg-gray-900 text-white py-2 px-3 text-sm font-medium hover:opacity-90'
    >
        {children}
    </button>
  )
}
