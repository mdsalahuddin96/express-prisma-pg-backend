"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.getBookingByUserId = exports.createBooking = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createBooking = async (bookingData) => {
    try {
        const newBooking = await prisma_1.default.booking.create({
            data: bookingData
        });
        return newBooking;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.createBooking = createBooking;
const getBookingByUserId = async (userId) => {
    try {
        const bookings = await prisma_1.default.booking.findMany({
            where: {
                userId: userId?.toString(),
            },
        });
        return bookings;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getBookingByUserId = getBookingByUserId;
const updateBooking = async (newData, id) => {
    try {
        const updatedBooking = await prisma_1.default.booking.update({
            where: {
                id: id?.toString(),
            },
            data: newData,
        });
        return updatedBooking;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = async (id) => {
    try {
        const deletedBooking = await prisma_1.default.booking.update({
            where: {
                id: id?.toString(),
            },
            data: {
                status: "Cancelled",
            },
        });
        return deletedBooking;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.deleteBooking = deleteBooking;
