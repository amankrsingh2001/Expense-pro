import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Dashboard from "./Dashboard"
import App from "@/App"
import { BASE_URL } from "@/redux/api/api"




export default function Verify(){
    const [isVerified, setIsVerified] = useState<boolean | null> (null)
    const {token} = useSelector((state:any)=>state.user)


    const checkToken = async()=>{
        try {
            const verifyUser = await axios.post(`${BASE_URL}/user/verifyUser`,{},{
                headers:{
                    authorization : `${token}`
                }
            })
            
            if(verifyUser.data.success){
                setIsVerified(true)
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
     if (isVerified === false) return <div>Loading...</div>;

    return  (token && isVerified) ? <Dashboard/> : <App/>
    
}