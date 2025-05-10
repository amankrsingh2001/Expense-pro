import { useSelector } from "react-redux"
import { AuthLayout } from "./auth/AuthLayout"
import LoginForm from "./auth/LoginForm"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "@/redux/api/api"

const Login = ()=>{
    const {token} = useSelector((state:any)=>state.user)
    const navigate = useNavigate()

    const verifyUser = async()=>{
        try {
            const verify = await axios.post(`${BASE_URL}/user/verifyUser`,{},{
                headers:{
                    Authorization:token
                }
            })
             if(verify.data.success){
                navigate('/dashboard/expense')
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(token){
            verifyUser()
        }       
    })

    return <AuthLayout>
                <LoginForm/>
    </AuthLayout>
}

export default Login;