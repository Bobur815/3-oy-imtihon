import StaffsModel from "../models/Staffs.model.js";
import CustomError from "../utils/CustomError.js";
import jwt from "../utils/jwt.js";

export default async (req,res,next) => {
    try {
        
        const token = req.headers.token || req.headers.authorization.split(" ")[1]

        if (!token) {
            throw new CustomError("Token is required!",404, "NotFoundError");
        }

        const {username} = jwt.verify(token)
        const user = await StaffsModel.findOne({username})
    
        if (!user || !user.username) {
            throw new CustomError("Staff not found",404, "NotFoundError");
        }

        req.user = user;
        next()
    } catch (error) {
        if (error.name == "JsonWebTokenError" || error.name == "TokenExpiredError") {
            return next(new CustomError(`${error.message}`,401,`${error.name}`));
        }
        next(error)
    }
}

