import { Request, Response } from "express";
import { createReview, deleteReview, getAllReview, updateReview } from "../services/review.service";

export const reviewCreate = async (req: Request, res: Response) => {
  const reviewData = req.body;
  try {
    const newReview = await createReview(reviewData)
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

export const reviewGet = async (req: Request, res: Response) => {
  try {
    const reviews = await getAllReview()
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

export const reviewUpdate = async (req: Request, res: Response) => {
  const newData = req.body;
  const id = req.query.id;
  try {
    const updatedReview = await updateReview(newData,id?.toString()||"")
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

export const reviewDelete=async(req:Request,res:Response)=>{
  const id=req.query.id;
  try{
    const deletedReview=await deleteReview(id?.toString()||"")
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