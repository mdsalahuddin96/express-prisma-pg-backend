import { Router } from "express";
import { bookingCreate, bookingDelete, bookingGetById, bookingUpdate } from "../controllers/booking.controller";



const route=Router()
route.post("/create",bookingCreate)
route.get("/",bookingGetById)
route.patch("/update",bookingUpdate)
route.delete("/delete",bookingDelete)
export default route