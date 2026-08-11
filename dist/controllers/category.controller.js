"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryDelete = exports.categoryUpdate = exports.categoryGet = exports.categoryCreate = void 0;
const category_service_1 = require("../services/category.service");
const categoryCreate = async (req, res) => {
    const eventData = req.body;
    try {
        const newEvent = await (0, category_service_1.createCategory)(eventData);
        res.status(200).json({
            success: true,
            message: "New Category Created Successfully",
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
exports.categoryCreate = categoryCreate;
const categoryGet = async (req, res) => {
    try {
        const allCategory = await (0, category_service_1.getAllCategory)();
        res.status(200).json({
            success: true,
            message: "Get All Categories Successfully",
            data: allCategory,
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
exports.categoryGet = categoryGet;
const categoryUpdate = async (req, res) => {
    const newData = req.body;
    const id = req.params.id;
    try {
        const updatedEvent = await (0, category_service_1.updateCategory)(newData, id?.toString() || "");
        res.status(200).json({
            success: true,
            message: "Category Updated Successfully",
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
exports.categoryUpdate = categoryUpdate;
const categoryDelete = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedEvent = await (0, category_service_1.deleteCategory)(id?.toString() || "");
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
            data: deletedEvent
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
exports.categoryDelete = categoryDelete;
