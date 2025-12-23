import Navigation from "./components/Navigation";
import { useState } from "react";
import { mockCarbonEntries } from "../../constants";
import EntryDetailModal from "./components/EntryDetailModal";
import NotificationToast from "./components/NotificationToast";
import FloatingActionButton from "./components/FloatingActionButton";
import { Outlet, useNavigate } from "react-router-dom";
import { PenTool } from "lucide-react";

export default function CarbonLensApp() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedEntry, setSelectedEntry] = useState(mockCarbonEntries[0]);
  const [showEntryModal, setShowEntryModal] = useState(false);
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

  const renderCurrentPage = () => <Outlet />;

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
      <FloatingActionButton
        onClick={() => navigate("/app/capture")}
        icon={PenTool}
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
