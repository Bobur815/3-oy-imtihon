import { Router } from "express";
import branchController from "../controller/Branch.controller.js";
import checktoken from "../middleware/checktoken.js";
import permission from "../middleware/Permission.js";


const branchRouter = Router()

branchRouter
    .get("/all", checktoken, permission, branchController.getAll)
    .get("/byName", checktoken, permission, branchController.getByName)
    .get("/byId/:branch_id", checktoken, permission, branchController.getById)
    .post("/create", checktoken, permission, branchController.create)
    .put("/update/:branch_id", checktoken, permission, branchController.update)
    .delete("/delete/:branch_id", checktoken, permission, branchController.delete)

export default branchRouter