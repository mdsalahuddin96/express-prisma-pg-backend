import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createEvent = async (req: Request, res: Response) => {
  const eventData = req.body;
  try {
    const newEvent = await prisma.event.create({
      data: eventData,
    });
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

export const getAllEvent = async (req: Request, res: Response) => {
  try {
    const allEvent = await prisma.event.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        organize: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
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
export const updateEvent = async (req: Request, res: Response) => {
  const newData = req.body;
  const id = req.query.id;
  try {
    const updatedEvent = await prisma.event.update({
      where: {
        id: id?.toString(),
      },
      data: newData,
    });
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

export const deleteEvent=async(req:Request,res:Response)=>{
  const id=req.query.id;
  try{
    const deletedEvent=await prisma.event.update({
      where:{
        id:id?.toString()
      },
      data:{
        deletedAt:new Date()
      },
    })
    res.status(200).json({
      success:true,
      message:'User deleted successfully',
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