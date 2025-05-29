
import { Schema, model } from "mongoose";

const addressSchema = new Schema({
    name: {type: String, required:true, unique: true}
}, {strict: true})
export default model("Address", addressSchema)