import { Router } from "express";

import { createBooking, deleteBooking, getBookingByUserId, updateBooking } from "../services/booking.service";

const route=Router()
route.post("/create",createBooking)
route.get("/",getBookingByUserId)
route.patch("/update",updateBooking)
route.delete("/delete",deleteBooking)
export default route