

import Expense from "@/components/Expense";
import Income from "@/components/Income";
import ErrorBoundary from "@/components/ui/Error";
import Verify from "@/components/Verify";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";


const Signup = lazy(()=>import("@/components/Signup"))
const Login = lazy(()=>import("@/components/Login"))
const router = createBrowserRouter([
    {
    path:"/",
    element:<Suspense fallback={<div>...Loading</div>}>
            <Verify/>
    </Suspense>,
    children:[
       {
            path:'/expense',
            element:<Expense/>,
            
        },
        {
            path:'/income',
            element:<Income/>,
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