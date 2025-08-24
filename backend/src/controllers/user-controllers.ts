import { Request, Response, NextFunction } from "express";
import User from "../models/user.js"
import { hash, compare} from 'bcrypt'
import { createToken } from "../utils/token-manager.js";


export const getAllUsers = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        //get all users
        const users = await User.find();
        return res.status(201).json({message:"OK",users});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR",cause : error.message});
    }
}

export const userSignup = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        //user signup
        const{name, email, password}= req.body;
        const existinguser =await User.findOne({email})
        if(existinguser) return res.status(401).send("User already registered")
        const hashedpassword=await hash(password,10);
        const user =new User({name,email,password: hashedpassword});
        await user.save();

        //create token and store cookie
        res.clearCookie("auth_token",{
            httpOnly: true,
            domain:"localhost",
            signed : true,
            path:"/"
        });
        const token =createToken(user._id.toString(),user.email,"7d")
        const expires=new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie("auth_token",token,{
            path:"/",
            domain:"localhost",
            expires,
            httpOnly:true,
            signed:true,
        });

        return res.status(201).json({message:"OK",name:user.name,email : user.email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR",cause : error.message});
    }
}

export const userLogin = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        //user login
        const{email, password}= req.body;
        const user =await User.findOne({email})
        if(!user){
            return res.status(401).send("User not found");
        }
        const ispasswordcorrect =await compare(password,user.password);
        if(!ispasswordcorrect){
            return res.status(403).send("Incorrect Password");
        }

        res.clearCookie("auth_token",{
            httpOnly: true,
            domain:"localhost",
            signed : true,
            path:"/"
        });
        const token =createToken(user._id.toString(),user.email,"7d")
        const expires=new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie("auth_token",token,{
            path:"/",
            domain:"localhost",
            expires,
            httpOnly:true,
            signed:true,
        });

        return res.status(200).json({message:"OK",name:user.name,email : user.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR",cause : error.message});
    }
};

export const verifyUser = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        //user token check
        
        const user =await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned");
        }
        console.log(user._id.toString(),res.locals.jwtData.id);

        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didnt match");
        }


        return res.status(200).json({message:"OK",name:user.name,email : user.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR",cause : error.message});
    }
};

export const userLogout = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        //user token check
        
        const user =await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered or token malfunctioned");
        }
        console.log(user._id.toString(),res.locals.jwtData.id);

        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didnt match");
        }

        res.clearCookie("auth_token",{
            httpOnly: true,
            domain:"localhost",
            signed : true,
            path:"/"
        });

        return res.status(200).json({message:"OK",name:user.name,email : user.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR",cause : error.message});
    }
};