import { Request, Response } from "express";
import { deleteUser, getUser, updateUser } from "../services/user.service";

export const get = async (req: Request, res: Response) => {
  try {
    const allUsers = await getUser()
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

export const update=async (req: Request, res: Response) => {
    const newData=req.body;
    const email=req.query.email
  try {
    const updatedUser = await updateUser(newData,email?.toString()||"")
    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const userDelete=async(req:Request,res:Response)=>{
  const email=req.query.email;
  try{
    const deletedUser=await deleteUser(email?.toString()||"")
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