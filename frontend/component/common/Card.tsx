import React from 'react'

type Props = {
    title?: string;
    subtitle?:string;
    children: React.ReactNode;
    className?:string;
}

export default function Card({title, subtitle, children, className}: Props) {

  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${className || ""}`}>
        {(title|| subtitle) && (
            <div className='mb-3'>
                {title && <h1 className='text-md font-semibold'>{title}</h1>}
                {subtitle && <p className='text-xs text-gray-500'>{subtitle}</p>}
            </div>
        )} 
        <div>{children}</div>
    </div>
  )
}
