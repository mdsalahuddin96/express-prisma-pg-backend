"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingDelete = exports.bookingUpdate = exports.bookingGetById = exports.bookingCreate = void 0;
const booking_service_1 = require("../services/booking.service");
const prisma_1 = __importDefault(require("../lib/prisma"));
const bookingCreate = async (req, res) => {
    const { userId } = req.user;
    const bookingData = { ...req.body, userId };
    try {
        const newBooking = await (0, booking_service_1.createBooking)(bookingData);
        res.status(200).json({
            success: true,
            message: "New Booking Created Successfully",
            data: newBooking,
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
exports.bookingCreate = bookingCreate;
const bookingGetById = async (req, res) => {
    const { userId } = req.user;
    try {
        const bookings = await (0, booking_service_1.getBookingByUserId)(userId?.toString() || "");
        res.status(200).json({
            success: true,
            message: "Successfully get all bookings of a user",
            data: bookings,
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
exports.bookingGetById = bookingGetById;
const bookingUpdate = async (req, res) => {
    const { userId, role } = req.user;
    const newData = req.body;
    const id = req.query.id;
    const booking = await prisma_1.default.booking.findUnique({
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
        const updatedBooking = await (0, booking_service_1.updateBooking)(newData, id?.toString() || "");
        res.status(200).json({
            success: true,
            message: "Booking Updated Successfully",
            data: updatedBooking,
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
exports.bookingUpdate = bookingUpdate;
const bookingDelete = async (req, res) => {
    const id = req.query.id;
    const { userId, role } = req.user;
    const booking = await prisma_1.default.booking.findUnique({
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
        const deletedBooking = await (0, booking_service_1.deleteBooking)(id?.toString() || "");
        res.status(200).json({
            success: true,
            message: "Booking deleted successfully",
            data: deletedBooking,
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
exports.bookingDelete = bookingDelete;
