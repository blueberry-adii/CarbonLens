import { useState, useRef } from "react";
import { Camera, Upload, Leaf } from "lucide-react";

export default function Capture() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults({
        items: ["Beef Burger", "French Fries", "Soda"],
        totalCarbon: 8.7,
        breakdown: [
          { item: "Beef Burger", carbon: 6.2 },
          { item: "French Fries", carbon: 1.8 },
          { item: "Soda", carbon: 0.7 },
        ],
      });
      setAnalyzing(false);
    }, 3000);
  };

  const reset = () => {
    setCapturedImage(null);
    setResults(null);
    setAnalyzing(false);
  };

  return (
    <div className="px-4 space-y-6 max-w-[1280px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 max-[640px]:gap-0">
          <h2 className="flex items-center gap-2 text-4xl max-[640px]:text-2xl max-[450px]:text-xl max-[450px]:gap-0 font-bold">
            Capture Meal
          </h2>
          <p className="text-gray-500 max-[640px]:text-sm max-[450px]:text-xs">
            Capture your meal and upload it here to analyze its carbon impact
          </p>
        </div>
      </div>

      {!capturedImage ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center space-y-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Camera size={40} className="text-green-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              Take a Photo of Your Meal
            </h2>
            <p className="text-gray-600">
              AI will analyze your food and calculate its carbon footprint
            </p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 mx-auto transition-colors cursor-pointer"
          >
            <Upload size={20} />
            Choose Photo
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <img
              src={capturedImage}
              alt="Captured meal"
              className="h-64 object-contain rounded-lg mx-auto"
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            {analyzing ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Leaf size={32} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Analyzing your meal...
                  </h3>
                  <p className="text-gray-600">
                    Using AI to identify food items
                  </p>
                </div>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            ) : results ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {results.totalCarbon} kg CO₂
                  </h3>
                  <p className="text-gray-600">Carbon footprint of your meal</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Breakdown:</h4>
                  {results.breakdown.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium">{item.item}</span>
                      <span className="text-gray-600">
                        {item.carbon} kg CO₂
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={reset}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
                  >
                    Retake Photo
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors cursor-pointer">
                    Save Entry
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
