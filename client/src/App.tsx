import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight} from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./redux/api/api";

const App = () => {
  const navigate = useNavigate();
  const {token} = useSelector((state:any)=>state.user)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

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
        if(token ){
            verifyUser()
        }       
    })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className="container mx-auto px-4 py-6 flex justify-between items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">ExpenseOasis</h1>
        </div>
        <div className="space-x-4 hidden md:block">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:text-blue-700"
          >
            Login
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/signup")}
            className="border-blue-600 cursor-pointer bg-blue-700 text-white hover:bg-white hover:text-blue-600 "
          >
            Sign Up
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-8 md:mb-0 md:pr-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Manage Your Expenses with Ease
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Take control of your finances with ExpenseOasis. 
            Track spending, monitor income, and reach your financial goals faster.
          </p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button 
              onClick={() => navigate("/signup")} 
              className="bg-blue-600 hover:bg-blue-700 text-sm py-5 group cursor-pointer"
            >
              Get Started Free
              <motion.span
                className="inline-block ml-2"
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 1, duration: 1 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </Button>
            <Button 
              onClick={() => navigate("/login")} 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 py-5 text-lg cursor-pointer hover:text-blue-700"
            
              // whileHover={{ scale: 1.05 }}
              // whileTap={{ scale: 0.95 }}
            >
              Log In
            </Button>
          </motion.div>
        </motion.div>
        <motion.div 
          className="md:w-1/2"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80" 
              alt="Expense tracking dashboard" 
              className="rounded-lg w-full h-auto"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Key Features
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Feature 1 */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="bg-blue-600 text-white p-3 rounded-full inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Tracking</h3>
              <p className="text-gray-600">
                Quickly add your income and expenses with our intuitive interface.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="bg-blue-600 text-white p-3 rounded-full inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Insightful Reports</h3>
              <p className="text-gray-600">
                Get a clear picture of your spending habits with visual summaries.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="bg-blue-600 text-white p-3 rounded-full inline-block mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your financial data is encrypted and protected at all times.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16 text-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Users Say
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Testimonial 1 */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-colors duration-300"
              variants={fadeIn}
            >
              <p className="italic mb-4">
                "ExpenseOasis has completely changed how I manage my finances. I can finally see where my money is going!"
              </p>
              <div className="font-semibold">- Sarah J.</div>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-colors duration-300"
              variants={fadeIn}
            >
              <p className="italic mb-4">
                "The simplicity of adding expenses on the go has made budgeting a breeze. Highly recommend!"
              </p>
              <div className="font-semibold">- Michael T.</div>
            </motion.div>
            
            {/* Testimonial 3 */}
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition-colors duration-300"
              variants={fadeIn}
            >
              <p className="italic mb-4">
                "I've tried many expense trackers, but this one strikes the perfect balance between features and usability."
              </p>
              <div className="font-semibold">- Lisa R.</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Take Control?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have transformed their financial habits with ExpenseOasis.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Button 
                onClick={() => navigate("/signup")} 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
                size="lg"
                // whileHover={{ scale: 1.05 }}
                // whileTap={{ scale: 0.95 }}
              >
                Create Free Account
              </Button>
              <Button 
                onClick={() => navigate("/login")} 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg"
                size="lg"
                // whileHover={{ scale: 1.05 }}
                // whileTap={{ scale: 0.95 }}
              >
                Log In
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ExpenseOasis</h3>
              <p className="text-gray-600">
                Smart expense tracking for your peace of mind
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ExpenseOasis. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
