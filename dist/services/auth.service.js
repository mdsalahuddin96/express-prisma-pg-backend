"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const registerUser = async (userData) => {
    const { name, email, password, image, role } = userData;
    // Check existing user
    const existingUser = await prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (existingUser && existingUser.deletedAt === null) {
        throw new Error("User already exists");
    }
    // Hash password
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    // Create user
    const user = await prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            image,
            role
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            createdAt: true,
        },
    });
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (loginData) => {
    const { email, password } = loginData;
    // Find user
    const user = await prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    // Check soft delete
    if (user.deletedAt !== null) {
        throw new Error("This account has been deleted");
    }
    // Compare password
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    // Generate JWT
    const token = jsonwebtoken_1.default.sign({
        userId: user.id,
        email: user.email,
        role: user.role,
    }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
        },
    };
};
exports.loginUser = loginUser;
