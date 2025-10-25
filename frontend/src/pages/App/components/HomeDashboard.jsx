import {
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Bell,
  Camera,
  BarChart3,
  Target,
  Award,
  Leaf,
} from "lucide-react";
import StatsCard from "./StatsCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../../utils/AuthContext";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function HomeDashboard() {
  const { profile, getDashboard, getWeeklyTrend } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [weeklyTrend, setWeeklyTrend] = useState(null);
  const [key, setKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const todayCarbon = dashboard?.today?.carbon;
  const weeklyAvg = dashboard?.weekly?.average;
  const percentage =
    weeklyAvg !== 0
      ? (
          (todayCarbon > weeklyAvg
            ? ((todayCarbon - weeklyAvg) * 100) / weeklyAvg
            : ((weeklyAvg - todayCarbon) * 100) / weeklyAvg) ?? 0
        ).toFixed(0)
      : 0;
  const carbonEntries = dashboard?.recentEntries;

  useEffect(() => {
    async function load() {
      try {
        const [dashboard, weeklyTrend] = await Promise.all([
          getDashboard(),
          getWeeklyTrend(),
        ]);

        setDashboard(dashboard);
        setWeeklyTrend(weeklyTrend);
      } catch (e) {
        console.log(e);
      }
    }

    load();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setKey((prev) => prev + 1);
    setRefreshing(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title={`Welcome back, ${profile?.name?.split(" ")[0] || "User"}!`}
        subtitle="Your sustainable journey continues"
        actions={[
          <button
            key="refresh"
            onClick={handleRefresh}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw size={20} className={refreshing ? "animate-spin" : ""} />
          </button>,
          <button
            key="notifications"
            className="p-2 hover:bg-white/20 rounded-xl transition-colors relative cursor-pointer"
          >
            <Bell size={20} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
          </button>,
        ]}
      />

      <div className="p-6 space-y-6 pb-24">
        <div className="flex gap-3">
          <Link
            to={"/app/capture"}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-[100.5%] text-white p-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <Camera size={20} />
            Quick Capture
          </Link>
          <Link
            to={"/app/stats"}
            className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <BarChart3 size={20} className="text-gray-600" />
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800 mb-2">
              {todayCarbon ?? 0} kg
            </div>
            <div className="text-gray-600 mb-4">Today's Carbon Impact</div>
            <div
              className={`inline-flex items-center gap-2  ${
                todayCarbon > weeklyAvg
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-800"
              } px-4 py-2 rounded-full text-sm font-medium`}
            >
              {todayCarbon > weeklyAvg ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              {percentage}% {todayCarbon > weeklyAvg ? "above" : "below"} weekly
              average
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            icon={Target}
            title="Weekly Average"
            value={`${weeklyAvg ?? 0} kg`}
            trend={-12}
            color="blue"
          />
          <StatsCard
            icon={Award}
            title="Carbon Saved"
            value={`${
              dashboard?.monthly.carbonSaved
                ? dashboard?.monthly.carbonSaved.toFixed(2)
                : 0
            } kg`}
            subtitle="This month"
            color="purple"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Weekly Trend</h3>
            <Link
              to={"/app/stats"}
              className="text-green-600 hover:text-green-700 transition-colors ease-in-out text-sm font-medium cursor-pointer"
            >
              View Details
            </Link>
          </div>
          <div className="flex items-end justify-between px-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={weeklyTrend ?? []}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dayName" />
                <YAxis />
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value ?? 0} kg CO₂e`,
                    "Carbon",
                  ]}
                  labelFormatter={(label) => `Day: ${label}`}
                />
                <defs>
                  <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={1} />{" "}
                    <stop
                      offset="100%"
                      stopColor="#10b981"
                      stopOpacity={1}
                    />{" "}
                  </linearGradient>
                </defs>
                <Bar
                  dataKey="carbon"
                  fill="url(#colorCarbon)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Entries</h3>
            <Link
              to={"/app/stats"}
              className="text-green-600 text-sm font-medium hover:text-green-700 cursor-pointer transition-colors ease-in-out"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {carbonEntries?.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <Leaf size={20} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">
                    {entry.items[0]}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">
                    {entry.carbon} kg
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
