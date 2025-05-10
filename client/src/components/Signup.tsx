import { useNavigate } from "react-router-dom";
import { AuthLayout } from "./auth/AuthLayout";
import SignupForm from "./auth/Signup";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@/redux/api/api";
import { useEffect } from "react";



const Signup = () => {
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
                navigate('/expense')
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


  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;