import { ErrorMessage, Field } from "formik";

export default function TextInput({ name, label, type="text", placeholder}:{name: string, label?:string, type: string, placeholder?: string}) {
  return (
    <div className="mb-4 space-y-1">
      {label && <label htmlFor={name} className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>}
      <Field 
        type={type}
        name={name}
        id={name}
        className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
        placeholder={placeholder}
      />
      <ErrorMessage 
        name={name}
        component="div"
        className="text-red-500 text-sm mt-2"
      />
    </div>
  )
}

