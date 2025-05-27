
import { Schema, model } from "mongoose";

const addressSchema = new Schema({
    name: {type: String, required:true}
})
export default model("Address", addressSchema)