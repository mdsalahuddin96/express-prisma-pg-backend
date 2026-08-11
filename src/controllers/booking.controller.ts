import { Request, Response } from "express";
import {
  createBooking,
  deleteBooking,
  getBookingByUserId,
  updateBooking,
} from "../services/booking.service";
import { AuthenticatedRequest } from "../lib/auth.types";
import prisma from "../lib/prisma";

export const bookingCreate = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { userId } = req.user!;
  const bookingData = { ...req.body, userId };
  try {
    const newBooking = await createBooking(bookingData);
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

export const bookingGetById = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { userId } = req.user!;
  try {
    const bookings = await getBookingByUserId(userId?.toString() || "");
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
export const bookingUpdate = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { userId, role } = req.user!;
  const newData = req.body;
  const id = req.query.id;
  const booking = await prisma.booking.findUnique({
    where: {
      id: id?.toString(),
    },
  });
  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
  }
  if (role === "User" && booking.userId !== userId) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to update this booking",
    });
  }
  try {
    const updatedBooking = await updateBooking(newData, id?.toString() || "");
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

export const bookingDelete = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.query.id;
  const {userId,role}=req.user!
  const booking = await prisma.booking.findUnique({
    where: {
      id: id?.toString(),
    },
  });
  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
  }
  if (role === "User" && booking.userId !== userId) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to delete this booking",
    });
  }
  try {
    const deletedBooking = await deleteBooking(id?.toString() || "");
    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      data: deletedBooking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
