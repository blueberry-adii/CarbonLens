import { Routes, Route, Navigate } from "react-router-dom";
import CarbonLensApp from "./pages/App/CarbonLensApp";
import LoginPage from "./pages/Login/LoginPage";
import LandingPage from "./pages/Landing/LandingPage";
import { ProtectedRoute, PublicRoute } from "./utils/RouteWrappers";
import HomeDashboard from "./pages/App/components/HomeDashboard";
import CameraCapture from "./pages/App/components/Capture";
import StatsPage from "./pages/App/components/StatsPage";
import LeaderboardPage from "./pages/App/components/LeaderBoardPage";
import ProfilePage from "./pages/App/components/ProfilePage";

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
      >
        <Route index element={<Navigate to={"home"} />} />
        <Route path="home" element={<HomeDashboard />} />
        <Route path="capture" element={<CameraCapture />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

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
