import { Router } from "express";
import { createUser, deleteUser, getAllUser, updateUser } from "../services/user.service";
const route=Router()

route.post("/create",createUser)
route.get("/",getAllUser)
route.patch("/update",updateUser)
route.delete("/delete",deleteUser)
export default route;