import {
  Filter,
  Search,
  TrendingDown,
  Globe,
  Leaf,
  Edit3,
  Trash2,
  Share2,
} from "lucide-react";
import StatsCard from "./StatsCard";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useAuth } from "../../../utils/AuthContext";

export default function StatsPage() {
  const { getWeeklyTrend, profile, getDashboard, getAllEntries } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [weeklyTrend, setWeeklyTrend] = useState(null);
  const [allEntries, setAllEntries] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        const [dashboard, weeklyTrend, allEntries] = await Promise.all([
          getDashboard(),
          getWeeklyTrend(),
          getAllEntries(),
        ]);

        setDashboard(dashboard);
        setWeeklyTrend(weeklyTrend);
        setAllEntries(allEntries);
      } catch (e) {
        console.log(e);
      }
    }

    load();
  }, []);

  const periods = [
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "year", label: "Year" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="Your Impact"
        subtitle="Track your sustainability progress"
        actions={[
          <button
            key="filter"
            className="p-2 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
          >
            <Filter size={20} />
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

        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            icon={TrendingDown}
            title="Carbon Reduced"
            value={`${Math.max(
              0,
              profile?.settings?.carbonGoal - dashboard?.weekly?.carbon
            )} kg`}
            subtitle="vs. baseline"
            color="green"
            trend={-15}
          />
          <StatsCard
            icon={Globe}
            title="Global Average (Carbon Reduced)"
            value="12 kg"
            subtitle="carbon offset"
            color="blue"
            trend={12}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Carbon Trend</h3>
          <div className="h-48 bg-gradient-to-t from-green-50 to-white rounded-xl flex items-end justify-between px-4 py-4">
            {weeklyTrend?.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-2">{day.carbon}kg</div>
                <div
                  className="bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg w-8 transition-all duration-700 delay-75"
                  style={{
                    height: `${(day.carbon / 20) * 120 + 5}px`,
                    animationDelay: `${index * 100}ms`,
                  }}
                ></div>
                <span className="text-xs text-gray-600 mt-2 font-medium">
                  {day.dayName}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">All Entries</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                <Search size={18} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                <Filter size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {allEntries?.entries.map((entry) => (
              <div
                key={entry.id}
                className="group flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-green-200 hover:bg-green-50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                      <Leaf size={20} className="text-green-600" />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      {entry.analysis.detectedItems
                        .map((i) => i.name)
                        .join(", ")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(entry.date).toISOString().split("T")[0]} at{" "}
                      {new Date(entry.date).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold text-gray-800">
                      {entry.analysis.totalCarbon} kg
                    </div>
                    <div className="text-xs text-gray-500">CO₂</div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer">
                      <Edit3 size={16} className="text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-colors cursor-pointer">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                      <Share2 size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
