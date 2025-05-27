
import { Schema, model } from "mongoose";

const branchSchema = new Schema({
    name: {type:String, required:true, unique: true},
    address_id: {type: Schema.Types.ObjectId, ref: "Address"}
},{timestamps: true})

export default model("Branch", branchSchema)