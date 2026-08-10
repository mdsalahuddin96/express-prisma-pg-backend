import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createReview = async (req: Request, res: Response) => {
  const reviewData = req.body;
  try {
    const newReview = await prisma.review.create({
      data: reviewData,
    });
    res.status(200).json({
      success: true,
      message: "New Review Created Successfully",
      data: newReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const getAllReview = async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany();
    res.status(200).json({
      success: true,
      message: "Successfully get all reviews",
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const newData = req.body;
  const id = req.query.id;
  try {
    const updatedReview = await prisma.review.update({
      where: {
        id: id?.toString(),
      },
      data: newData,
    });
    res.status(200).json({
      success: true,
      message: "Review Updated Successfully",
      data: updatedReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const deleteReview=async(req:Request,res:Response)=>{
  const id=req.query.id;
  try{
    const deletedReview=await prisma.review.update({
      where:{
        id:id?.toString()
      },
      data:{
        deletedAt:new Date()
      }
    })
    res.status(200).json({
      success:true,
      message:'Review deleted successfully',
      data:deletedReview
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