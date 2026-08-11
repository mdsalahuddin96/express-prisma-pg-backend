import { Router } from "express";
import { categoryCreate, categoryDelete, categoryGet, categoryUpdate } from "../controllers/category.controller";

const route=Router()

route.post("/create",categoryCreate)
route.get("/",categoryGet)
route.patch("/update/:id",categoryUpdate)
route.delete("/delete/:id",categoryDelete)
export default route