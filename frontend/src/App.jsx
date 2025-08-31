import { Routes, Route, Navigate } from "react-router-dom";
import CarbonLensApp from "./pages/App/CarbonLensApp";
import LoginPage from "./pages/Login/LoginPage";
import LandingPage from "./pages/Landing/LandingPage";
import { ProtectedRoute, PublicRoute } from "./utils/RouteWrappers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <CarbonLensApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
