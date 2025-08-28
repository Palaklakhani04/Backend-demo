"use client"

import { ErrorMessage, Field } from "formik"

export default function Checkbox({name, label}: {name: string, label: React.ReactNode}) {
  return (
    <div className="mb-4">
        <label className="flex items-center gap-2 text-sm">
            <Field type="checkbox" name={name} />
            {label}
        </label>
        <ErrorMessage name={name} component="div" className="tex-red-500 text-sm mt-2" />
    </div>
  )
}

