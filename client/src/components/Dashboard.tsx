import { Outlet, useLocation } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import  { ExpenseManager } from "./ExpenseManager";

export default function Dashboard() {
    const {pathname } = useLocation()

    
    return (
        <div className="flex min-h-screen w-full ">
            <div>
                <DashboardSidebar />
            </div>

        <div className="flex-1 p-12 ">
            <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
            {
                pathname == '/' ? <ExpenseManager view="dashboard"/>:<Outlet />
            }
        </div>
    </div>
    
    );
}
