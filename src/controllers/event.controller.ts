import { Request, Response } from "express";
import { createEvent, deleteEvent, getAllEvent, updateEvent } from "../services/event.service";

export const eventCreate = async (req: Request, res: Response) => {
  const eventData = req.body;
  try {
    const newEvent = await createEvent(eventData)
    res.status(200).json({
      success: true,
      message: "New Event Created Successfully",
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
export const eventGet = async (req: Request, res: Response) => {
  try {
    const allEvent = await getAllEvent()
    res.status(200).json({
      success: true,
      message: "Get All Events Successfully",
      data: allEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
export const eventUpdate = async (req: Request, res: Response) => {
  const newData = req.body;
  const id = req.query.id;
  try {
    const updatedEvent = await updateEvent(newData,id?.toString()||"")
    res.status(200).json({
      success: true,
      message: "Event Updated Successfully",
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
export const eventDelete=async(req:Request,res:Response)=>{
  const id=req.query.id;
  try{
    const deletedEvent=await deleteEvent(id?.toString()||"")
    res.status(200).json({
      success:true,
      message:'Event deleted successfully',
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