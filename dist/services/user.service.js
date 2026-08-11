"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUser = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getUser = async () => {
    const users = await prisma_1.default.user.findMany();
    return users;
};
exports.getUser = getUser;
const getUserById = async (userId) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: userId
        }
    });
    return user;
};
exports.getUserById = getUserById;
const updateUser = async (userData, userId) => {
    try {
        const updateUser = await prisma_1.default.user.update({
            where: {
                id: userId,
            },
            data: userData,
        });
        return updateUser;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.updateUser = updateUser;
const deleteUser = async (userId) => {
    try {
        const deletedUser = await prisma_1.default.user.update({
            where: {
                id: userId?.toString()
            },
            data: {
                deletedAt: new Date()
            },
        });
        return deletedUser;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.deleteUser = deleteUser;
