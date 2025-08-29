import { TrendingDown } from "lucide-react";
import PopupForm from "./PopupForm";

const mockEntries = [
  {
    id: 1,
    items: ["Beef Burger", "French Fries"],
    carbon: 8.5,
    date: "2024-08-26",
    time: "12:30 PM",
  },
  {
    id: 2,
    items: ["Chicken Salad"],
    carbon: 2.1,
    date: "2024-08-26",
    time: "7:45 AM",
  },
  {
    id: 3,
    items: ["Coffee", "Croissant"],
    carbon: 1.8,
    date: "2024-08-25",
    time: "8:15 AM",
  },
];

export default function HomeDashboard() {
  const todayCarbon = 7.2;
  const weeklyAvg = 9.4;
  const monthlyTotal = 284.5;

  return (
    <div className="px-4 space-y-6 max-w-[1280px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 max-[640px]:gap-0">
          <h2 className="flex items-center gap-2 text-4xl max-[640px]:text-2xl max-[450px]:text-xl max-[450px]:gap-0 font-bold">
            <TrendingDown
              className="text-green-600 max-[640px]:h-10 max-[450px]:h-5"
              size={40}
            />
            Today's Carbon Impact
          </h2>
          <p className="text-gray-500 max-[640px]:text-sm max-[450px]:text-xs">
            Record your daily diet and its carbon impact
          </p>
        </div>
        <PopupForm />
      </div>

      <div className="bg-emerald-50 border border-emerald-400/25 rounded-xl shadow-sm p-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800 mb-2">
            {todayCarbon} kg
          </div>
          <div className="text-gray-600">CO₂ Generated</div>
          <div className="mt-4 bg-green-200 text-green-800 px-4 py-2 rounded-full inline-block">
            23% below weekly average
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-400/25 rounded-xl shadow-sm p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{weeklyAvg} kg</div>
          <div className="text-sm text-gray-600">Weekly Average</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-400/25 rounded-xl shadow-sm p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {monthlyTotal} kg
          </div>
          <div className="text-sm text-gray-600">Monthly Total</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Entries</h3>
        <div className="space-y-3">
          {mockEntries.slice(0, 3).map((entry) => (
            <div
              key={entry.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div>
                <div className="font-medium">{entry.items.join(", ")}</div>
                <div className="text-sm text-gray-500">{entry.time}</div>
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
