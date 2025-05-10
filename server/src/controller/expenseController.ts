
import { Request, Response } from "express";

import { prisma } from "../lib/prisma";

export const  addIncome =  async(req:Request, res:Response)=>{
try {
    const data = req.body;
    const id = req.id

    if(!data || !id) {
        res.status(404).json({
            success:false,
            message:"Data not found"
        })
        return;
    }
    const addIncome =await prisma.income.create({
        data:{
            userId:id,
            amount:parseInt(data.amount),
            category:data.category,
            title:data.title,
            description:data.description,
            date:new Date(data.date)
        }
    })

    if(!addIncome || !addIncome.id){
        res.status(402).json({
            message:"Failed to add Income",
            success:true
        })
        return;
    }

    res.status(200).json({
        success:true,
        message:"Income added Successfully",
        income:addIncome
    })
    return;

} catch (error) {
        const err = (error as Error).message
        res.status(500).json({
            success:false,
            message:err || "Something went wrong"
        })
        return;
}
}

export const addExpense =  async(req:Request, res:Response)=>{
    try {
        const data = req.body;
        const id = req.id
        console.log(data)
        if(!data || !id) {
            res.status(404).json({
                success:false,
                message:"Data not found"
            })
            return;
        }
        const addUserExpense = await prisma.expense.create({
            data:{
                userId:id,
                amount:parseInt(data.amount),
                category:data.category,
                title:data.title,
                description:data.description,
                date:new Date(data.date)
            }
        })
    
        if(!addUserExpense || !addUserExpense.id){
            res.status(402).json({
                message:"Failed to add expense",
                success:true,
            })
            return;
        }
    
        res.status(200).json({
            success:true,
            message:"Income added Successfully",
            expense:addUserExpense
        })
        return;

    } catch (error) {
        console.log(error)
            const err = (error as Error).message
            res.status(500).json({
                success:false,
                message:err || "Something went wrong"
            })
            return;
    }
    }

export const getAllExpense = async(req:Request, res:Response)=>{
    try {
        const userId = req.id
        console.log(userId)
        if(!userId ){
            res.status(404).json({
                success:false,
                message:"Data not found"
            })
            return;
        }

        const getUserAllExpense = await prisma.expense.findMany({
            where:{
                userId:userId
            }
        })
        res.status(200).json({
            success:true,
            message:"Expense sent successfully",
            expenses:getUserAllExpense
        })
        return;
    } catch (error) {
        const err = (error as Error).message
        res.status(500).json({
            success:false,
            message:err || "Something went wrong"
        })
        return;
    }
}

export const getAllIncome = async(req:Request, res:Response)=>{
    try {
        const userId = req.id
        
        if(!userId ){
            res.status(404).json({
                success:false,
                message:"Data not found"
            })
            return;
        }

        const getUserAllIncome = await prisma.income.findMany({
            where:{
                userId:userId
            }
        })
        

        res.status(200).json({
            success:true,
            message:"Income sent successfully",
            income:getUserAllIncome
        })
        return;
    } catch (error) {
        const err = (error as Error).message
        res.status(500).json({
            success:false,
            message:err || "Something went wrong"
        })
        return;
    }
}


export const getIncomebyId = async(req:Request, res:Response)=>{
    try {
        const id = req.params
        console.log(id)
        const userId = req.id

        const getSingleIncome = await prisma.income.findFirst({
            where:{
                id:id
            }
        })

        if(!getSingleIncome || !getSingleIncome.id){
            res.status(404).json({
                success:false,
                message:'Income not found'
            })
            return;
        }

        if(userId !== getSingleIncome.userId){
             res.status(401).json({
                message:"User id isnt valid",
                success:false
            })
            return;
        }

        res.status(200).json({
            success:true,
            message:"Income sent successfully",
            incomeById:getSingleIncome
        })
        return;
    } catch (error) {
        const err = (error as Error).message
        res.status(404).json({
            success:false,
            message:err || 'Something went wrong'
        })
        return;
    }
}

export const getExpensebyId = async(req:Request, res:Response)=>{
    try {
        const id = req.params
        console.log(id)
        const userId = req.id

        const getSingleExpense = await prisma.expense.findFirst({
            where:{
                id:id
            }
        })

        if(!getSingleExpense || !getSingleExpense.id){
            res.status(404).json({
                success:false,
                message:'Expense not found'
            })
            return;
        }

        if(userId !== getSingleExpense.userId){
             res.status(401).json({
                message:"User id isnt valid",
                success:false
            })
            return;
        }

        res.status(200).json({
            success:true,
            message:"Income sent successfully",
            expenseById:getSingleExpense
        })
        return;
    } catch (error) {
        const err = (error as Error).message
        res.status(404).json({
            success:false,
            message:err || 'Something went wrong'
        })
        return;
    }
}

export const removeIncome = async(req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        console.log(id,"This is the params id")
        if(!id || id == undefined){
            throw new Error("Id not found")
        }
        const deleteIncome = await prisma.income.delete({
            where:{
                id:id
            }
        })
        

        res.status(200).json({
            message:"Deleted successfully",
            suceess:true
        })
    } catch (error) {
        const err = (error as Error).message
        res.status(500).json({
            success:false,
            message:err || "Something went wrong"
        })
    }
}

export const removeExpense = async(req:Request, res:Response)=>{
    try {
        const { id } = req.params;
        if(!id || id == undefined){
            throw new Error("Id not found")
        }
        const deleteExpense = await prisma.expense.delete({
            where:{
                id:id
            }
        })

        res.status(200).json({
            message:"Deleted successfully",
            success:true
        })
    } catch (error) {
        const err = (error as Error).message
        res.status(500).json({
            success:false,
            message:err || "Something went wrong"
        })
    }
}