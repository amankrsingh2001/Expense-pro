import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Dashboard from "./Dashboard"
import App from "@/App"
import { BASE_URL } from "@/redux/api/api"
import {  useNavigate} from "react-router-dom"



export default function Verify(){
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const {token} = useSelector((state:any)=>state.user)
    const navigate = useNavigate() 


    const checkToken = async()=>{
        try {
            const verifyUser = await axios.post(`${BASE_URL}/user/verifyUser`,{},{
                headers:{
                    authorization : `${token}`
                }
            })
            
            if(verifyUser.data.success){
                setIsVerified(true)
                navigate('/expense')
            }
        } catch (error) {
            setIsVerified(false)
            
        }
        
    }

    useEffect(()=>{
        if(token){
            checkToken()
        }
    },[token])

    return  (token && isVerified) ? <Dashboard/> : <App/>
    
}