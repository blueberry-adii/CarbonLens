import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Leaf } from "lucide-react";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingPage />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingPage />;
  if (user) return <Navigate to="/app" replace />;
  return children;
}

const LoadingPage = ({
  message = "Loading...",
  subMessage = "It may take a few seconds",
}) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-emerald-200 rounded-full opacity-15 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-teal-200 rounded-full opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="text-center relative z-10">
        <div className="relative mb-8">
          <div className="w-32 h-32 border-4 border-green-200 rounded-full animate-spin absolute inset-0"></div>

          <div className="w-24 h-24 border-4 border-emerald-300 rounded-full animate-pulse absolute inset-4"></div>

          <div className="w-16 h-16 border-t-4 border-green-600 rounded-full animate-spin absolute inset-8"></div>

          <div className="w-32 h-32 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center relative animate-pulse">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
              <Leaf size={40} className="text-white animate-pulse" />
            </div>
          </div>

          <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-300"></div>
          <div className="absolute top-1/2 -right-4 w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping delay-700"></div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            CarbonLens
          </h2>

          <div className="space-y-2">
            <p className="text-lg md:text-xl text-gray-700 font-medium">
              {message}
            </p>

            {subMessage && (
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                {subMessage}
              </p>
            )}
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
