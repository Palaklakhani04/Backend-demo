import { RadioOptions } from '@/lib/Types'
import { ErrorMessage, Field } from 'formik'
import React from 'react'

export default function RadioGroup( {name, label, options}:{name:string, label:string, options:RadioOptions}) {
  return (
    <div className='mb-4'>
      {label && <label htmlFor={name} className='block text-sm text-gray-600 font-semibold mb-2'>
        {label}
      </label>}
      <div className='flex item-center space-x-3'>
        {options.map((option) => (
              <label key={option.value} className='text-gray-700 text-sm'>
                <Field 
                    type="radio"
                    name={name}
                    value={option.value}
                    disable={option.disabled}
                    className= "form-radio mr-1 h-3 w-3  text-indigo-600"
                  />
                {option.label} 
              </label> 
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
