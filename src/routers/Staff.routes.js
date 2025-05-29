import { Router } from "express";
import staffController from "../controller/Staff.controller.js";
import checktoken from "../middleware/checktoken.js";
import permission from "../middleware/Permission.js";
 
const staffRouter = Router()

staffRouter
    .get("/all", checktoken, permission, staffController.getAll)
    .get("/single/:staff_id", checktoken, permission, staffController.getById)
    .get("/query", checktoken, permission, staffController.getByQuery)
    .post("/register", staffController.registerStaff)
    .post("/login", staffController.loginStaff)
    .put("/update/:staff_id", checktoken, permission, staffController.updateStaff)
    .delete("/delete/:staff_id", checktoken, permission, staffController.deleteStaff)

export default staffRouter