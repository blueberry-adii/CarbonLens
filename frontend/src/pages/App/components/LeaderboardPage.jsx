const apiUrl = import.meta.env.VITE_API_URL;
import { useAuth } from "../../../utils/AuthContext";
import { useState, useEffect } from "react";
import Header from "./Header";
import { Share2, Crown, Medal, Award } from "lucide-react";
import axios from "axios";

export default function LeaderboardPage() {
  const { profile } = useAuth();
  // Initialize with "week" to match backend default
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);

  const periods = [
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "all", label: "All Time" }, // Backend might fall back to "week" if "all" isn't explicitly handled, but let's send it
  ];

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedPeriod]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      // Ensure period matches what backend expects
      const res = await axios.get(`${apiUrl}/api/v1/users/leaderboard?period=${selectedPeriod}`, {
        withCredentials: true,
      });
      if (res.data && res.data.data) {
        setLeaderboard(res.data.data.leaderboard || []);
        setUserRank(res.data.data.userRank);
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get initials
  const getInitials = (name) => {
    return name
      ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
      : "U";
  };

  const getAvatar = (entry) => {
    // If we had real avatars from backend we'd use them, 
    // for now we can simulate or use initials
    return (
      <div className="w-full h-full flex items-center justify-center font-bold text-gray-700 bg-gray-100 rounded-full">
        {getInitials(entry.name)}
      </div>
    );
  }


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
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${selectedPeriod === period.id
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
                {userRank ? `#${userRank}` : "-"}
              </div>
              {/* <div className="text-sm opacity-75">out of {leaderboard.length} users</div> */}
            </div>
            <div className="text-right">
              <div className="text-lg font-medium opacity-90">Carbon Saved</div>
              <div className="text-2xl font-bold">
                {/* Find current user stats in leaderboard or fall back to profile if available, else 0 */}
                {(leaderboard.find(e => e.isCurrentUser)?.carbonSaved || 0).toFixed(2)} kg
              </div>
              <div className="text-sm opacity-75">this {selectedPeriod === "all" ? "time" : selectedPeriod}</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {leaderboard.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6 text-center">
                  Top Performers
                </h3>
                <div className="flex justify-center items-end gap-4 mb-6">
                  {/* 2nd Place */}
                  {leaderboard[1] && (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 relative">
                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                          {getAvatar(leaderboard[1])}
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white">
                          2nd
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-lg px-3 py-2 mt-2">
                        <div className="font-semibold text-sm truncate max-w-[80px]">
                          {leaderboard[1].name.split(" ")[0]}
                        </div>
                        <div className="text-xs text-gray-600">
                          {leaderboard[1].carbonSaved.toFixed(2)}kg
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 1st Place */}
                  {leaderboard[0] && (
                    <div className="text-center transform scale-110">
                      <div className="w-20 h-20 mx-auto mb-2 relative">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-yellow-400">
                          <Crown size={24} fill="currentColor" />
                        </div>
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 p-1 shadow-lg">
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            {getAvatar(leaderboard[0])}
                          </div>
                        </div>
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white text-xs font-bold px-3 py-0.5 rounded-full border-2 border-white shadow-sm">
                          1st
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg px-4 py-3 mt-3 shadow-sm">
                        <div className="font-bold text-gray-800 truncate max-w-[100px]">
                          {leaderboard[0].name.split(" ")[0]}
                        </div>
                        <div className="text-xs text-yellow-700 font-semibold">
                          {leaderboard[0].carbonSaved.toFixed(2)}kg
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3rd Place */}
                  {leaderboard[2] && (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 relative">
                        <div className="w-full h-full rounded-full bg-orange-100 flex items-center justify-center overflow-hidden border-2 border-orange-200">
                          {getAvatar(leaderboard[2])}
                        </div>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white">
                          3rd
                        </div>
                      </div>
                      <div className="bg-orange-50 rounded-lg px-3 py-2 mt-2">
                        <div className="font-semibold text-sm truncate max-w-[80px]">
                          {leaderboard[2].name.split(" ")[0]}
                        </div>
                        <div className="text-xs text-orange-700">
                          {leaderboard[2].carbonSaved.toFixed(2)}kg
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Rankings</h3>
              {leaderboard.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No data available for this period</p>
              ) : (
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${entry.isCurrentUser
                        ? "bg-green-50 border border-green-200 shadow-sm"
                        : "bg-gray-50 hover:bg-gray-100"
                        }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${entry.rank === 1
                          ? "bg-yellow-100 text-yellow-700"
                          : entry.rank === 2
                            ? "bg-gray-200 text-gray-700"
                            : entry.rank === 3
                              ? "bg-orange-100 text-orange-700"
                              : "bg-white border border-gray-200 text-gray-500"
                          }`}
                      >
                        {entry.rank}
                      </div>

                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                        {getInitials(entry.name)}
                      </div>

                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 flex items-center gap-2">
                          {entry.name}
                          {entry.isCurrentUser && (
                            <span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium text-gray-900">{entry.carbonSaved.toFixed(2)}</span> kg saved
                        </div>
                      </div>
                      {entry.rank <= 3 && (
                        <div className="text-xl">
                          {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
