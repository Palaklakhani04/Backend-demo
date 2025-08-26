import { options } from '@/lib/Types'
import { ErrorMessage, Field } from 'formik'
import React from 'react'

export default function RadioBtn( name:string, label:string, options:options[]) {
  return (
    <div className='mb-4'>
      <label htmlFor={name} className='block text-gray-700 font-bold mb-2'>
        {label}
      </label>
      <div className='flex item-center space-x-3'>
        {options.map((option:options) => (
            <React.Fragment key={option.value}>
                <Field 
                    type="radio"
                    id={option.value}
                    name={name}
                    value={option.value}
                    className= "form-radio h-5 w-5 text-indigo-600"
                />
                <label htmlFor={option.value} className='text-gray-700 font-bold'>
                    {option.label}
                </label>
            </React.Fragment >
        ))}
      </div>
      <ErrorMessage 
        name={name}
        component="div"
        className='text-red-500 text-sm mt-2'
      />
    </div>
  )
}
