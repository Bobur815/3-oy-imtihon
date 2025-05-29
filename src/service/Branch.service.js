import BranchesModel from "../models/Branches.model.js";
import CustomError from "../utils/CustomError.js";

class BranchService{
    constructor(){}

    async getAllBranches(){
        const branches = await BranchesModel.find()
        return branches
    }

    async getByName(query){
        let queryNames = ["name","address_id","_id"]
        let getQuery = {}

        for (let key of queryNames){
            if(query[key]){
                getQuery[key]=query[key]
            }
        }
        const branch = await BranchesModel.find(getQuery)
        return branch
    }
    
    async getById(branch_id){
        const branch = await BranchesModel.findOne({_id:branch_id})
        return branch
    }

    async createBranch(data){
        const oldBranch = await BranchesModel.findOne({_id:data._id})
        if(oldBranch){
            throw new CustomError("Branch name exists",400, "BranchExistsError")
        }

        const newBranch = await BranchesModel.create(data)
        return newBranch
    }

    async updateBranch(data,branch_id){
        const oldBranch = await BranchesModel.findById(branch_id)
        if(!oldBranch){
            throw new CustomError("Branch not found",404, "NotFoundError")
        }

        const updatedBranch = await BranchesModel.findByIdAndUpdate(branch_id, data, {new:true})
        return updatedBranch
    }

    async deleteBranch(branch_id){
        await BranchesModel.findByIdAndDelete(branch_id)
        return "Branch successfully deleted"
    }

}

let branchService = new BranchService()
export default branchService