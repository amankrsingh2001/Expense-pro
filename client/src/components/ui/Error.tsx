import { useEffect } from "react";
import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  

  useEffect(() => {
    console.error("Route error caught:", error);
  }, [error]);

 
  const getErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      return `${error.status} - ${error.statusText || error.data}`;
    } else if (error instanceof Error) {
      return error.message;
    } else if (typeof error === "string") {
      return error;
    }
    return "An unexpected error occurred";
  };

  const getErrorTitle = () => {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) return "Page Not Found";
      if (error.status === 401) return "Unauthorized";
      if (error.status === 403) return "Forbidden";
      if (error.status === 500) return "Server Error";
      return `Error ${error.status}`;
    }
    return "Application Error";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {getErrorTitle()}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {getErrorMessage()}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          
          <Button
            onClick={() => navigate("/")}
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
