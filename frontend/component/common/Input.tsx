import { ErrorMessage, Field } from "formik";

export default function InputField(labelName: string, inputName:string, inputType: string, placeholder: string) {
  return (
    <div className="mb-4">
      <label htmlFor={inputName} className="block text-gray-700 font-bold mb-2">
        {labelName}
      </label>
      <Field 
        type={inputType}
        name={inputName}
        id={inputName}
        className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
        placeholder={placeholder}
      />
      <ErrorMessage 
        name="inputName"
        component="div"
        className="text-red-500 text-sm mt-2"
      />
    </div>
  )
}

