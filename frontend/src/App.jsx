import { Routes, Route, Navigate } from "react-router-dom";
import CarbonLensApp from "./pages/App/CarbonLensApp";
import LoginPage from "./pages/Login/LoginPage";
import LandingPage from "./pages/Landing/LandingPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/auth/me", {
          withCredentials: true,
        });
        setIsLoggedIn(true);
        return { isLoggedIn: true, user: res.data.user };
      } catch (err) {
        setIsLoggedIn(false);
        return { isLoggedIn: false, user: null };
      }
    }
    checkAuth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/app"
        element={
          isLoggedIn ? <CarbonLensApp /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/login"
        element={!isLoggedIn ? <LoginPage /> : <Navigate to="/app" replace />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
