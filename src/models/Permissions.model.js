
import { Schema, model } from "mongoose";

const permissionSchema = new Schema({
    staff_id: {type:Schema.Types.ObjectId, ref:"Staff"},
    permissionModel: {type:String, required:true},
    read: {type:Boolean, default: false},
    write: {type:Boolean, default: false},
    update: {type:Boolean, default: false},
    delete: {type:Boolean, default: false}
}, {timestamps: true})

export default model("Permission", permissionSchema)