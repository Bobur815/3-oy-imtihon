
import StaffsModel from "../models/Staffs.model.js";
import CustomError from "../utils/CustomError.js";
import jwt from "../utils/jwt.js";
import bcrypt from "bcrypt"
import permissionService from "./Permission.service.js";

class StaffService {
    constructor(){}

    generateToken(data){
        return {
            token: jwt.sign(data)
        }
    }

    async getAllStaff(){
        const staffData = await StaffsModel.find().select("-password")
        return staffData
    }

    async getStaffById(staff_id){
        const staff = await StaffsModel.findById(staff_id).select("-password")
        return staff
    }

    async getStaffByQuery(query){
        let queryNames = ["_id","username","birthDate","gender","role"]
        let getQuery = {}

        for (let key of queryNames){
            if(query[key]){
                getQuery[key]=query[key]
            }
        }
        
        const staff = await StaffsModel.find(getQuery).select("-password")
        return staff
    }

    async createStaff(data){
        const oldStaff = await StaffsModel.findOne({username:data.username})
        if(oldStaff){
            throw new CustomError("Staff with this username exists",400,"UsernameExists")
        }

        const hashedPassword = await bcrypt.hash(data.password,10)
        data.password = hashedPassword

        const newStaff = await StaffsModel.create(data)
        
        if(newStaff.role !== "SuperAdmin"){
            const autoPermission = {
                staff_id: newStaff._id,
                permissionModel:"staff",
                read:true,
                update:true
            }
            await permissionService.addPermission(autoPermission)
        }
        const {token} = this.generateToken({_id:newStaff._id,username:data.username})
        return token
    }

    async loginStaff(data){
        const user = await StaffsModel.findOne({username:data.username})
        if(!user){
            throw new CustomError("Staff not found", 404, "NotFoundError")
        }

        const isMatch = bcrypt.compare(data.password,user.password)
        if(!isMatch){
            throw new CustomError("Incorrect password",401,"ValidationError")
        }

        const {token} = this.generateToken({_id:user._id,username:data.username})
        return token
    }
    
    async deleteStaff(staff_id){
        await StaffsModel.findByIdAndDelete(staff_id)
        return "Staff successfully deleted" 
    }

    async updateStaff(data,staff_id){
        const staff = await StaffsModel.findById(staff_id);
        if(!staff){
            throw new CustomError("Staff not found",404,"NotFoundError")
        }

        if(data.password){
            data.password = await bcrypt.hash(data.password,10)
        }

        const updatedStaff = await StaffsModel.findByIdAndUpdate(staff_id, data, {new: true}).select("-password");

        return updatedStaff;
    }
}

const staffService = new StaffService()

export default staffService