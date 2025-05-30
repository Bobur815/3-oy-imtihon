
import StaffsModel from "../models/Staffs.model.js";
import CustomError from "../utils/CustomError.js";
import jwt from "../utils/jwt.js";
import bcrypt from "bcrypt"
import permissionService from "./Permission.service.js";
import PermissionsModel from "../models/Permissions.model.js";

class StaffService {
    constructor(){}

    // Token generatsiya qilish:
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

        // Query elementlarini obyektga saqlash:
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

    async createStaff(data) {
        // Username bor-yo'qligini tekshirish
        const oldStaff = await StaffsModel.findOne({ username: data.username });
        if (oldStaff) {
            throw new CustomError(`Staff with this username "${data.username}" already exists`, 400, "UsernameExists");
        }
    
        // ✅ Superadmin roli sistemada faqat bitta bo'lishini ta'minlash
        if (data.role === "SuperAdmin") {
            const existingSuperAdmin = await StaffsModel.findOne({ role: "SuperAdmin" });
            if (existingSuperAdmin) {
                throw new CustomError("There can only be one SuperAdmin in the system", 400, "SuperAdminExists");
            }
        }
    
        // password hashlash
        data.password = await bcrypt.hash(data.password, 10);
    
        // Yangi staff yaratish
        const newStaff = await StaffsModel.create(data);
    
        // ✅ Staffga oddiy permissionlarni avtomatik berish
        if (newStaff.role !== "SuperAdmin") {
            const autoPermission = {
                staff_id: newStaff._id,
                permissionModel: "staff",
                read: true,
                update: true
            };
            await permissionService.addPermission(autoPermission);
        }
    
        // Token yaratish va qaytarish
        const { token } = this.generateToken({
            _id: newStaff._id,
            username: newStaff.username
        });
    
        return token;
    }
    

    async loginStaff(data){
        // Username bor-yo'qligini tekshirish
        const user = await StaffsModel.findOne({username:data.username})
        if(!user){
            throw new CustomError("Staff not found", 404, "NotFoundError")
        }

        // Passwordi to'g'riligini tekshirish
        const isMatch = bcrypt.compare(data.password,user.password)
        if(!isMatch){
            throw new CustomError("Incorrect password",401,"ValidationError")
        }

        // Token yaratish va qaytarish
        const {token} = this.generateToken({_id:user._id,username:data.username})
        return token
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
        
        // Staffning roli adminga o'zgarsa avtomatik transport va staff uchun permissionlar qo'shish
        if(updatedStaff.role === "admin"){
            const transportPermission = {
                staff_id: updatedStaff._id,
                permissionModel:"transport",
                read:true,
                update:true,
                write:true,
                delete:true
            }
            // Transport uchun permission bor-yoqligini tekshirish
            const existingTransportP = await PermissionsModel.findOne({
                staff_id:updatedStaff._id,
                permissionModel: "transport"
                })

            //Permission bo'lsa o'zgartirish, bo'lmasa qo'shish
            if (existingTransportP) {
                await permissionService.updatePermission(transportPermission, existingTransportP._id);
            } else {
                await permissionService.addPermission(transportPermission);
            }

            // Staff permission uchun ham shunday qilish
            const staffPermission = {
                staff_id: updatedStaff._id,
                permissionModel:"staff",
                read:true,
                update:true,
                write:true,
                delete:true
            }
            
            const permission = await PermissionsModel.findOne({staff_id:updatedStaff._id,permissionModel:"staff"})
            if(permission){
                await permissionService.updatePermission(staffPermission,permission._id)
            }
        }

        // Staffning roli staffga o'zgarsa avtomatik tarzda transport permissionlarni o'chirish va staff permissionni o'zgartirish
        else if(updatedStaff.role === 'staff'){
            const permission = await PermissionsModel.findOne({
                staff_id:updatedStaff._id,
                permissionModel:"transport"
            })

            if(permission) {
                await permissionService.deletePermission(permission._id)
            }

            const existingStaffPerm = await PermissionsModel.findOne({
                staff_id: updatedStaff._id,
                permissionModel: "staff"
            });
    
            if (existingStaffPerm) {
                const staffPermission = {
                    staff_id: updatedStaff._id,
                    permissionModel: "staff",
                    write: false,
                    delete: false
                };
                await permissionService.updatePermission(staffPermission, existingStaffPerm._id);
            }
        }
        return updatedStaff;
    }

    async deleteStaff(staff_id) {
        const staff = await StaffsModel.findById(staff_id);
    
        if (!staff) {
            throw new CustomError("Staff not found", 404, "NotFoundError");
        }
    
        if (staff.role === 'SuperAdmin') {
            throw new CustomError("SuperAdmin cannot be deleted", 400, "DeletionError");
        }
    
        await StaffsModel.findByIdAndDelete(staff_id);
    
        return "Staff successfully deleted";
    }
    
}

const staffService = new StaffService()

export default staffService