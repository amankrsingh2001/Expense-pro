import {Router} from "express"
import { addExpense, addIncome, getAllExpense, getAllIncome, removeExpense, removeIncome } from "../controller/expenseController"
import { auth } from "../middleware/auth"

export const expenseRouter = Router()

expenseRouter.get('/getAllExpense', auth, getAllExpense)
expenseRouter.get('/getAllIncome', auth, getAllIncome)

expenseRouter.post('/addExpense', auth, addExpense)
expenseRouter.post('/addIncome', auth, addIncome)

expenseRouter.delete('/expense/:id',auth, removeExpense)
expenseRouter.delete('/income/:id',auth, removeIncome)
