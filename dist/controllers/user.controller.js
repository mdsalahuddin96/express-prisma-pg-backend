"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDelete = exports.update = exports.get = void 0;
const user_service_1 = require("../services/user.service");
const prisma_1 = __importDefault(require("../lib/prisma"));
const get = async (req, res) => {
    const { userId, role } = req.user;
    try {
        let users;
        if (role === "Admin") {
            users = await (0, user_service_1.getUser)();
        }
        else {
            users = await (0, user_service_1.getUserById)(userId.toString());
        }
        res.status(200).json({
            success: true,
            message: role === "Admin"
                ? "Retrieve All User Successfully"
                : "User Info retrieve successfully",
            data: users,
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
exports.get = get;
const update = async (req, res) => {
    const targetUserId = typeof req.params.id === "string" ? req.params.id.trim() : undefined;
    const { userId, role } = req.user;
    const newData = role === "Admin"
        ? {
            name: req.body.name,
            image: req.body.image,
            role: req.body.role,
        }
        : {
            name: req.body.name,
            image: req.body.image,
        };
    if (!targetUserId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
    }
    try {
        const user = await prisma_1.default.user.findUnique({
            where: {
                id: targetUserId,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if (role !== "Admin" && targetUserId !== userId) {
            return res.status(403).json({
                success: false,
                message: "You can't update other info",
            });
        }
        const updatedUser = await (0, user_service_1.updateUser)(newData, targetUserId?.toString() || "");
        res.status(200).json({
            success: true,
            message: "User Updated Successfully",
            data: updatedUser,
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
exports.update = update;
const userDelete = async (req, res) => {
    const { userId, role } = req.user;
    const targetUserId = typeof req.params.id === "string" ? req.params.id.trim() : undefined;
    if (!targetUserId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
    }
    try {
        const user = await prisma_1.default.user.findUnique({
            where: {
                id: targetUserId,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if (role !== "Admin" && targetUserId !== userId) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own account",
            });
        }
        const deletedUser = await (0, user_service_1.deleteUser)(targetUserId);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser,
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
exports.userDelete = userDelete;
