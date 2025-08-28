import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials:true
})

   
export const loginval = async (email: string, password:string) => {
    try {
        const { data } = await api.post("/users/signin", { email, password })
        console.log(data)
        if(data.success) return data

    } catch (error:any) {
        throw new Error(error.response.data.message)
    }

}

