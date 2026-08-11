"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewDelete = exports.reviewUpdate = exports.reviewGet = exports.reviewCreate = void 0;
const review_service_1 = require("../services/review.service");
const reviewCreate = async (req, res) => {
    const reviewData = req.body;
    try {
        const newReview = await (0, review_service_1.createReview)(reviewData);
        res.status(200).json({
            success: true,
            message: "New Review Created Successfully",
            data: newReview,
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
exports.reviewCreate = reviewCreate;
const reviewGet = async (req, res) => {
    try {
        const reviews = await (0, review_service_1.getAllReview)();
        res.status(200).json({
            success: true,
            message: "Successfully get all reviews",
            data: reviews,
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
exports.reviewGet = reviewGet;
const reviewUpdate = async (req, res) => {
    const newData = req.body;
    const id = req.query.id;
    try {
        const updatedReview = await (0, review_service_1.updateReview)(newData, id?.toString() || "");
        res.status(200).json({
            success: true,
            message: "Review Updated Successfully",
            data: updatedReview,
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
exports.reviewUpdate = reviewUpdate;
const reviewDelete = async (req, res) => {
    const id = req.query.id;
    try {
        const deletedReview = await (0, review_service_1.deleteReview)(id?.toString() || "");
        res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
            data: deletedReview
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
exports.reviewDelete = reviewDelete;
