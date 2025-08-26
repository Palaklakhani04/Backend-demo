import { register } from "@/lib/Types";
import { api } from "./services";

export const registerStudent = async (
  valuse: register,
  file: File,
  roleId: string
) => {
  try {
    const formData = new FormData();

    formData.append("name", valuse.name.trim());
    formData.append("email", valuse.email.trim());
    formData.append("password", valuse.password.trim());
    formData.append("gender", valuse.gender.trim());
    formData.append("grNumber", valuse.grNumber.trim());
    formData.append("image", file, file.name);
    formData.append("department", valuse.department.trim());
    formData.append("phone", valuse.phone.trim());
    formData.append("address", valuse.address.trim());
    formData.append("className", valuse.className.trim());

    const obj = Object.fromEntries(formData.entries());

    const { data } = await api.post(
      "/user/signup",
      {
        ...obj,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if( data.success === true){
      return data
    }
  } catch (error: any) {
    return error.response.data.error
  }
};

