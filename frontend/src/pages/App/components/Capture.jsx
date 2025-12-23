const apiUrl = import.meta.env.VITE_API_URL;
import { useState } from "react";
import { PenTool, Leaf, CheckCircle, Plus, X } from "lucide-react";
import Header from "./Header";
import axios from "axios";

export default function ManualEntry() {
  const [items, setItems] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const analyzeMeal = () => {
    if (!items.trim()) return alert("Please enter at least one item");

    // Split by comma and clean up
    const itemsList = items.split(",").map(item => item.trim()).filter(item => item.length > 0);

    if (itemsList.length === 0) return alert("Please enter valid items");

    setAnalyzing(true);

    axios
      .post(`${apiUrl}/api/v1/carbon/log`, { items: itemsList }, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Log success: ", res.data);
        setResults({
          items: res.data.data.breakdown,
          totalCarbon: res.data.data.totalCarbon,
          confidence: res.data.data.confidence,
          tips: res.data.data.tips,
          comparison: {
            avgMeal: 12.5,
            savings: 12.5 - res.data.data.totalCarbon,
          },
        });
      })
      .catch((e) => {
        console.log(e);
        alert("Failed to log meal. Please try again.");
      })
      .finally(() => {
        setAnalyzing(false);
      });
  };

  const saveEntry = () => {
    console.log("Saving entry...");
    reset();
  };

  const reset = () => {
    setItems("");
    setResults(null);
    setAnalyzing(false);
  };

  if (analyzing) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-green-200 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-t-4 border-green-600 rounded-full animate-spin absolute inset-4"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center absolute inset-0 animate-pulse">
              <Leaf size={32} className="text-white animate-bounce" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Calculating Footprint
          </h3>
          <p className="text-gray-600">
            Analyzing your meal items...
          </p>
          <div className="flex justify-center space-x-1 mt-6">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header
        title="Log Meal"
        subtitle="Manually track your carbon footprint"
      />

      <div className="p-6 space-y-6 pb-24">
        {!results ? (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <PenTool size={32} className="text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              What did you eat?
            </h2>
            <p className="text-gray-600 mb-8 text-center leading-relaxed">
              Enter your meal items separated by commas (e.g., "Burger, Fries, Coke")
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meal Items
                </label>
                <textarea
                  value={items}
                  onChange={(e) => setItems(e.target.value)}
                  placeholder="Grilled Chicken, Rice, Salad..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none h-32 text-gray-800 placeholder-gray-400"
                />
              </div>

              <button
                onClick={analyzeMeal}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[101%] cursor-pointer shadow-lg"
              >
                <Leaf size={20} />
                Calculate Footprint
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {results.totalCarbon} kg CO₂
                </div>
                <div className="text-gray-600">
                  Carbon footprint of your meal
                </div>
                <div className="mt-3 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">
                  <CheckCircle size={16} />
                  Manual Entry
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-gray-800">
                  Ingredient Breakdown:
                </h4>
                {results.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
                  >
                    <span className="font-medium text-gray-700">
                      {item.item}
                    </span>
                    <span className="text-gray-600 font-semibold">
                      {item.carbonValue} kg CO₂
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">
                  💡 AI Insights
                </h4>
                <div className="space-y-1">
                  {results.tips.map((tip, index) => (
                    <p key={index} className="text-sm text-blue-700">
                      • {tip}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Log Another
                </button>
                <button
                  onClick={saveEntry}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
