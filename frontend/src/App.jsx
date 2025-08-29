import { Routes, Route, Navigate } from "react-router-dom";
import CarbonLensApp from "./pages/CarbonLensApp";
import LoginPage from "./pages/LoginPage";

function App() {
  const isLoggedIn = false;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <CarbonLensApp /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/login"
        element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" replace />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
