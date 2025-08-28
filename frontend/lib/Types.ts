import { FormikHelpers } from "formik";

export interface register{
    name: string;
    email: string;
    password: string;
    gender: string;
    department: string;
    grNumber: string;
    phone: string;
    address:string;
    class: string;
    image: File | null
}

export const RegisterInitalValue:register = {
    name: "",
    email: "",
    password: "",
    gender: "",
    department: "",
    grNumber: "",
    phone: "",
    address: "",
    class: "",
    image: null
}

export type options = {
    value: string,
    label: string,
    disabled?: boolean
}

export type RadioOptions = ReadonlyArray<options>
export type SelectOptions = ReadonlyArray<options>
export type Options = ReadonlyArray<options>


export type LoginVlaues = {
    email: string,
    password: String
}

export const LoginInitialValues:LoginVlaues = {
    email:"",
    password:""
}

export type ApplyLeaveRequestType = {
    startDate: string;
    endDate: string;
    requestToId: string;
    leaveType: string;
    reason?:string;
}

export const ApplyLeaveReqInitialValue: ApplyLeaveRequestType = {
    startDate:"",
    endDate: "",
    requestToId: "",
    leaveType: "",
    reason:"",
}