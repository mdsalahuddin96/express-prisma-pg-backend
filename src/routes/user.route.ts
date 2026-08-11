import { Router } from "express";
import { get, update, userDelete } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const route=Router()


route.get("/",authenticate,get)
route.patch("/update/:id",authenticate,update)
route.delete("/delete/:id",authenticate,userDelete)
export default route;