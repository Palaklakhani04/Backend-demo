import type { Request, Response } from "express";
import { loginSchema, signUpSchema, updateUserSchema } from "../lib/validation";
import { message } from "../lib/responseMessage";
import { prisma } from "../config/dbConnection";
import { userRegisterType } from "../lib/types";
import bcrypt from "bcrypt";
import { verifyIfUserExists } from "../lib/verifyExists";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUserLeave } from "../lib/userLeave";
import { toDataUri } from "../lib/util";
import { generateOtp, sendOtpEmail } from "../lib/auth";

dotenv.config();

export const userRegister = async (req: Request, res: Response) => {
  try {
console.log(req.body)
    const { error } = signUpSchema.validate(req.body);
    console.log(error)
    if (error) throw new Error(message.ERROR.USER.INVALIDE_INPUT);

    const {
      name,
      email,
      password,
      gender,
      phone,
      address,
      grNumber,
      department,
      roleId,
      className,
    } = req.body as userRegisterType;

    const hashPsw = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPsw,
        gender,
        image: toDataUri(req.file?.path!),
        phone,
        address,
        grNumber: grNumber ? grNumber : null,
        department: department ? department : null,
        roleId: Number(roleId),
        class: className ? className : null,
      },
    });

    await createUserLeave(user.id)

    return res.status(201).json({
      success: true,
      user,
      message: message.USER.REGISTER,
    });

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: message.ERROR.SERVER,
      error: error.message,
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const { error } = loginSchema.validate(req.body);
    console.log(error)
    if (error) throw new Error(message.ERROR.USER.INVALIDE_INPUT);

    const { email, password } = req.body;

    const user = await verifyIfUserExists(email);
    if (!user) throw new Error(message.ERROR.USER.NOT_FOUND);

    const isPasswordValide = await bcrypt.compare(password, user.password);
    if (!isPasswordValide)
      throw new Error(message.ERROR.USER.INCORRECT_PASSWORD);

    const payload = {
      userId: user.id,
      name: user.name,
      email: email,
      roleId: user.roleId,
    };

    const accessToken = jwt.sign(payload, process.env.AUTH_SECRET || "");
  
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: message.USER.LOGIN,
      user: payload,
      token: accessToken,
    });
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({
      message: message.ERROR.SERVER,
      error: error.message,
    });
  }
};


export const updateUserDetail = async (req:Request, res:Response) => {
    try {
        const { error } = updateUserSchema.validate(req.body)
        console.log(error)
        if(error) throw new Error(message.ERROR.USER.INVALIDE_INPUT)

        const {name, email, gender, phone, address , grNumber, department, roleId , className } = req.body as userRegisterType
        const { userId } = (req as any).user

        const updateUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name,
                email,
                gender,
                phone, 
                address , 
                grNumber,
                department,
                roleId: Number(roleId), 
                class: className ||" "
            }
        })

        return res.status(201).json({
            success: true,
            updateUser,
            message: message.USER.UPDATED
        })
    } catch (error:any) {
        return res.status(500).json({
            message: message.ERROR.SERVER, 
            error: error.message
        })
    }
}

export const updateProfileImage = async (req: Request, res: Response) => {
  try {
    const { userId } = (req as any).user
    if(!userId) throw new Error(message.ERROR.USER.NOT_FOUND)

    const newProfile = await prisma.user.update({
      where:{
        id: userId
      },
      data:{
        image:toDataUri(req.file?.path!)
      }
    })

    
    if(!newProfile) throw new Error(message.ERROR.NOT_FOUND)

    return res.status(201).json({
      success:true,
      user: newProfile,
      message: message.USER.UPDATED
    })

  } catch (error:any) {
    return res.status(500).json({
      message: message.ERROR.SERVER, 
      error: error.message
    })
  }
}


export const logout = async (req: Request, res: Response) => {
  res.cookie(
    "accessToken",
    "",
    {
      expires: new Date(0),
      httpOnly:true,
      sameSite: "none"
    }
  )

  res.status(200).json({
    success: true,
    message: message.USER.LOGOUT
  })
}

export const forgetPsw = async (req:Request, res:Response) => {
  try {
    const { email } = req.body
    if(!email) throw new Error(message.ERROR.NOT_FOUND)

      const user = await verifyIfUserExists(email)
      if(!user) throw new Error(message.ERROR.USER.NOT_FOUND)

      const otp = await generateOtp()
      const tokenHash = await bcrypt.hash(otp.toString(), 10)
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 min

      await prisma.oTP.create({
        data:{
          userId: user.id,
          tokenHash,
          expiresAt
        }
      })

      await sendOtpEmail(email, otp)

      return res.status(200).json({
        success: true,
        message:message.OTP.SEND
      })

  } catch (error:any) {
    return res.status(500).json({
      message: message.ERROR.SERVER, 
      error: error.message
    })
  }
}


export const resetPsw = async (req: Request, res:Response) => {
  try {
    const { email, otp, newPassword } = req.body
    
    const user = await verifyIfUserExists(email)
    if(!user) throw new Error(message.ERROR.USER.INVALIDE_INPUT)

      const otpEntry = await prisma.oTP.findFirst({
        where :{
          userId: user.id,
          expiresAt: {
            gt : new Date()
          }
        },
        orderBy:{
          createdAt: 'desc'
        }
      })

      if(!otpEntry) throw new Error(message.ERROR.OTP.INVALIDE_INPUT)

      const match = await bcrypt.compare(otp, otpEntry.tokenHash)
      if(!match) throw new Error(message.ERROR.OTP.INVALIDE_INPUT)

      const hashPsw = await bcrypt.hash(newPassword, 10)

      await prisma.user.update({
        where: {
          id: user.id
        },
        data:{
          password: hashPsw
        }
      })

      await prisma.oTP.delete({
        where:{
          id: otpEntry.id
        }
      })

      return res.status(201).json({
        success:true,
        message:message.ERROR.PASSWORD.UPDATE
      })

  } catch (error:any) {
    return res.status(500).json({
      message: message.ERROR.SERVER, 
      error: error.message
    })
  }
}



export const getDepartment = async (req:Request, res:Response) => {
  try {
    const department = await prisma.user.findMany({
      where:{
        roleId: 2
      },
      select:{
        department:true
      }
    })
    console.log(department)

    return res.status(200).json({
      success: true,
      department,
      message:message.FETCHED
    })

  } catch (error:any) {
    return res.status(500).json({
      message: message.ERROR.SERVER, 
      error: error.message
    })
  }
}