import { Router } from "express";
import { reviewCreate, reviewDelete, reviewGet, reviewUpdate } from "../controllers/review.controller";

const route=Router()

route.post("/create",reviewCreate)
route.get("/",reviewGet)
route.patch("/update",reviewUpdate)
route.delete("/delete",reviewDelete)
export default route;