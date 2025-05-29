
import fs from "fs";
import transportsModel from "../models/Transports.model.js";
import CustomError from "../utils/CustomError.js";
import path from "path"

class TransportService {
    constructor(){}

    async getAllTransports(user){
        let transportData;

        // staff bo'lsa faqat o'zining branchidagi transportlar ko'rsatiladi
        if(user.role === "SuperAdmin"){
            transportData = await transportsModel.find().populate("branch_id","name")
        } else{
            transportData = await transportsModel.find({branch_id:user.branch_id})
        }
        return transportData
    }

    async getTransportById(transport_id){
        const transport = await transportsModel.findById(transport_id).populate("branch_id","name")
        if(!transport){
            throw new CustomError("Transport not found", 404, "NotFoundError")
        }
        return transport
    }

    async getTransportByQuery(query){
        let queryNames = ["_id","modelName","color","price","branch_id"]
        let getQuery = {}

        for (let key of queryNames){
            if(query[key]){
                getQuery[key]=query[key]
            }
        }

        const transport = await transportsModel.find(getQuery).populate("branch_id","name")
        if(!transport){
            throw new CustomError("Transport not found", 404, "NotFoundError")
        }
        
        return transport
    }

    async createTransport(data,img){
        const oldtransport = await transportsModel.findOne({modelName:data.modelName})
        
        // shu transport nomi huddi shu branchda mavjud bo'lsa xato chiqarish
        if(oldtransport && oldtransport.branch_id === data.branch_id){
            throw new CustomError("transport with this modelName exists",400,"modelNameExists")
        }

        const fileName = new Date().getTime() + "." + img.name;
        img.mv(path.join(process.cwd(),'src', 'uploads',fileName), error =>{
            if(error) throw error
        })
        data.img = fileName;

        const newTransport = await transportsModel.create(data)
        
        return newTransport
    }

    async updateTransport(data,img,transport_id){

        const transport = await transportsModel.findById(transport_id);
        if(!transport){
            throw new CustomError("transport not found",404,"NotFoundError")
        }
        if (img) {
            const oldFilename = transport.img;
        
            // Faqat eski rasm nomi bo'lsa o'chiramiz
            if (oldFilename) {
                const oldPath = path.join(process.cwd(), "src", "uploads", oldFilename);
                try {
                    await fs.promises.unlink(oldPath);
                } catch (err) {
                    // Fayl mavjud bo'lmasa
                    console.error("Error deleting old image:", err.message);
                }
            }
        
            const fileName = new Date().getTime() + "." + img.name;
        
            const uploadPath = path.join(process.cwd(), 'src', 'uploads', fileName);
        
            await img.mv(uploadPath, (error) => {
                if (error) throw error;
            });
        
            data.img = fileName;
        }

        // Shu modelName boshqa transportga berilganligini tekshirish:
        const existing = await transportsModel.findOne({ modelName: data.modelName });
        if (existing && existing._id.toString() !== transport_id) {
            throw new CustomError("Transport with this modelName already exists", 400, "ModelNameExists");
        }

        const updatedTransport = await transportsModel.findByIdAndUpdate(transport_id, data, {new: true});

        return updatedTransport;
    }

    async deleteTransport(transport_id){
        const result = await transportsModel.findByIdAndDelete(transport_id)
        if(!result){
            throw new CustomError("transport not found",404,"NotFoundError")
        }
        return "transport successfully deleted" 
    }
}

const transportService = new TransportService()

export default transportService