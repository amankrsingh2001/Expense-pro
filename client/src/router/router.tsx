

import App from "@/App";
import Dashboard from "@/components/Dashboard";
import Expense from "@/components/Expense";
import Income from "@/components/Income";
import ErrorBoundary from "@/components/ui/Error";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";


const Signup = lazy(()=>import("@/components/Signup"))
const Login = lazy(()=>import("@/components/Login"))
const router = createBrowserRouter([
    {
    path: "/",
    element: (
      <Suspense fallback={<div>...Loading</div>}>
        <App/>
      </Suspense>
    )
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "expense",
        element: <Expense />
      },
      {
        path: "income",
        element: <Income />
      }
    ]
  },
    {
        path:"/signup",
        element:<Suspense>
            <Signup/>
        </Suspense>
    },
    {
        path:'/login',
        element:<Suspense>
                <Login />
        </Suspense>
    },{
        path:"*",
        element:<ErrorBoundary/>
    }
])

export default router