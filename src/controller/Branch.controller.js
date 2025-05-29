import branchService from "../service/Branch.service.js"
import { Validators } from "../utils/Joi.validation.js"

class BranchController{
    constructor(){}

    async getAll(req,res,next){
        try {
            const allBranches = await branchService.getAllBranches()
            res.status(200).json({
                success:true,
                message:"success",
                data: allBranches
            })

        } catch (error) {
            next(error)
        }
    }

    async getByName(req,res,next){
        try {

            const branch = await branchService.getByName(req.query)
            res.status(200).json({
                success:true,
                message:"success",
                data: branch
            })
        } catch (error) {
            next(error)
        }
    }

    async getById(req,res,next){
        try {
            const branch = await branchService.getById(req.params.branch_id)
            res.status(200).json({
                success:true,
                message:"success",
                data: branch
            })
        } catch (error) {
            next(error)
        }
    }

    async create(req,res,next){
        try {
            const {error,value} = Validators.branchSchema.validate(req.body)
            if(error) throw error

            const newBranch = await branchService.createBranch(req.body)
            res.status(201).json({
                success:true,
                message:"success",
                data: newBranch
            })
        } catch (error) {
            next(error)
        }
    }

    async update(req,res,next){
        try {
            const {error,value} = Validators.branchSchema.validate(req.body)
            if(error) throw error

            const updatedBranch = await branchService.updateBranch(req.body,req.params.branch_id)
            res.status(202).json({
                success:true,
                message:"success",
                data: updatedBranch
            })
        } catch (error) {
            next(error)
        }
    }

    async delete(req,res,next){
        try {
            const result = await branchService.deleteBranch(req.params.branch_id)
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

let branchController = new BranchController()
export default branchController