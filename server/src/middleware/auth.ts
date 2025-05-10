import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";


export const auth = async(req:Request, res:Response, next:NextFunction) =>{

    try {
        const bearerToken = req.headers.authorization
        if(!bearerToken || !bearerToken.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: "Failed to get token"
            });
            return;
        }

        const token = bearerToken.split(' ');

        if(!token || token[1] == undefined){
            res.status(404).json({
                success:false,
                message:"Failed to get token"
            })
            return;
        }

        const authToken = token[1];
        const decoededToken = jwt.verify(authToken, process.env.JWT_SECRET as string) as JwtPayload

        if(!decoededToken || !decoededToken.id) {
            res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
            return;
        }

        req.id = decoededToken.id;
        next();

    } catch (error) {
        const err = (error as Error).message
        res.status(500).json({
            success:false,
            message:err || "Something went wrong" 
        })
        return;
    }
}