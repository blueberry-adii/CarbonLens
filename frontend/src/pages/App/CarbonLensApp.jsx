import HomeDashboard from "./components/HomeDashboard";
import Capture from "./components/Capture";
import ProfilePage from "./components/ProfilePage";
import StatsPage from "./components/StatsPage";
import Navigation from "./components/Navigation";
import { useState } from "react";
import { mockCarbonEntries } from "../../constants";
import LeaderboardPage from "./components/LeaderBoardPage";
import EntryDetailModal from "./components/EntryDetailModal";
import QuickActionMenu from "./components/QuickActionMenu";
import NotificationToast from "./components/NotificationToast";
import FloatingActionButton from "./components/FloatingActionButton";

export default function CarbonLensApp() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedEntry, setSelectedEntry] = useState(mockCarbonEntries[0]);
  const [showEntryModal, setShowEntryModal] = useState(true);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  const handleViewEntry = (entry) => {
    setSelectedEntry(entry);
    setShowEntryModal(true);
  };

  const handleDeleteEntry = (entryId) => {
    console.log("Deleting entry:", entryId);
    setShowEntryModal(false);
  };

  const handleEditEntry = (entry) => {
    console.log("Editing entry:", entry);
    setShowEntryModal(false);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomeDashboard />;
      case "capture":
        return <Capture />;
      case "stats":
        return <StatsPage />;
      case "leaderboard":
        return <LeaderboardPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {renderCurrentPage()}
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <EntryDetailModal
          entry={selectedEntry}
          isOpen={showEntryModal}
          onClose={() => setShowEntryModal(false)}
          onDelete={handleDeleteEntry}
          onEdit={handleEditEntry}
        />
      </div>
      <FloatingActionButton onClick={() => setShowQuickActions(true)} />

      <QuickActionMenu
        isOpen={showQuickActions}
        onClose={() => setShowQuickActions(false)}
        onCapture={() => {
          setShowQuickActions(false);
        }}
        onManualEntry={() => {
          setShowQuickActions(false);
        }}
      />

      <NotificationToast
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </>
  );
}
