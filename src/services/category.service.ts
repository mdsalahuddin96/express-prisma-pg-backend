import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createCategory = async (req: Request, res: Response) => {
    const categoryData=req.body;
  try {
    const newCategory=await prisma.category.create({data:categoryData})
    res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const allCategory = await prisma.category.findMany();
    res.status(200).json({
      success: true,
      message: "Get All Category Successfully",
      data: allCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const newData = req.body;
  const id=req.query.id
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id: id?.toString(),
      },
      data: newData,
    });
    res.status(201).json({
      success:true,
      message:'Category updated successfully',
      data:updatedCategory
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const deleteCategory=async(req:Request,res:Response)=>{
  const id=req.query.id;
  try{
    const deletedCategory=await prisma.category.update({
      where:{
        id:id?.toString()
      },
      data:{
        deletedAt:new Date()
      },
    })
    res.status(200).json({
      success:true,
      message:'category deleted successfully',
      data:deletedCategory
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