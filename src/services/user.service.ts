import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  try {
    const newUser = await prisma.user.create({ data: userData });
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json({
      success: true,
      message: "Get All User Successfully",
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const newData = req.body;
  try {
    const updateUser = await prisma.user.update({
      where: {
        email: "rahim@example.com",
      },
      data: newData,
    });
    res.status(201).json({
      success:true,
      message:'User updated successfully',
      data:updateUser
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const deleteUser=async(req:Request,res:Response)=>{
  const email=req.query.email;
  try{
    const deletedUser=await prisma.user.update({
      where:{
        email:email?.toString()
      },
      data:{
        deletedAt:new Date()
      },
    })
    res.status(200).json({
      success:true,
      message:'User deleted successfully',
      data:deletedUser
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
}