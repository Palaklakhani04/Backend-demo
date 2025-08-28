import { register } from "@/lib/Types";
import { api } from "./services";
import { DefaultSession } from "next-auth";
import dotenv from "dotenv"
import CredentialsProvider from "next-auth/providers/credentials";

export const registerStudent = async (
  valuse: register,
  roleId: string
) => {
  try {
    const formData = new FormData();
    formData.append("name", valuse.name.trim());
    formData.append("email", valuse.email.trim());
    formData.append("password", valuse.password.trim());
    formData.append("gender", valuse.gender.trim());
    formData.append("grNumber", valuse.grNumber.trim());
    formData.append("department", valuse.department.trim());
    formData.append("phone", valuse.phone.trim());
    formData.append("address", valuse.address.trim());
    formData.append("class", valuse.class.trim());
    formData.append("roleId", roleId );
    if(valuse.image){
      formData.append("image", valuse.image, valuse.image.name);
    }
    const obj = Object.fromEntries(formData.entries());
    const { data } = await api.post(
      "/users/signup",
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
    console.log(error)
    return error.response.data.error
  }
};

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      name: string;
      email: string;
      roleId: number;
    } & DefaultSession["user"]
  }

  interface JWT{
    id:string;
    customField: string
  }
}

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name:"Credentials",
      credentials:{ 
        email: {label: "Email" , type: "text"},
        password: {label: "Password", type:"password"}
      },
      async authorize(credentials: any) {
        try {
          if (!credentials.email || !credentials.name || !credentials.roleId)
            throw new Error("Credentials not found!")

          return {
            userId: credentials.userId,
            name: credentials.name,
            email: credentials.email,
            roleId: Number(credentials.roleId),
            token: credentials.token
          }
        }catch(error:any){
          return error.message
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({token, user}: any) {
      if(user){
        token.userId = user.userId;
        token.name = user.name;
        token.email = user.email;
        token.roleId = user.roleId;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }:any) {
      if(token) {
        session.user.userId = token.userId;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.roleId = token.roleId;
        session.user.token = token.token;
      }
      return session
    },
  },
  pages: {
    signIn: "/signin"
  }
}