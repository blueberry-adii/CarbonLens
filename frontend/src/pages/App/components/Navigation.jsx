import { Home, Plus, BarChart3, User } from "lucide-react";

export default function Navigation({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "capture", icon: Plus, label: "Capture" },
    { id: "stats", icon: BarChart3, label: "Stats" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around max-w-[1280px] mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors cursor-pointer ${
              currentPage === item.id
                ? "text-emerald-600 bg-emerald-100"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
