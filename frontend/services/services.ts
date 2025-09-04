/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplyLeaveRequestType, forgetPswType, register, resetPswType, UserType } from "@/lib/Types";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const loginval = async (email: string, password: string) => {
  try {
    const { data } = await api.post("/users/signin", { email, password });
    console.log(data);
    if (data.success) return data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const studentApplyLeave = async (values: ApplyLeaveRequestType) => {
  try {
    const { data } = await api.post("/student/leaverequest", {

      leaveType: values.leaveType.trim() as string,
      startDate: values.startDate.trim(),
      endDate: values.endDate.trim(),
      requestToId: values.requestToId.trim(),
      reason: values.reason?.trim(),
      status: "Pending",
    });
    console.log(data);
    if (data.success) return data;

  } catch (error: any) {
    console.log(error)
  }
};

export const getAllLeave = async () => {
  const { data } = await api.get("/student/leave")
  if (data.success) return data
}

export const getLeaveBalance = async () => {
  const { data } = await api.get("/student/leavebalance")
  if (data.success) return data
}

export const changeProfileImage = async (file: any) => {
  const formData = new FormData()
  console.log(file)
  formData.append("image", file)

  const response = await api.put("/student/update/profileimage", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response
}

export const addUsers = async (values: register, roleId: string) => {
  try {

    const formData = new FormData();
    
    formData.append("name", values.name.trim());
    formData.append("email", values.email.trim());
    formData.append("password", values.password.trim());
    formData.append("gender", values.gender.trim());
    formData.append("grNumber", values.grNumber.trim());
    formData.append("department", values.department.trim());
    formData.append("phone", values.phone.trim());
    formData.append("address", values.address.trim());
    formData.append("className", values.class.trim());
    formData.append("roleId", roleId );
    if(values.image){
      formData.append("image", values.image, values.image.name);
    }
    const obj = Object.fromEntries(formData.entries());

    const {data} = await api.post("/admin/createUser", {
        ...obj,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    console.log(data)
   
    return data;
  } catch (error:any) {
     throw new Error(error.data.error);
  }
};


export const getAllStudent = async () => {
  const {data} = await api.get("/admin/students")
  console.log(data)
  return data
}

export const getAllFaculty = async () => {
  const {data} = await api.get("/admin/faculty")
  console.log(data)
  return data
}

export const getAllHod = async () => {
  const {data} = await api.get("/admin/hod")
  console.log(data)
  return data
}

export const updateUser = async (id: string, values: UserType) => {
  try {
    const payload = {
                name: values.name,
                email: values.email,
                gender: values.gender,
                grNumber: values.grNumber,
                department: values.department,
                className: values.class,
                address: values.address,
                phone: values.phone,
                roleId: values.roleId
              };
      
    const data = await api.put(`/admin/update/${id}`, payload)
    console.log(data)
    return data
  } catch (error:any) {
    throw new Error(error.data.message)
  }
}

export const getUserById = async (id:string) => {
  const {data} = await api.get(`/admin/user/${id}`)
  if(data.success === true)
    console.log(data)
    return data
}

export const getLeaveReport = async () => {
  const { data } = await api.get('/admin/leavereportdata')
  if(data.success === true)
    return data
}

export const otpSend = async (values: forgetPswType) => {
  try {
    const res = await api.post("/users/forget", 
      {email: values.email.trim()}
    )
    if(res.data.success === true)
      return res
  } catch (error:any) {
    throw new Error(error.data.message)
  }
}


export const resetPsw = async (values:resetPswType) => {
  try {
    const {data} = await api.post("/users/reset", 
      {
        email: values.email.trim(),
        otp: values.otp.trim(),
        newPassword: values.newPassword.trim()
      }
    )
    if(data.success === true)
      return data
  } catch (error:any) {
    throw new Error(error.response.data.error)
  }
}