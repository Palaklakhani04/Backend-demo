import { ErrorMessage, Field } from 'formik'
import React, { useState } from 'react'

export default function FileInput({ name , label }: {name: string, label?: string}) {
    const [preview, setPreview] = useState<string | null>(null)

  return (
    <div className='mb-4'>
      {label && <label className='block text-sm font-medium mb-2'>{label}</label>}
      <Field name={name}>
        {({form}: any) => (
            <input
                type='file'
                accept="image/*"
                onChange={(e) => {
                    const file = e.currentTarget.files?.[0]
                    form.setFieldValue(name, file)
                    if(file) setPreview(URL.createObjectURL(file))
                }}
            />
        )}
      </Field>
      {
        preview && (
            // eslint-disable-next-line @ next/next/no-img-element
            <img src={preview} alt='preview' className='h-20  rounded'/>
        )
      }
      <ErrorMessage name={name} component="div" className='text-red-500 text-sm mt-2' />
    </div>
  )
}
