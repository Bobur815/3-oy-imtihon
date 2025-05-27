import { Schema, model } from "mongoose";

const transportSchema = new Schema({
    modelName: {type: String, required:true, unique: true},
    branch_id: {type: Schema.Types.ObjectId, required:true},
    color: {type: String, required:true},
    img: {type: String, default: null},
    price: {type: Number, required:true}
}, {timestamps: true})

export default model("Transport", transportSchema)