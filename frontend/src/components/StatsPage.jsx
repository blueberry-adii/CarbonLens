import { TrendingDown, Leaf } from "lucide-react";
import { mockCarbonData, mockEntries } from "../constants";

export default function StatsPage() {
  const totalSaved = 45.2;
  const treesEquivalent = 2.1;

  return (
    <div className="px-4 space-y-6 max-w-[1280px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 max-[640px]:gap-0">
          <h2 className="flex items-center gap-2 text-4xl max-[640px]:text-2xl max-[450px]:text-xl max-[450px]:gap-0 font-bold">
            Your Impact
          </h2>
          <p className="text-gray-500 max-[640px]:text-sm max-[450px]:text-xs">
            Analyze your weekly and monthly stats
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Carbon Trend</h3>
        <div className="h-48 bg-gradient-to-t from-green-50 to-white rounded-lg flex items-end justify-between px-4 py-4">
          {mockCarbonData.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="bg-green-500 rounded-t w-8"
                style={{
                  height: `${(day.carbon / 20) * 100}%`,
                  minHeight: "20px",
                }}
              ></div>
              <span className="text-xs text-gray-500 mt-2">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingDown size={24} className="text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {totalSaved} kg
          </div>
          <div className="text-sm text-gray-600">CO₂ Reduced This Month</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Leaf size={24} className="text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {treesEquivalent}
          </div>
          <div className="text-sm text-gray-600">Trees Worth of Impact</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">All Entries</h3>
        <div className="space-y-3">
          {mockEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex justify-between items-center p-4 border border-gray-100 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="font-medium">{entry.items.join(", ")}</div>
                <div className="text-sm text-gray-500">
                  {entry.date} at {entry.time}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-800">{entry.carbon} kg</div>
                <div className="text-xs text-gray-500">CO₂</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
