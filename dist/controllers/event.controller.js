"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventDelete = exports.eventUpdate = exports.eventGet = exports.eventCreate = void 0;
const event_service_1 = require("../services/event.service");
const prisma_1 = __importDefault(require("../lib/prisma"));
const eventCreate = async (req, res) => {
    const { userId, role } = req.user;
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
        const newEvent = await (0, event_service_1.createEvent)(eventData);
        res.status(200).json({
            success: true,
            message: "New Event Created Successfully",
            data: newEvent,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
};
exports.eventCreate = eventCreate;
const eventGet = async (req, res) => {
    try {
        const allEvent = await (0, event_service_1.getAllEvent)();
        res.status(200).json({
            success: true,
            message: "Get All Events Successfully",
            data: allEvent,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
};
exports.eventGet = eventGet;
const eventUpdate = async (req, res) => {
    const { userId, role } = req.user;
    const newData = req.body;
    const id = req.query.id;
    if (role !== "Organizer" && role !== "Admin") {
        return res.status(403).json({
            success: false,
            message: "You are not allowed to update an event",
        });
    }
    try {
        const event = await prisma_1.default.event.findUnique({
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
        const updatedEvent = await (0, event_service_1.updateEvent)(newData, id?.toString() || "");
        res.status(200).json({
            success: true,
            message: "Event Updated Successfully",
            data: updatedEvent,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
};
exports.eventUpdate = eventUpdate;
const eventDelete = async (req, res) => {
    const { userId, role } = req.user;
    const id = req.query.id;
    if (role !== "Organizer" && role !== "Admin") {
        return res.status(403).json({
            success: false,
            message: "You are not allowed to delete an event",
        });
    }
    try {
        const event = await prisma_1.default.event.findUnique({
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
        const deletedEvent = await (0, event_service_1.deleteEvent)(id?.toString() || "");
        res.status(200).json({
            success: true,
            message: "Event deleted successfully",
            data: deletedEvent,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
};
exports.eventDelete = eventDelete;
