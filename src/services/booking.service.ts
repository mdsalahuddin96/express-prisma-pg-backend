
import prisma from "../lib/prisma";

interface BookingDataType {
  userId: string;
  eventId: string;
  quantity: number;
  totalAmount: number;
  status: "Pending" | "Confirm" | "Cancelled";
  bookingDate: Date;
}
export const createBooking = async (bookingData: BookingDataType) => {
  try {
    const newBooking = await prisma.booking.create({
      data:bookingData
    })
    return newBooking;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getBookingByUserId = async (userId:string) => {
  
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId?.toString(),
      },
    });
    return bookings;
  } catch (error) {
    console.log(error);
    return error
  }
};
export const updateBooking = async (newData:BookingDataType,id:string) => {
  try {
    const updatedBooking = await prisma.booking.update({
      where: {
        id: id?.toString(),
      },
      data: newData,
    });
    return updatedBooking;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteBooking = async (id:string) => {
  try {
    const deletedBooking = await prisma.booking.update({
      where: {
        id: id?.toString(),
      },
      data: {
        status: "Cancelled",
      },
    });
    return deletedBooking;
  } catch (error) {
    console.log(error);
    return error;
  }
};
