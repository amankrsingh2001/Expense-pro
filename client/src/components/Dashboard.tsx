import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { ExpenseManager } from "./ExpenseManager";
import { getAllExpense, getAllIncome } from "@/redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store/Store";
import { useEffect } from "react";

export default function Dashboard() {

  const { token } = useSelector((state: any) => state.user);
  const asset = useSelector((state: any) => state.asset);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const getUserExpense = async () => {
    dispatch(getAllExpense(navigate, token));
    dispatch(getAllIncome(navigate, token));
  };

  useEffect(() => {
    if (
      token &&
      asset.expenseData.length == 0 &&
      asset.incomeData.length == 0
    ) {
      getUserExpense();
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full ">
      <div>
        <DashboardSidebar />
      </div>
      <div className="flex-1 p-12 ">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
}
