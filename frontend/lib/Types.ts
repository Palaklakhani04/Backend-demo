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
    label?: string,
    disabled?: boolean
}

export type RadioOptions = ReadonlyArray<options>
export type SelectOptions = ReadonlyArray<options>
export type Options = ReadonlyArray<options>


export type LoginVlaues = {
    email: string,
    password: string
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

export type LeaveStatus = "Pending" | "Approved" |"Rejected"

export type LeaveRequestType = {
    id:string;
    startDate: string;
    endDate: string;
    requestToId: string;
    leaveType: string;
    reason?:string;
    status: LeaveStatus
}

export type LeaveBalanceType = {
    AvailableLeave: number;
    AttendeancePercentage: number;
    ApprovedLeave: number;
    RejectedLeave: number;
}

export type ProfileType = {
    name: string;
    email: string;
    gender: string;
    department: string;
    grNumber: string;
    phone: string;
    address:string;
    class?: string;
    image: File | null ;
    roleId: number
}

export type ProfileDetailsType = {
    name: string;
    email: string;
    gender: string;
    department: string;
    grNumber: string;
    phone: string;
    address:string;
    class?: string;
}

export const ProfileInitalValue = {
    name: "",
    email: "",
    gender: "",
    department: "",
    grNumber: "",
    phone: "",
    address: "",
    class: "",
}

export type LeaveStatusData = {
    id:number;
    userId:string
    user:{
        id:string;
        name:string;
        department:string;
    }
    leaveType: string;
    startDate:string;
    endDate:string;
    reason:string;
    status: string;
}

export type UserType = {
    id?:string;
    name: string;
    email: string;
    gender: string;
    department: string;
    grNumber: string;
    phone: string;
    address:string;
    class?: string;
    roleId?: number;
}

export type UserTypeData ={
    id?: string;
    name: string;
    email: string;
    gender: string;
    department: string;
    grNumber: string;
    phone: string;
    address:string;
    class?: string;
    roleId?: number;
}

export type LeaveReport = {
  name: string;
  deparment: string;
  leaveCount:{
    id: number;
  } 
};

export type LeaveReportLessAttend = {
  name: string;
  department: string;
  leaveCount: number;
};

export type PendingLeave = {
    reason: string;
    status: string;
    user:{
        name:string;
        department:string;
        roleId: number;
    }
}

export type LessAttendanceReport = {
    attendancePercentage: string;
    user:{
        name:string;
        department:string;
    }
}

export type forgetPswType = {
    email: string
}

export type resetPswType = {
    email: string;
    otp: string;
    newPassword: string;
}

export const resetPswInit = {
    email: "",
    otp: "",
    newPassword: ""
}