import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";

import axios from "axios"
import { BASE_URL } from "@/redux/api/api";
import { toast } from "sonner";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const handleSignup = async(e: React.FormEvent) => {
    e.preventDefault();

    if(password !== confirmPassword || password.length !== confirmPassword.length){
      throw new Error("Password and Confirm Password doesn't match")
    }

    const data = {
        name:name,
        email:email,
        password:password
    }
    const id = toast.loading('...loading')
    try {
      const createUser = await axios.post(`${BASE_URL}/user/signup`, data)
      if(createUser.data.success){
        toast.success('User created Successfully',{
          id:id
        })
        toast.dismiss(id)
        navigate('/login')
      }
    } catch (error) {
      const err = (error as Error).message
      toast.error(`${err} ||  Error`, {
        id:id
      })

    }
  };

  return (
    <Card className="w-full border-none shadow-lg rounded-xl overflow-hidden animate-fade-in">
      <CardHeader className="space-y-1 bg-white pb-4">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-8 bg-white">
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`h-11 rounded-lg ${errors.name ? "border-red-500" : ""}`}
              autoComplete="name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`h-11 rounded-lg ${errors.email ? "border-red-500" : ""}`}
              autoComplete="email"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`h-11 rounded-lg pr-10 ${errors.password ? "border-red-500" : ""}`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters long and include an uppercase letter, 
              a lowercase letter, and a number.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`h-11 rounded-lg pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 rounded-lg text-base mt-2" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                Creating account...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2 w-full">
                <UserPlus size={18} />
                Create Account
              </span>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center pt-0 pb-6 bg-white">
        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign In
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};


export default SignupForm