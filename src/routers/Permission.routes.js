import { Router } from "express";
import permissionController from "../controller/Permission.controller.js";
import checktoken from "../middleware/checktoken.js";
import permission from "../middleware/Permission.js";

const permissionRouter = Router()

permissionRouter
    .get("/all", checktoken, permission, permissionController.getAll)
    .get("/single/:permission_id", checktoken, permission, permissionController.getById)
    .get("/query", checktoken, permission, permissionController.getByQueryParam)
    .post("/create",checktoken, permission, permissionController.add)
    .put("/update/:permission_id",checktoken, permission, permissionController.update)
    .delete("/delete/:permission_id",checktoken, permission, permissionController.delete)

export default permissionRouter