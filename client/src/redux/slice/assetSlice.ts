
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


export interface expenseState {
    id:string,
    title:string,
    description:string,
    date:string,
    category:string
    amount:number,
    userId:string
}

interface incomeState {
    id:string,
    title:string,
    description:string,
    date:string,
    category:string
    amount:number,
    userId:string
}

interface AssetState {
    incomeData: incomeState[];
    expenseData: expenseState[];
}



const initialState:AssetState = {
    incomeData : [],
    expenseData :  []

}

export const assetSlice = createSlice({
    name:"asset",
    initialState,
    reducers:{
        setIncome(state, action:PayloadAction<incomeState>){
            state.incomeData.push(action.payload)
        },
        setExpense(state,action:PayloadAction<expenseState>){
            state.expenseData.push(action.payload) 
        },
        deleteIncome(state, action: PayloadAction<string>) {
            state.incomeData = state.incomeData.filter(item => item.id !== action.payload);
        },
         deleteExpense(state, action: PayloadAction<string>) {
            state.expenseData = state.incomeData.filter(item => item.id !== action.payload);
        },


    }
})

export  const {setIncome, setExpense, deleteExpense, deleteIncome} = assetSlice.actions
export default assetSlice.reducer