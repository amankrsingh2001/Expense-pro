
import { CircleCheck } from "lucide-react";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel with Gradients and Features */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 p-12 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">ExpenseOasis</h1>
          <p className="text-white/80">Smart expense tracking for your peace of mind</p>
        </div>
        
        <div className="space-y-8 mb-12">
          <div className="flex items-center space-x-3 text-white">
            <CircleCheck className="h-6 w-6 text-green-300" />
            <span>Track expenses in real-time</span>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <CircleCheck className="h-6 w-6 text-green-300" />
            <span>Generate detailed financial reports</span>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <CircleCheck className="h-6 w-6 text-green-300" />
            <span>Set and manage budget categories</span>
          </div>
          <div className="flex items-center space-x-3 text-white">
            <CircleCheck className="h-6 w-6 text-green-300" />
            <span>Secure and private data storage</span>
          </div>
        </div>
      </div>
      
      {/* Right Panel with Form */}
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="md:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">ExpenseOasis</h1>
            <p className="text-gray-600 mt-1">Smart expense tracking for your peace of mind</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
