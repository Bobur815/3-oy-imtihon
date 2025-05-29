import PermissionsModel from "../models/Permissions.model.js";
import CustomError from "../utils/CustomError.js";

class PermissionService{
    constructor(){}

    async getAllPermission(){
        const permissions = await PermissionsModel.find()
        return permissions
    }

    async getById(permission_id){
        const permission = await PermissionsModel.findOne({_id:permission_id})
        if(!permission){
            throw new CustomError("Permission not found", 404, "NotFoundError")
        }
        
        return permission
    }

    async getByQuery(query){
        let queryNames = ["permissionModel","staff_id"]
        let getQuery = {}

        for (let key of queryNames){
            if(query[key]){
                getQuery[key]=query[key]
            }
        }

        const permission = await PermissionsModel.findOne(getQuery)
        if(!permission){
            throw new CustomError("Permission not found", 404, "NotFoundError")
        }
        
        return permission
    }

    async addPermission(data){
        const oldPermission = await PermissionsModel.findOne({staff_id:data.staff_id,permissionModel:data.permissionModel})
        if(oldPermission){
            throw new CustomError("Permission name exists",400, "PermissionExistsError")
        }
        await PermissionsModel.create(data)
        return "Permission successfully added"
    }

    async updatePermission(data,permission_id){
        const oldPermission = await PermissionsModel.findById(permission_id)
        if(!oldPermission){
            throw new CustomError("Permission not found", 404, "NotFoundError")
        }

        const result = await PermissionsModel.findByIdAndUpdate(permission_id, data, {new:true})
        return result
    }
    async deletePermission(permission_id){
        const result = await PermissionsModel.findByIdAndDelete(permission_id)
        if(!result){
            throw new CustomError("Permission not found", 404, "NotFoundError")
        }

        return "Permission successfully deleted"
    }
}

let permissionService = new PermissionService()
export default permissionService