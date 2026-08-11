import { Request, Response } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvent,
  updateEvent,
} from "../services/event.service";
import { AuthenticatedRequest } from "../lib/auth.types";
import prisma from "../lib/prisma";

export const eventCreate = async (req: AuthenticatedRequest, res: Response) => {
  const { userId, role } = req.user!;
  if (role !== "Organizer" && role !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to create an event",
    });
  }
  const eventData = {
    ...req.body,
    organizerId: userId,
  };
  try {
    const newEvent = await createEvent(eventData);
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
export const eventGet = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const allEvent = await getAllEvent();
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
export const eventUpdate = async (req: AuthenticatedRequest, res: Response) => {
  const { userId, role } = req.user!;
  const newData = req.body;
  const id = req.query.id;
  if (role !== "Organizer" && role !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to update an event",
    });
  }
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: id?.toString() || "",
      },
    });
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    if (role === "Organizer" && event.organizerId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own events",
      });
    }

    const updatedEvent = await updateEvent(newData, id?.toString() || "");
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
export const eventDelete = async (req: AuthenticatedRequest, res: Response) => {
  const { userId, role } = req.user!;
  const id = req.query.id;
  if (role !== "Organizer" && role !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to delete an event",
    });
  }
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: id?.toString() || "",
      },
    });
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    if (role === "Organizer" && event.organizerId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own events",
      });
    }

    const deletedEvent = await deleteEvent(id?.toString() || "");
    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      data: deletedEvent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};
