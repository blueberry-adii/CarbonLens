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
import { useState } from "react";
import { mockWeeklyData, mockCarbonEntries } from "../../../constants";

export default function StatsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
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
                    : "text-gray-600 hover:bg-gray-50"
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
            value="45.2 kg"
            subtitle="vs. baseline"
            color="green"
            trend={-15}
          />
          <StatsCard
            icon={Globe}
            title="Trees Equivalent"
            value="2.1"
            subtitle="carbon offset"
            color="blue"
            trend={12}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Carbon Trend</h3>
          <div className="h-48 bg-gradient-to-t from-green-50 to-white rounded-xl flex items-end justify-between px-4 py-4">
            {mockWeeklyData.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-2">{day.carbon}kg</div>
                <div
                  className="bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg w-8 transition-all duration-700 delay-75"
                  style={{
                    height: `${(day.carbon / 20) * 120}px`,
                    animationDelay: `${index * 100}ms`,
                  }}
                ></div>
                <span className="text-xs text-gray-600 mt-2 font-medium">
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">All Entries</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Search size={18} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {mockCarbonEntries.map((entry) => (
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
                      {entry.items.map((i) => i.name).join(", ")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {entry.date} at {entry.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold text-gray-800">
                      {entry.totalCarbon} kg
                    </div>
                    <div className="text-xs text-gray-500">CO₂</div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                      <Edit3 size={16} className="text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
