import { Router } from "express";
import { eventCreate, eventDelete, eventGet, eventUpdate } from "../controllers/event.controller";


const route=Router()

route.post("/create",eventCreate)
route.get("/",eventGet)
route.patch("/update",eventUpdate)
route.delete("/delete",eventDelete)
export default route