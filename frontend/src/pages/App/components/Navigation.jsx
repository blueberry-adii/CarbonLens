import { Home, Plus, BarChart3, User, Trophy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = ({
  currentPage,
  setCurrentPage,
  unreadNotifications = 3,
}) => {
  const location = useLocation();

  const fullPath = location.pathname;
  const subRoute = fullPath.replace("/app/", "");

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "capture", icon: Plus, label: "Capture" },
    { id: "stats", icon: BarChart3, label: "Stats" },
    { id: "leaderboard", icon: Trophy, label: "Leaderboard" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.id}
            className={`relative flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 cursor-pointer ${
              subRoute === item.id
                ? "text-green-600 bg-green-50 scale-110 shadow-lg"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <item.icon size={22} strokeWidth={2.5} />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
            {item.id === "profile" && unreadNotifications > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadNotifications}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
