import PermissionsModel from "../models/Permissions.model.js"
import StaffsModel from "../models/Staffs.model.js"
import CustomError from "../utils/CustomError.js"

export default  async (req,res,next) => {
    try {
        const userRole = req.user.role
        if(userRole === "SuperAdmin"){
            next()
            return
        }

        const methods = {
            GET:'read',
            PUT:'update',
            POST:'write',
            DELETE: 'delete'
        }

        const method = methods[req.method]
        if (!method) {
            throw new CustomError(`Unsupported method ${req.method}`, 400, "BadRequestError");
        }

        const permissionModel = req.originalUrl.split('/')[2]
        console.log(req.user._id);

        const permissionStaff = await PermissionsModel.findOne({staff_id:req.user._id, permissionModel})
        if(!permissionStaff || !permissionStaff[method]){
            throw new CustomError(`Permission denied to ${method} ${permissionModel}`, 403, "PermissionError")
        }

        // Roli Admin bo'lsa yoki permissionModel staff bo'lmasa ruxsat berilsin 
        if(userRole === "admin" || permissionModel != "staff"){

            // Admin o'zining branchidagi stafflarnigina o'zgartira olishi mumkin
            if((req.method === "PUT" || req.method === "DELETE") && permissionModel == "staff"){

                const updatingUser = await StaffsModel.findById(req.params.staff_id)
                if(req.user.branch_id.toString() !== updatingUser.branch_id.toString()){
                    throw new CustomError(`Permission denied to ${method} ${permissionModel} in other branch`, 403, "PermissionError")
                }
            }
            return next()
        }

        if(req.method==="POST"){

            // permissionModel staff bo'lsa faqat o'zinikini o'zgratirishga ruxsat berish 
            if(req.user._id.toString() !== req.body._id.toString()){
                throw new CustomError(`Permission denied to ${method} other ${permissionModel}`, 403, "PermissionError")
            }

            // staff o'zini branch_idsini va rolini o'zgartirolmaydi
            if(req.body.branch_id || req.body.role){
                throw new CustomError(`Permission denied to ${method} branch_id or role`, 403, "PermissionError")
            }

        } else if(req.method==="GET"){

            if(req.originalUrl.split('/').at(-1) === "all"){
                return next()
            }
    
            // Query orqali faqat _id yoki username berishi mumkin
            const staffValue = req.params.staff_id || req.query._id || req.query.username; 
            const reqUserKey = req.user[Object.keys(req.query)[0]]
    
            // queryga id va usernamedan boshqa key bo'yicha qidirishga berilganda xato chiqarish
            if(!reqUserKey){
                throw new CustomError(`Staff can only search by id or username`, 403, "PermissionError")
            }
            
            // Staff boshqa staffni ma'lumotlarini ko'rolmaydi
            if(!staffValue || reqUserKey.toString() !== staffValue.toString()){
                throw new CustomError(`Permission denied to ${method} other ${permissionModel}`, 403, "PermissionError")
            }
        }

        return next()
    } catch (error) {
        next(error)
    }
}

