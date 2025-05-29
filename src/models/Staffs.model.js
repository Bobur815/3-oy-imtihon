
import { Schema, model } from "mongoose";

const staffSchema = new Schema({
    username: {type: String, required:true, unique:true},
    branch_id: {type: Schema.Types.ObjectId, default: null, 
        validate: {
            validator: function (value) {
                if(this.role == "SuperAdmin"){
                    return value===null
                }
                else{
                    return value!==null
                }
            }
        }
    },
    password: {type: String, required: true },
    birthDate: {type: String, required: true},
    gender: {type: String, enum:["Male","Female"], required:true},
    role: {type: String, enum:["staff","admin","SuperAdmin"], default:"staff"}
}, {timestamps:true})

export default model("Staff",staffSchema)