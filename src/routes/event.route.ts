import { Router } from "express";
import { createEvent, deleteEvent, getAllEvent, updateEvent } from "../services/event.service";

const route=Router()

route.post("/create",createEvent)
route.get("/",getAllEvent)
route.patch("/update",updateEvent)
route.delete("/delete",deleteEvent)
export default route