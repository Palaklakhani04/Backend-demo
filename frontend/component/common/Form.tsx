import { ErrorMessage, Field, Form, Formik } from "formik";
import InputField from "./TextInput";
import RadioBtn from "./Radio";
import SelectField from "./Select";

// const ReusebleForm = ({
//   initialValues,
//   validationSchema,
//   onSubmit,
//   fields,
// }) => {
//   return (
//     <div className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen items-center justify-center">
//       <div className="px-6 rounded-lg shadow-lg py-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">
//             {fields.title}
//         </h1>
//         <Formik 
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}
//           enableReinitialize= {true}
//         >
//           {({setFieldValue}) => (
//             <Form>
//               <div className="">
//                 {fields.items.map((field , index:number) => {
//                   switch (field.type) {
//                     case "input":
//                       return (
//                         <InputField
//                           key={index}
//                           labelName= {field.labelName}
//                           inputtype={field.inputName}
//                           inputName={field.inputType}
//                           placeholder={field.placeholder}
//                         />
//                       )
//                     case "radio" :
//                       return(
//                         <RadioBtn 
//                           key={index}
//                           name={field.name}
//                           label={field.labelName}
//                           options={field.options}
//                         />
//                       )
//                     case "file":
//                       return (
//                         <div key={index} className="mb-4">
//                           <label htmlFor={field.name} className="block text-gray-700 font-bold mb-2">
//                             {field.labelName}
//                           </label>
//                           <input 
//                             type="file"
//                             name={field.name}
//                             id={field.name}
//                             className="shdow appearance-none bg-white border rounded py-2 px-3 text-gray-700 leading-tight"
//                             placeholder={field.placeholder}
//                             onChange={handleFile}
//                           />
//                           <ErrorMessage 
//                             name={field.name}
//                             component="div"
//                             className="text-red-500 mt-2 text-sm"
//                           />
//                         </div>
//                       )
//                     case "select" :
//                       return (
//                         <SelectField 
//                           key={index}
//                           name={field.name}
//                           label={field.labelName}
//                           options={field.options}
//                         />
//                       )
//                     case "textarea":
//                       return (
//                         <div key={index} className="mb-4">
//                           <label htmlFor={field.name} className="block text-gray-700 font-bold mb-2">
//                             {field.labelName}
//                           </label>
//                           <input 
//                             type="textarea"
//                             name={field.name}
//                             id={field.name}
//                             rows="3"
//                             className="shdow appearance-none bg-white border rounded py-2 px-3 text-gray-700 leading-tight"
//                             placeholder={field.placeholder}
//                           />
//                           <ErrorMessage 
//                             name={field.name}
//                             component="div"
//                             className="text-red-500 mt-2 text-sm"
//                           />
//                         </div>
//                       )
//                     default :
//                      return null
//                   }
//                 })}
//               </div>

//               {fields.acceptingText && (
//                 <div className="flex items-start mb-6">
//                   <div className="flex items-center h-5">
//                     <Field 
//                       type="checkbox"
//                       id="terms"
//                       name="terms"
//                       className="form-checkbox h-5 w-5 text-indigo-600"
//                     />
//                   </div>
//                   <div className="ml-3 text-sm">
//                     <label htmlFor="terms" className="font-medium text-gray-700 flex item-center">
//                       I accept the {" "}
//                     </label>
//                     <a href="#" className="text-indigo-600 hover:text-indigo-800 ml-1">
//                       Terms and conditions
//                     </a>
//                     <ErrorMessage 
//                       name="terms"
//                       component="div"
//                       className="text-red-500 mt-2 text-sm"
//                     />
//                   </div>
//                 </div>
//               )}


//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };


// export default ReusebleForm