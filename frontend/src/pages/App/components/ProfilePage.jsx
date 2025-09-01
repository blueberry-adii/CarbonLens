import { useState } from "react";
import { useAuth } from "../../../utils/AuthContext";
import { Settings, Edit3 } from "lucide-react";
import Header from "./Header";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [settings, setSettings] = useState({
    dailyReminders: true,
    weeklyReports: false,
    carbonGoal: 50,
    publicProfile: true,
  });

  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Logged your first meal",
      icon: "🌱",
      unlocked: true,
      date: "2024-08-15",
    },
    {
      id: 2,
      name: "Week Warrior",
      description: "7-day tracking streak",
      icon: "🔥",
      unlocked: true,
      date: "2024-08-22",
    },
    {
      id: 3,
      name: "Carbon Saver",
      description: "Saved 100kg CO₂",
      icon: "🌍",
      unlocked: true,
      date: "2024-08-25",
    },
    {
      id: 4,
      name: "Social Butterfly",
      description: "Invited 5 friends",
      icon: "🦋",
      unlocked: false,
    },
    {
      id: 5,
      name: "Plant Pioneer",
      description: "30 plant-based meals",
      icon: "🥬",
      unlocked: false,
    },
    {
      id: 6,
      name: "Century Club",
      description: "100 meals tracked",
      icon: "💯",
      unlocked: false,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="Profile"
        subtitle="Manage your account and achievements"
        actions={[
          <button
            key="settings"
            onClick={() => setEditing(!editing)}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <Settings size={20} />
          </button>,
        ]}
      />

      <div className="p-6 space-y-6 pb-24">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center text-3xl">
              {user?.avatar || "🌱"}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-500">
                  Member since Aug 2024
                </span>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-green-600 font-medium">
                  Active
                </span>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Edit3 size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">
                {user?.stats?.totalEntries || 42}
              </div>
              <div className="text-sm text-gray-600">Meals Tracked</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">
                {user?.stats?.carbonSaved || 156.8}
              </div>
              <div className="text-sm text-gray-600">CO₂ Saved (kg)</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">
                {user?.stats?.streak?.current || 7}
              </div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <span className="text-sm text-gray-500">
              {achievements.filter((a) => a.unlocked).length}/
              {achievements.length} unlocked
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? "border-green-200 bg-green-50 hover:border-green-300"
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <div className="font-semibold text-gray-800 mb-1">
                  {achievement.name}
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {achievement.description}
                </div>
                {achievement.unlocked && achievement.date && (
                  <div className="text-xs text-green-600">
                    Unlocked {achievement.date}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Settings</h3>
          <div className="space-y-4">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2">
                <div>
                  <div className="font-medium text-gray-800 capitalize">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </div>
                  <div className="text-sm text-gray-500">
                    {key === "dailyReminders" &&
                      "Get notified to log your meals"}
                    {key === "weeklyReports" &&
                      "Receive weekly carbon impact reports"}
                    {key === "carbonGoal" &&
                      "Weekly carbon reduction target (kg)"}
                    {key === "publicProfile" &&
                      "Show your profile on leaderboards"}
                  </div>
                </div>
                {typeof value === "boolean" ? (
                  <button
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, [key]: !value }))
                    }
                    className={`w-12 h-6 rounded-full transition-all duration-300 ${
                      value ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-all duration-300 ${
                        value ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    ></div>
                  </button>
                ) : (
                  <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        [key]: Number(e.target.value),
                      }))
                    }
                    className="w-20 px-3 py-1 border border-gray-300 rounded-lg text-center"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">About CarbonLens</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Version</span>
              <span className="text-gray-600">1.0.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Last Updated</span>
              <span className="text-gray-600">Aug 31, 2024</span>
            </div>
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <button className="w-full text-left text-gray-700 hover:text-green-600 py-2 font-medium transition-colors">
                Terms of Service
              </button>
              <button className="w-full text-left text-gray-700 hover:text-green-600 py-2 font-medium transition-colors">
                Privacy Policy
              </button>
              <button className="w-full text-left text-gray-700 hover:text-green-600 py-2 font-medium transition-colors">
                Contact Support
              </button>
              <button
                onClick={logout}
                className="w-full text-left text-red-600 hover:text-red-700 py-2 font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
