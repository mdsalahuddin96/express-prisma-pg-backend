import { Router } from "express";
import { createUser } from "../services/user.service";
const route=Router()

route.post("/create",createUser)

export default route;