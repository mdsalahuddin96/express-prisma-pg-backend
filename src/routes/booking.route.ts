import { Router } from "express";

import { createBooking, getBookingByUserId, updateBooking } from "../services/booking.service";

const route=Router()
route.post("/create",createBooking)
route.get("/",getBookingByUserId)
route.patch("/update",updateBooking)
export default route