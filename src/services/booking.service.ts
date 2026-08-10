import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createBooking = async (req: Request, res: Response) => {
  const bookingData = req.body;
  try {
    const newBooking = await prisma.booking.create({
      data: bookingData,
    });
    res.status(200).json({
      success: true,
      message: "New Booking Created Successfully",
      data: newBooking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const getBookingByUserId = async (req: Request, res: Response) => {
    const userId=req.query.userId
  try {
    const bookings = await prisma.booking.findMany({
        where:{
            userId:userId?.toString()
        }
    });
    res.status(200).json({
      success: true,
      message: "Successfully get all bookings of a user",
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
export const updateBooking = async (req: Request, res: Response) => {
  const newData = req.body;
  const id = req.query.id;
  try {
    const updatedBooking = await prisma.booking.update({
      where: {
        id: id?.toString(),
      },
      data: newData,
    });
    res.status(200).json({
      success: true,
      message: "Booking Updated Successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const deleteBooking=async(req:Request,res:Response)=>{
  const id=req.query.id;
  try{
    const deletedBooking=await prisma.booking.delete({
      where:{
        id:id?.toString()
      },
    })
    res.status(200).json({
      success:true,
      message:'Booking deleted successfully',
      data:deletedBooking
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