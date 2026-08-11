"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getAllEvent = exports.createEvent = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createEvent = async (eventData) => {
    try {
        const newEvent = await prisma_1.default.event.create({
            data: eventData,
        });
        return newEvent;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.createEvent = createEvent;
const getAllEvent = async () => {
    try {
        const allEvent = await prisma_1.default.event.findMany({
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
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getAllEvent = getAllEvent;
const updateEvent = async (newData, id) => {
    try {
        const updatedEvent = await prisma_1.default.event.update({
            where: {
                id: id?.toString(),
            },
            data: newData,
        });
        return updatedEvent;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.updateEvent = updateEvent;
const deleteEvent = async (id) => {
    try {
        const deletedEvent = await prisma_1.default.event.update({
            where: {
                id: id?.toString(),
            },
            data: {
                deletedAt: new Date(),
            },
        });
        return deletedEvent;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.deleteEvent = deleteEvent;
