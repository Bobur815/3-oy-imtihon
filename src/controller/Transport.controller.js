import transportService from "../service/Transport.service.js"
import CustomError from "../utils/CustomError.js"
import { Validators } from "../utils/Joi.validation.js"

class TransportController{
    constructor(){}

    async getAll(req,res,next){
        try {
            const allTransports = await transportService.getAllTransports(req.user)
            res.status(200).json({
                success:true,
                message:"success",
                data: allTransports
            })

        } catch (error) {
            next(error)
        }
    }

    async getByQuery(req,res,next){
        try {

            if (!Object.keys(req.query).length) {
                throw new CustomError("At least one query is required", 400, "TypeError")
            }

            const transport = await transportService.getTransportByQuery(req.query,req.user)
            res.status(200).json({
                success:true,
                message:"success",
                data: transport
            })
        } catch (error) {
            next(error)
        }
    }

    async getById(req,res,next){
        try {
            const transport = await transportService.getTransportById(req.params.transport_id,req.user)
            res.status(200).json({
                success:true,
                message:"success",
                data: transport
            })
        } catch (error) {
            next(error)
        }
    }

    async create(req,res,next){
        try {
            const {error,value} = Validators.transportSchema.validate(req.body)
            if(error) throw error

            const newtransport = await transportService.createTransport(req.body,req.files.img)
            res.status(201).json({
                success:true,
                message:"success",
                data: newtransport
            })
        } catch (error) {
            next(error)
        }
    }

    async update(req,res,next){
        try {
            const {error,value} = Validators.transportSchema.validate(req.body)
            if(error) throw error

            const updatedTransport = await transportService.updateTransport(req.body,req.files.img,req.params.transport_id)
            res.status(202).json({
                success:true,
                message:"success",
                data: updatedTransport
            })
        } catch (error) {
            next(error)
        }
    }

    async delete(req,res,next){
        try {
            const result = await transportService.deleteTransport(req.params.transport_id)
            res.status(200).json({
                success:true,
                message:"success",
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}

let transportController = new TransportController()
export default transportController