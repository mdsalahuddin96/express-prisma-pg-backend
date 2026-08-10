import prisma from "../lib/prisma";

interface EventDataType {
  title: string;
  organizerId: string;
  categoryId: string;
  description: string;
  location?: string;
  capacity?: string;
  price: number;
  image?: string;
  startDate: Date;
  endDate: Date;
  status: "Draft" | "Published" | "Cancelled" | "Completed";
}
export const createEvent = async (eventData: EventDataType) => {
  try {
    const newEvent = await prisma.event.create({
      data: eventData,
    });
    return newEvent;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllEvent = async () => {
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
    return allEvent;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updateEvent = async (newData: EventDataType, id: string) => {
  try {
    const updatedEvent = await prisma.event.update({
      where: {
        id: id?.toString(),
      },
      data: newData,
    });
    return updatedEvent;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const deletedEvent = await prisma.event.update({
      where: {
        id: id?.toString(),
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return deletedEvent;
  } catch (error) {
    console.log(error);
    return error;
  }
};
