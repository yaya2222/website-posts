import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user"

interface SignUpBody{
userName?:string,
email?:string,
password?:string
}

export const signUp:RequestHandler<unknown,unknown,SignUpBody,unknown>=async(req,res,next)=>{
    const {userName,email,password} = req.body
try {
if(!userName||!password||!email){
    throw createHttpError(400,"Parameters missing")
}    

const exsitingUsername = await UserModel.findOne({userName}).exec()
if(exsitingUsername){
    throw createHttpError(409,"Username already taken. Plase choose a different or log in instead.")
}
const exsitingEmail = await UserModel.findOne({email}).exec()
if(exsitingEmail){
    throw createHttpError(409,"Email already taken. Plase choose a different or log in instead.")
}
} catch (error) {
    next(error)
}
}