import jwt from "jsonwebtoken"

export default {
    sign: (payload) => 
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_ACCESS_EXPIRE }
        ),
    verify: (token) => 
        jwt.verify(token,process.env.JWT_SECRET_KEY)
}