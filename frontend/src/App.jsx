import Header from "./components/Header";
import HomeDashboard from "./components/HomeDashboard";
import Capture from "./components/Capture";
import ProfilePage from "./components/ProfilePage";
import StatsPage from "./components/StatsPage";
import Navigation from "./components/Navigation";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomeDashboard />;
      case "capture":
        return <Capture />;
      case "stats":
        return <StatsPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="pb-4 space-y-8">
        <Header />
        {renderCurrentPage()}
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default App;
