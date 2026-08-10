import { Request, Response } from "express";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../services/category.service";


export const categoryCreate = async (req: Request, res: Response) => {
  const eventData = req.body;
  try {
    const newEvent = await createCategory(eventData)
    res.status(200).json({
      success: true,
      message: "New Category Created Successfully",
      data: newEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
export const categoryGet = async (req: Request, res: Response) => {
  try {
    const allCategory = await getAllCategory()
    res.status(200).json({
      success: true,
      message: "Get All Categories Successfully",
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
export const categoryUpdate = async (req: Request, res: Response) => {
  const newData = req.body;
  const id = req.query.id;
  try {
    const updatedEvent = await updateCategory(newData,id?.toString()||"")
    res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      data: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
export const categoryDelete=async(req:Request,res:Response)=>{
  const id=req.query.id;
  try{
    const deletedEvent=await deleteCategory(id?.toString()||"")
    res.status(200).json({
      success:true,
      message:'Category deleted successfully',
      data:deletedEvent
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