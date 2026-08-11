import { Router } from "express";
import { eventCreate, eventDelete, eventGet, eventUpdate } from "../controllers/event.controller";
import { authenticate } from "../middlewares/auth.middleware";


const route=Router()

route.post("/create",authenticate,eventCreate)
route.get("/",eventGet)
route.patch("/update",authenticate,eventUpdate)
route.delete("/delete",authenticate,eventDelete)
export default route