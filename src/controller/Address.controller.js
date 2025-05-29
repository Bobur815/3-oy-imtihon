import addressService from "../service/Address.service.js"
import CustomError from "../utils/CustomError.js"
import { Validators } from "../utils/Joi.validation.js"

class AddressController{
    
    async add(req,res,next){
        try {
            const {error, value} = Validators.addressSchema.validate(req.body)
            if(error){
                throw new CustomError("Address name is invalid", 400, "ValidationError")
            }

            const result = await addressService.addAddress(req.body)
            res.status(201).json({
                status: true,
                message:result
            })

        } catch (error) {
            next(error)
        }
    }

    async getAll(req,res,next){
        try {
            const allAddresses = await addressService.getAlladdresses()
            res.status(200).json({
                success:true,
                message:"success",
                data: allAddresses
            })

        } catch (error) {
            next(error)
        }
    }

    async update(req,res,next){
        try {
            const {error,value} = Validators.addressSchema.validate(req.body)
            if(error) throw error

            const updatedAddresse = await addressService.updateAddress(req.body,req.params.address_id)
            res.status(202).json({
                success:true,
                message:"success",
                data: updatedAddresse
            })
        } catch (error) {
            next(error)
        }
    }

    async delete(req,res,next){
        try {
            const result = await addressService.deleteAddress(req.params.address_id)
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

let addressController = new AddressController()
export default addressController