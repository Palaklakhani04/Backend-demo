import { options, SelectOptions } from "@/lib/Types";
import { ErrorMessage, Field } from "formik";
import React from "react";

export default function Select(
 {
  name,
  label,
  options
 }:{ name: string,
  label: string,
  options: SelectOptions}
) {
  return (
    <div className="mb-4">
      {label && <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>}
      <Field
        as="select"
        name={name}
        id={name}
        className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
      >
        <option value="">
          Select an option
        </option>
        {options.map((option: options) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-2"
      />
    </div>
  );
}
