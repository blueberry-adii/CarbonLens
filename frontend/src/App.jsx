import { Routes, Route, Navigate } from "react-router-dom";
import CarbonLensApp from "./pages/App/CarbonLensApp";
import LoginPage from "./pages/Login/LoginPage";
import LandingPage from "./pages/Landing/LandingPage";

function App() {
  const isLoggedIn = false;

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
