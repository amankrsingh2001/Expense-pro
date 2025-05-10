import { useEffect } from "react";
import { ExpenseManager } from "./ExpenseManager";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "@/redux/store/Store";
import { getAllExpense, getAllIncome } from "@/redux/api/api";

export default function Expense(){
    const {token} = useSelector((state:any)=>state.user)
    const asset = useSelector((state:any)=>state.asset)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const getUserExpense = async()=>{
        dispatch(getAllExpense(navigate, token))
        dispatch(getAllIncome(navigate, token))
    }

    useEffect(()=>{
        if (token && asset.expenseData.length === 0){
            getUserExpense()
        }
    },[])


return (<div className="h-full">
            <ExpenseManager view={"expenses"}/>
    </div>
)
    
}