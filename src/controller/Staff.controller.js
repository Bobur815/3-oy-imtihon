import staffService from "../service/Staff.service.js"
import CustomError from "../utils/CustomError.js"
import { Validators } from "../utils/Joi.validation.js"

class StaffController{
    constructor(){}

    async getAll(req,res,next){
        try {
            const staffs = await staffService.getAllStaff()
            res.status(200).json({
                success:true,
                message:"success",
                data: staffs
            })
            
        } catch (error) {
            next(error)
        }
    }

    async getById(req,res,next){
        try {
            const staff = await staffService.getStaffById(req.params.staff_id)
            res.status(200).json({
                success:true,
                message:"success",
                data: staff
            })

        } catch (error) {
            next(error)
        }
    }

    async getByQuery(req,res,next){
        try {
            const staffs = await staffService.getStaffByQuery(req.query)
            res.status(200).json({
                success:true,
                message:"success",
                data: staffs
            })
        } catch (error) {
            next(error)
        }
    }

    async registerStaff(req,res,next){
        try {
            const {error,value} = Validators.registerSchema.validate(req.body)
            if(error){
                throw error
            }

            const result = await staffService.createStaff(req.body)
            res.status(200).json({
                success:true,
                message:"success",
                token: result
            })
        } catch (error) {
            next(error)
        }
    }

    async loginStaff(req,res,next){
        try {
            const {error,value} = Validators.loginSchema.validate(req.body)
            if(error){
                throw error
            }

            const result = await staffService.loginStaff(req.body);

            res.status(201).json({
                success: true,
                message: "success",
                token: result
            });

        } catch (error) {
            next(error)
        }
    }

    async updateStaff(req,res,next){
        try {
            const result = await staffService.updateStaff(req.body,req.params.staff_id)
            res.status(202).json({
                success: true,
                message: "Staff updated successfully",
                data: result
            });

        } catch (error) {
            next(error)
        }
    }

    async deleteStaff(req,res,next){
        try {
            const result = await staffService.deleteStaff(req.params.staff_id)
            res.status(202).json({
                success: true,
                message: result
            });
        } catch (error) {
            next(error)
        }
    }
}

let staffController = new StaffController()
export default staffController