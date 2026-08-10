import { Request, Response } from "express";
import { createBooking, deleteBooking, getBookingByUserId, updateBooking } from "../services/booking.service";


export const bookingCreate = async (req: Request, res: Response) => {
  const bookingData = req.body;
  try {
    const newBooking = await createBooking(bookingData)
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

export const bookingGetById = async (req: Request, res: Response) => {
    const userId=req.query.userId
  try {
    const bookings = await getBookingByUserId(userId?.toString()||"")
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
export const bookingUpdate = async (req: Request, res: Response) => {
  const newData = req.body;
  const id = req.query.id;
  try {
    const updatedBooking = await updateBooking(newData,id?.toString()||"")
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

export const bookingDelete=async(req:Request,res:Response)=>{
  const id=req.query.id;
  try{
    const deletedBooking=await deleteBooking(id?.toString()||"")
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