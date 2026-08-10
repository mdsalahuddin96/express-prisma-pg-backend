import { Router } from "express";
import { get, update, userDelete } from "../controllers/user.controller";

const route=Router()


route.get("/",get)
route.patch("/update",update)
route.delete("/delete",userDelete)
export default route;