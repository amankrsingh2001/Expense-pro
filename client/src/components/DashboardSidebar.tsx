


import {  CreditCard, DollarSign,  LogOut} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setToken } from "@/redux/slice/userSlice"


export function DashboardSidebar() {
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const routes = [
   
    {
      title: "Expenses",
      icon: CreditCard,
      href: "/dashboard/expense",
      isActive: pathname === "/dashboard/expenses",
    },
    {
      title: "Income",
      icon: DollarSign,
      href: "/dashboard/income",
      isActive: pathname === "/dashboard/income",
    }
  ]

  const logoutHandler = () => {
    localStorage.removeItem('token')
    dispatch(setToken(null))
    navigate('/')
  }

  return (
    <SidebarProvider defaultOpen className="max-w-96  ">
      <div className="h-screen  overflow-hidden">
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-3">
            <h2 className="text-xl text-[#1447E6] font-bold">Expense Manager</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-4 mt-3 ">
              {routes.map((route) => (
                <SidebarMenuItem key={route.href} className="flex ">
                  <SidebarMenuButton className={`text-sm font-medium h-full `} tooltip={route.title}>
                    <Link to={route.href} className={`flex py-3 gap-3 px-4 rounded-md w-full  ${route.href == pathname ? "bg-[#1447E6] text-white ":"bg-white text-black" } }`}>
                      <route.icon className="inline-flex " size={18}/>
                      <span>{route.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t bg-[#1447E6] p-4 cursor-pointer">
            <SidebarMenu >
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button className="w-full  text-white cursor-pointer" onClick={()=>logoutHandler()}>
                    <LogOut />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  )
}
