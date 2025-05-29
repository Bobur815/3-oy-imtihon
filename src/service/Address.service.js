import AddressModel from "../models/Address.model.js";
import CustomError from "../utils/CustomError.js";

class AddressService{
    constructor(){}

    async getAlladdresses(){
        const addresses = await AddressModel.find()
        return addresses
    }

    async addAddress(data){
        await AddressModel.create(data)
        return "Address added successfully"
    }

    async updateAddress(data,address_id){
        const oldAddress = await AddressModel.findById(address_id)
        if(!oldAddress){
            throw new CustomError("address not found",404, "NotFoundError")
        }

        const updatedAddress = await AddressModel.findByIdAndUpdate(address_id, data, {new:true})
        return updatedAddress
    }

    async deleteAddress(address_id){
        await AddressModel.findByIdAndDelete(address_id)
        return "address successfully deleted"
    }
}

let addressService = new AddressService()
export default addressService