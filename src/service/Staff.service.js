
import StaffsModel from "../models/Staffs.model.js";
import CustomError from "../utils/CustomError.js";
import jwt from "../utils/jwt.js";
import bcrypt from "bcrypt"

class StaffService {
    constructor(){}

    static generateToken(data){
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
        const staff = await StaffsModel.find({query}).select("-password")
        return staff
    }

    async createStaff(data){
        const oldStaff = await StaffsModel.findOne({username:data.username})
        if(oldStaff){
            throw new CustomError("Staff with this username exists",400,"UsernameExists")
        }

        const hashedPassword = bcrypt.hash(data.password,10)
        data.password = hashedPassword

        const newStaff = await StaffsModel.create(data)

        const {token} = this.generateToken(data.username)
        return token
    }

    async loginStaff(data){
        const oldUser = await StaffsModel.findOne({username:data.username})
        if(!oldUser){
            throw new CustomError("Staff not found", 404, "NotFoundError")
        }

        const isMatch = bcrypt.compare(data.password,oldUser.password)
        if(!isMatch){
            throw new CustomError("Incorrect password",401,"ValidationError")
        }

        const {token} = this.generateToken(data.username)
        return token
    }
    
    async deleteStaff(staff_id){
        await StaffsModel.findByIdAndDelete(staff_id)
        return "Staff successfully deleted" 
    }

    async updateStaff(data){
        const staff = await StaffsModel.findOne({username:data.username})
        if(!staff){
            throw new CustomError("Staff not found",404,"NotFoundError")
        }

        if(data.password){
            data.password = bcrypt.hash(data.password)
        }

        const updatedStaff = await StaffsModel.findByIdAndUpdate(data._id, data, {new: true});

        return updatedStaff;
    }
}

const staffService = new StaffService()

export default staffService