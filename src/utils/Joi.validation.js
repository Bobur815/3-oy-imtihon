
import JOI from "joi"

export class Validators{
    constructor(){}

    static registerSchema = JOI.object({
        branch_id: JOI.alternatives().conditional("role", {
            is: "SuperAdmin",
            then: JOI.forbidden(),
            otherwise: JOI.string().required()
        }),
        username: JOI.string().min(3).required(),
        password: JOI.string().min(5).max(16).required(),
        confirmPassword: JOI.any().valid(JOI.ref("password"))
            .messages({ "any.only": "Passwords do not match" }),
        birthDate: JOI.string().required(),
        gender: JOI.string().valid("Male", "Female").required(),
        role: JOI.string().valid("staff", "admin", "SuperAdmin")
    });
    

    static loginSchema = JOI.object({
        username: JOI.string().required(),
        password: JOI.string().min(5).max(16).required(),
    })

    static branchSchema = JOI.object({
        name: JOI.string().required(),
        address_id: JOI.string().required()
    })

    static addressSchema = JOI.object({
        name: JOI.string().required()
    })

    static permissionSchema = JOI.object({
        staff_id: JOI.string().required(),
        permissionModel: JOI.string().valid("staff","transport","permission","branch","address").required(),
        read: JOI.boolean().default(false),
        write: JOI.boolean().default(false),
        update: JOI.boolean().default(false),
        delete: JOI.boolean().default(false),
    })

    static transportSchema = JOI.object({
        modelName: JOI.string().min(2).max(30).required(),
        branch_id: JOI.string().required(),
        color: JOI.string().required(),
        img: JOI.string().default(null),
        price: JOI.number().required()
    })
}