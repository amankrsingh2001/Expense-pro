import { useEffect } from "react";
import { ExpenseManager } from "./ExpenseManager";
import { getAllExpense, getAllIncome } from "@/redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "@/redux/store/Store";

export default function Income(){
      const {token} = useSelector((state:any)=>state.user)
    const asset = useSelector((state:any)=>state.asset)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const getUserExpense = async()=>{
        dispatch(getAllExpense(navigate, token))
        dispatch(getAllIncome(navigate, token))
    }

    useEffect(()=>{
         if (token && asset.incomeData.length === 0){
            getUserExpense()
        }
    },[])

    return <div>
        <ExpenseManager view="income"/>
    </div>
}