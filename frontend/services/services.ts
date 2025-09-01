/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplyLeaveRequestType } from "@/lib/Types";
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
    throw new Error(error.response.data.message);
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
  formData.append("image", file)

  const response = await api.put("/student/update/profileimage", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response
}