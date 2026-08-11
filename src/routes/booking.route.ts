import { Router } from "express";
import { bookingCreate, bookingDelete, bookingGetById, bookingUpdate } from "../controllers/booking.controller";
import { authenticate } from "../middlewares/auth.middleware";



const route=Router()
route.post("/create",authenticate, bookingCreate)
route.get("/",authenticate,bookingGetById)
route.patch("/update",authenticate,bookingUpdate)
route.delete("/delete",authenticate,bookingDelete)
export default route