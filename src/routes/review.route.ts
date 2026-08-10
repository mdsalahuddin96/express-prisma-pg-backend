import { Router } from "express";
import { createReview, deleteReview, getAllReview, updateReview } from "../services/review.service";

const route=Router()

route.post("/create",createReview)
route.get("/",getAllReview)
route.patch("/update",updateReview)
route.delete("/delete",deleteReview)
export default route;