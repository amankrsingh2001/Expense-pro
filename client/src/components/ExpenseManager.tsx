import type React from "react"

import { useState } from "react"
import { Download, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "@/redux/store/Store"
import { addExpense, addIncome, BASE_URL, deleteAsset,  } from "@/redux/api/api"
import {  type expenseState } from "@/redux/slice/assetSlice"
import axios from "axios"


// Define the expense type


type ViewType = "dashboard" | "expenses" | "income" | "all"

export function ExpenseManager({ view }: { view: ViewType }) {

  const expenseValue = useSelector((state:any)=>state.asset)
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState<"Income" | "Expense">("Expense")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const {token} = useSelector((state:any)=>state.user)

  console.log(view)

  // Calculate totals
  const totalIncome = expenseValue.incomeData.filter((expense:expenseState) => expense.category === "Income").reduce((sum:number, expense:expenseState) => sum + expense.amount, 0)

  const totalExpenses = expenseValue.expenseData
    .filter((expense:any) => expense.category === "Expense")
    .reduce((sum:number, expense:any) => sum + expense.amount, 0)

  const balance = totalIncome - totalExpenses

 const filteredExpenses = view === "income" ? expenseValue.incomeData : expenseValue.expenseData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    

    const data = {
      amount:amount,
      category:category,
      description:description,
      title:title,
      date:new Date()
    }
    if(category == "Expense"){
      dispatch(addExpense(token, data))
    }else{
      dispatch(addIncome(token, data))
    }

    setAmount("")
    setTitle('')
    setCategory("Income")
    setDescription("")
    setShowForm(false)
  }

  const handleDelete = async(id:string, category:string)=>{
    dispatch(deleteAsset(token,id,category));
  }
  const pdfDownloadHandler = async()=>{
    const getPdfList = await axios.get(`${BASE_URL}/expense/pdfList`,{
      responseType: 'blob', 
      headers:{
        Authorization:token
      }
    })
    const url = window.URL.createObjectURL(new Blob([getPdfList.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'expense-report.pdf');
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  }


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button className="bg-[#2373ba]" onClick={() => setShowForm(!showForm)}>
          <Plus className=" h-4 w-4" />
          {showForm ? "Cancel" : "Add Transaction"}
        </Button> 

        <Button className="bg-[#2373ba]" onClick={()=>pdfDownloadHandler()}>
          <Download className="h-4 w-4 " />
          Export to Pdf
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{totalIncome.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{totalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ₹{balance >= 0 ? "text-green-600" : "text-red-600"}`}>
              ₹{balance.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Expense */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Transaction</CardTitle>
            <CardDescription>Enter the details of your income or expense</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    className="pl-8"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>
                <RadioGroup value={category} onValueChange={(value: "Income" | "Expense") => setCategory(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Income" id="income" />
                    <Label htmlFor="income" className="cursor-pointer">
                      Income
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Expense" id="expense" />
                    <Label htmlFor="expense" className="cursor-pointer">
                      Expense
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title </Label>
                <Input
                  id="title"
                  placeholder="Enter a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

               <div className="space-y-2">
                <Label htmlFor="description">Description </Label>
                <Textarea
                  id="description"
                  placeholder="Enter a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-[#2373ba]  hover:bg-[#2373ba] ">
                  <Plus className="mr-2 h-4 w-4" /> Add Transaction
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {view === "expenses" ? "Expense History" : view === "income" ? "Income History" : "Transaction History"}
          </CardTitle>
          <CardDescription>
            {view === "expenses"
              ? "List of all your recorded expenses"
              : view === "income"
                ? "List of all your recorded income"
                : "List of all your recorded transactions"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredExpenses.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No transactions recorded yet. Add your first transaction using the button above.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    {
                       (view !== "dashboard" && view !== 'all' ) && ( <TableHead className="text-right">Action</TableHead>)
                    }
                   
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((expense:expenseState, index:number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium"> {new Date(expense.date).toLocaleDateString('en-GB')}</TableCell>
                        <TableCell className="capitalize">{expense.title || "-"}</TableCell>
                      <TableCell className="capitalize">{expense.description || "-"}</TableCell>
                      <TableCell>
                        <span className={expense.category === "Income" ? "text-green-600" : "text-red-600"}>
                          {expense.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={expense.category === "Income" ? "text-green-600" : "text-red-600"}>
                          ₹{expense.amount.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                       {
                        (view !== "dashboard" && view !== 'all' ) && ( <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(expense.id, expense.category)}
                          aria-label="Delete transaction"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>)
                       }
                      </TableCell>
                    </TableRow>
                  ))} 
                  
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
