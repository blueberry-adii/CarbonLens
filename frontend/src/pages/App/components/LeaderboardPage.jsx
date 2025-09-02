import { useAuth } from "../../../utils/AuthContext";
import { useState } from "react";
import Header from "./Header";
import { Share2 } from "lucide-react";
import { mockLeaderboard } from "../../../constants";

export default function LeaderboardPage() {
  const { profile } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [loading, setLoading] = useState(false);

  const periods = [
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "all", label: "All Time" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="Leaderboard"
        subtitle="See how you rank globally"
        actions={[
          <button
            key="share"
            className="p-2 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
          >
            <Share2 size={20} />
          </button>,
        ]}
      />

      <div className="p-6 space-y-6 pb-24">
        <div className="bg-white rounded-2xl shadow-lg p-2">
          <div className="flex">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  selectedPeriod === period.id
                    ? "bg-green-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-200 cursor-pointer"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-medium opacity-90">Your Rank</div>
              <div className="text-3xl font-bold">
                #{profile?.stats?.rank || 3}
              </div>
              <div className="text-sm opacity-75">out of 12,847 users</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium opacity-90">Carbon Saved</div>
              <div className="text-2xl font-bold">
                {profile?.stats?.carbonSaved || 65.3} kg
              </div>
              <div className="text-sm opacity-75">this {selectedPeriod}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-6 text-center">
            Top Performers
          </h3>
          <div className="flex justify-center items-end gap-4 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl mb-2">
                {mockLeaderboard[1]?.avatar}
              </div>
              <div className="bg-gray-100 rounded-lg px-3 py-2">
                <div className="text-xs text-gray-600">2nd</div>
                <div className="font-semibold text-sm">
                  {mockLeaderboard[1]?.name.split(" ")[0]}
                </div>
                <div className="text-xs text-gray-600">
                  {mockLeaderboard[1]?.carbonSaved}kg
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-3xl mb-2 shadow-lg">
                {mockLeaderboard[0]?.avatar}
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg px-4 py-3 text-white">
                <div className="text-xs font-medium">🏆 1st</div>
                <div className="font-bold">
                  {mockLeaderboard[0]?.name.split(" ")[0]}
                </div>
                <div className="text-xs">
                  {mockLeaderboard[0]?.carbonSaved}kg
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center text-2xl mb-2">
                {mockLeaderboard[2]?.avatar}
              </div>
              <div className="bg-orange-100 rounded-lg px-3 py-2">
                <div className="text-xs text-orange-700">3rd</div>
                <div className="font-semibold text-sm">
                  {mockLeaderboard[2]?.name.split(" ")[0]}
                </div>
                <div className="text-xs text-orange-700">
                  {mockLeaderboard[2]?.carbonSaved}kg
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Global Rankings</h3>
          <div className="space-y-3">
            {mockLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                  entry.isCurrentUser
                    ? "bg-green-100 border-2 border-green-300 shadow-md"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    entry.rank === 1
                      ? "bg-yellow-400 text-white"
                      : entry.rank === 2
                      ? "bg-gray-300 text-gray-700"
                      : entry.rank === 3
                      ? "bg-orange-300 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {entry.rank}
                </div>
                <div className="text-2xl">{entry.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 flex items-center gap-2">
                    {entry.name}
                    {entry.isCurrentUser && (
                      <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {entry.carbonSaved} kg CO₂ saved
                  </div>
                </div>
                {entry.rank <= 3 && (
                  <div className="text-2xl">
                    {entry.rank === 1 ? "🏆" : entry.rank === 2 ? "🥈" : "🥉"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Weekly Challenge</h3>
              <p className="text-sm opacity-90">Reduce 20% carbon this week</p>
              <div className="mt-3">
                <div className="text-xs opacity-75 mb-1">Progress: 67%</div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white rounded-full h-2"
                    style={{ width: "67%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="text-4xl">🎯</div>
          </div>
        </div>
      </div>
    </div>
  );
}
