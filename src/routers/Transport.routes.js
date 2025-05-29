import { Router } from "express";
import transportController from "../controller/Transport.controller.js";
import checktoken from "../middleware/checktoken.js";
import permission from "../middleware/Permission.js";


const transportRouter = Router()

transportRouter
    .get("/all", checktoken, permission, transportController.getAll)
    .get("/query", checktoken, permission, transportController.getByQuery)
    .get("/single/:transport_id", checktoken, permission, transportController.getById)
    .post("/create", checktoken, permission, transportController.create)
    .put("/update/:transport_id", checktoken, permission, transportController.update)
    .delete("/delete/:transport_id", checktoken, permission, transportController.delete)

export default transportRouter