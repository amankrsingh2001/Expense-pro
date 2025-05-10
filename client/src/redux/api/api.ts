import axios from "axios"
import type { NavigateFunction } from "react-router-dom"
import { toast } from "sonner"
import { setToken } from "../slice/userSlice"
import { deleteExpense, deleteIncome, setExpense, setIncome } from "../slice/assetSlice"


export const BASE_URL = import.meta.env.VITE_BASE_URL

interface LoginData  {
    email:string,
    password:string
}

export function Login(navigate:NavigateFunction, data:LoginData,setIsLoading:React.Dispatch<React.SetStateAction<boolean>> ){
    return async (dispatch:any)=>{
        console.log(data)
        const id = toast.loading('...Loading')
        try {
            const loginUser = await axios.post(`${BASE_URL}/user/login`, data)
            if(loginUser.data.success){
                toast.success('...Success',{
                    id:id
                })
            }
            console.log(loginUser)
            dispatch(setToken(`Bearer ${loginUser.data.token}`))
            localStorage.setItem('token', `Bearer ${loginUser.data.token}`)
            setIsLoading(false)
            navigate('/')
        } catch (error) {
            const err = (error as Error).message 
            toast.error(`${err} || Something went wrong`,{
                id:id
            })
            setIsLoading(false)
        }
    }
}

export function getAllExpense(navigate:NavigateFunction, token:string){
    return async (dispatch:any)=>{
        try {
            const getAllUserExpense = await axios.get(`${BASE_URL}/expense/getAllExpense`,{headers:{
                Authorization:token
            }})    
            getAllUserExpense.data.expenses.map((data:any)=>{
                dispatch(setExpense(data))
            })

        } catch (error) {
            const err = (error as Error).message 
            console.log(err, error)
            
        }
        
    }
}

export function getAllIncome(navigate:NavigateFunction, token:string){
    return async (dispatch:any)=>{
        try {
            const getAllUserIncome = await axios.get(`${BASE_URL}/expense/getAllIncome`,{headers:{
                Authorization:token
            }})    
            getAllUserIncome.data.income.map((data:any)=>{
                dispatch(setIncome(data))
            })


        } catch (error) {
            const err = (error as Error).message 
            console.log(err, error)
            
        }
        
    }
}

export function addExpense( token:string, data:any){
    return async (dispatch:any)=>{
        try {   
           
            const addExpense = await axios.post(`${BASE_URL}/expense/addExpense`, data, {
                headers:{
                    Authorization:token
                }
            })
            dispatch(setExpense(addExpense.data.expense))
        } catch (error) {
            const err = (error as Error)
            console.log(err)    
        }
    }
   
}

export function addIncome( token:string, data:any){
    return async (dispatch:any)=>{
       
        try {   
            const addIncome = await axios.post(`${BASE_URL}/expense/addIncome`, data, {
                headers:{
                    Authorization:token
                }
            })
            dispatch(setIncome(addIncome.data.income))
        } catch (error) {
            const err = (error as Error)
            console.log(err)    
        }
    }
   
}

export function deleteAsset(token:string, id:string, category:string, view:string){
    return async (dispatch:any)=>{
        console.log("here")
        try {
         await axios.delete(`${BASE_URL}/expense/${category.toLowerCase()}/${id}`,{
        headers:{
          Authorization:token
        }
      })
        if(view == "income"){
            dispatch(deleteIncome(id))
        }else{
            dispatch(deleteExpense(id))
        }
    } catch (error) {
      console.log(error)
    }
    }
}