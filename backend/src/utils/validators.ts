import { body, ValidationChain, validationResult } from "express-validator";
import { Request,Response,NextFunction } from "express";

export const validate=(validations: ValidationChain[])=>{
    return async(req:Request,res:Response,next:NextFunction)=> {
        for(let validation of validations) {
            const result=await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        return res.status(442).json({errors:errors.array()});
    }
}

export const loginvalidator= [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min:6}).withMessage("Password should atleast contain 6 characters"),
]; 

export const signupvalidator= [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min:6}).withMessage("Password should atleast contain 6 characters"),
]; 

export const ChatCompletionValidator= [
    body("message").notEmpty().withMessage("message is required"),
]; 