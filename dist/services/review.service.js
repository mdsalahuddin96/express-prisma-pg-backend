"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getAllReview = exports.createReview = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createReview = async (reviewData) => {
    try {
        const newReview = await prisma_1.default.review.create({
            data: reviewData,
        });
        return newReview;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.createReview = createReview;
const getAllReview = async () => {
    try {
        const reviews = await prisma_1.default.review.findMany();
        return reviews;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getAllReview = getAllReview;
const updateReview = async (newData, id) => {
    try {
        const updatedReview = await prisma_1.default.review.update({
            where: {
                id: id?.toString(),
            },
            data: newData,
        });
        return updatedReview;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.updateReview = updateReview;
const deleteReview = async (id) => {
    try {
        const deletedReview = await prisma_1.default.review.update({
            where: {
                id: id?.toString(),
            },
            data: {
                deletedAt: new Date(),
            },
        });
        return deletedReview;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.deleteReview = deleteReview;
