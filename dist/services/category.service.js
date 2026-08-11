"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getAllCategory = exports.createCategory = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createCategory = async (categoryData) => {
    try {
        const newCategory = await prisma_1.default.category.create({ data: categoryData });
        return newCategory;
    }
    catch (error) {
        console.error(error);
        return error;
    }
};
exports.createCategory = createCategory;
const getAllCategory = async () => {
    try {
        const allCategory = await prisma_1.default.category.findMany();
        return allCategory;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.getAllCategory = getAllCategory;
const updateCategory = async (newData, id) => {
    try {
        const updatedCategory = await prisma_1.default.category.update({
            where: {
                id: id?.toString(),
            },
            data: newData,
        });
        return updatedCategory;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (id) => {
    try {
        const deletedCategory = await prisma_1.default.category.update({
            where: {
                id: id?.toString()
            },
            data: {
                deletedAt: new Date()
            },
        });
        return deletedCategory;
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.deleteCategory = deleteCategory;
