import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../services/category.service";

const route=Router()

route.post("/create",createCategory)
route.get("/",getAllCategory)
route.patch("/update",updateCategory)
route.delete("/delete",deleteCategory)
export default route