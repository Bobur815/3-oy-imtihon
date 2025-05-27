import { Router } from "express";
import staffController from "../controller/Staff.controller.js";
 
const staffRouter = Router()

staffRouter
    .get("/all",staffController.getAll)
    .get("/single/:staff_id",staffController.getById)
    .post("/register", staffController.registerStaff)
    .post("/login", staffController.loginStaff)
    .put("/update", staffController.updateStaff)
    .delete("/delete", staffController.deleteStaff)

export default staffRouter