import  jwt  from 'jsonwebtoken';
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt  from "bcrypt"



export const signUp = async(req:Request, res:Response)=>{
    try {
        const data = req.body;
        if(data == null) return;
        const saltRound = 10;
        const password = bcrypt.hashSync(data.password, saltRound);
        const createUser = await prisma.user.create({
            data:{
                email:data.email,
                password:password,
                name:data.name
            }
        })
        if(!createUser.id){
            res.status(500).json({
                message:"Failed to create User",
                success:false
            })
            return;
        }
        res.status(200).json({
            success:true,
            message:"User created Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            success:false
        })
        return;
    }
}

export const login = async(req:Request, res:Response)=>{
        try {
            const data = req.body;
            if(data == null) {
                res.status(404).json({
                    success:false,
                    message:"Data not found"
                })
                return;
            }
            const findUser = await prisma.user.findFirst({
                where:{
                    email:data.email
                }
            })

            if(findUser == null ){
                res.status(404).json({
                    success:false,
                    message:"User not found"
                })
                return;
            }

            const verifyPassword = bcrypt.compare(data.password, findUser?.password)
            if(!verifyPassword) {
                res.status(401).json({
                    success:false,
                    message:"Password isnt valid"
                })
                return;
            }
           const token =  jwt.sign({id:findUser.id}, process.env.JWT_SECRET as string , {expiresIn:'5h'})
            res.status(200).json({
                success:true,
                message:"Logged in successfully",
                token:token
            }) 
            return 

        } catch (error) {
            res.status(500).json({
                success:false,
                message:"Something went wrong"
            })
            return;
        }

}

export const verifyUser = async(req:Request, res:Response)=>{
    try {
         res.status(200).json({
            success:true,
            message:"Token is valid"
        })
        return
    } catch (error) {
        const err = (error as Error).message
        res.status(500).json({
            success:false,
            message:"Token Invalid"
        })
    }
}