import {
  TrendingDown,
  RefreshCw,
  Bell,
  Camera,
  BarChart3,
  Target,
  Award,
  Leaf,
} from "lucide-react";
import StatsCard from "./StatsCard";
import { useAuth } from "../../../utils/AuthContext";
import { useState } from "react";
import Header from "./Header";
import { mockWeeklyData, mockCarbonEntries } from "../../../constants";

export default function HomeDashboard() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const todayCarbon = 7.2;
  const weeklyAvg = 9.4;
  const monthlyTotal = 284.5;
  const carbonSaved = user?.stats?.carbonSaved || 156.8;

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title={`Welcome back, ${user?.name?.split(" ")[0] || "User"}!`}
        subtitle="Your sustainable journey continues"
        actions={[
          <button
            key="refresh"
            onClick={handleRefresh}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <RefreshCw size={20} className={refreshing ? "animate-spin" : ""} />
          </button>,
          <button
            key="notifications"
            className="p-2 hover:bg-white/20 rounded-xl transition-colors relative"
          >
            <Bell size={20} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
          </button>,
        ]}
      />

      <div className="p-6 space-y-6 pb-24">
        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-[100.5%] text-white p-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <Camera size={20} />
            Quick Capture
          </button>
          <button className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <BarChart3 size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800 mb-2">
              {todayCarbon} kg
            </div>
            <div className="text-gray-600 mb-4">Today's Carbon Impact</div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              <TrendingDown size={16} />
              23% below weekly average
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            icon={Target}
            title="Weekly Average"
            value={`${weeklyAvg} kg`}
            trend={-12}
            color="blue"
          />
          <StatsCard
            icon={Award}
            title="Carbon Saved"
            value={`${carbonSaved} kg`}
            subtitle="This month"
            color="purple"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Weekly Trend</h3>
            <button className="text-green-600 hover:text-green-700 transition-colors ease-in-out text-sm font-medium cursor-pointer">
              View Details
            </button>
          </div>
          <div className="h-32 flex items-end justify-between px-2">
            {mockWeeklyData.map((day, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="text-xs text-gray-500 mb-2">{day.entries}</div>
                <div
                  className="bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg w-6 transition-all duration-500 hover:from-green-600 hover:to-emerald-500"
                  style={{ height: `${Math.max((day.carbon / 20) * 80, 8)}px` }}
                ></div>
                <div className="text-xs text-gray-600 mt-2 font-medium">
                  {day.day}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Entries</h3>
            <button className="text-green-600 text-sm font-medium hover:text-green-700 cursor-pointer transition-colors ease-in-out">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {mockCarbonEntries.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <Leaf size={20} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">
                    {entry.items[0].name}
                  </div>
                  <div className="text-sm text-gray-500">{entry.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">
                    {entry.totalCarbon} kg
                  </div>
                  <div className="text-xs text-gray-500">CO₂</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
