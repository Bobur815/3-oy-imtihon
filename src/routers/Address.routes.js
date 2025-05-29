import { Router } from "express";
import addressController from "../controller/Address.controller.js";
import checktoken from "../middleware/checktoken.js";
import permission from "../middleware/Permission.js";


const addressRouter = Router()

addressRouter
    .get("/all", checktoken, permission, addressController.getAll)
    .post("/add", checktoken, permission, addressController.add)
    .put("/update/:address_id", checktoken, permission, addressController.update)
    .delete("/delete/:address_id", checktoken, permission, addressController.delete)

export default addressRouter