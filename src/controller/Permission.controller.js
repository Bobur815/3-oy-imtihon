import permissionService from "../service/Permission.service.js"
import CustomError from "../utils/CustomError.js"
import { Validators } from "../utils/Joi.validation.js"

class PermissionController{
    constructor(){}

    async getAll(req,res,next){
        try {
            const result = await permissionService.getAllPermission()
            res.status(200).json({
                status:true,
                message: result
            })
        } catch (error) {
            next(error)
        }
    }

    async getById(req,res,next){
        try {
            const result = await permissionService.getById(req.params.permission_id)
            res.status(200).json({
                status:true,
                message: result
            })
        } catch (error) {
            next(error)
        }
    }

    async getByQueryParam(req,res,next){
        try {

            //
            if (!Object.keys(req.query).length) {
                throw new CustomError("At least one query is required", 400, "TypeError")
            }
            const result = await permissionService.getByQuery(req.query)
            res.status(201).json({
                status: true,
                message: result
            })
        } catch (error) {
            next(error)
        }
    }

    async add(req,res,next){
        try {
            const {error, value} = await Validators.permissionSchema.validate(req.body)
            if(error) throw error

            const result = await permissionService.addPermission(req.body)
            res.status(201).json({
                status:true,
                message: result
            })
        } catch (error) {
            next(error)
        }
    }

    async update(req,res,next){
        try {
            const {error, value} = await Validators.permissionSchema.validate(req.body)
            if(error){
                throw error
            }

            const result = await permissionService.updatePermission(req.body, req.params.permission_id)
            res.status(201).json({
                status:true,
                message: result
            })
        } catch (error) {
            next(error)
        }
    }

    async delete(req,res,next){
        try {
            const result = await permissionService.deletePermission(req.params.permission_id)
            res.status(200).json({
                success:true,
                message:"success",
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}

let permissionController = new PermissionController()
export default permissionController