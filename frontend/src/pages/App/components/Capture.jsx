import { useState, useRef } from "react";
import { Camera, Upload, Leaf, CheckCircle } from "lucide-react";
import Header from "./Header";
import axios from "axios";

export default function CameraCapture() {
  const [file, setFile] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setFile(file);
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
    if (!file) return alert("No file selected");
    setAnalyzing(true);
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("http://localhost:5000/api/v1/carbon/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("Upload success: ", res.data);
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
      .catch((e) => console.log(e))
      .finally(() => {
        setAnalyzing(false);
      });
    // setTimeout(() => {
    //   setResults({
    //     items: [
    //       { name: "Grilled Salmon", carbon: 4.2 },
    //       { name: "Quinoa", carbon: 1.8 },
    //       { name: "Steamed Broccoli", carbon: 0.7 },
    //     ],
    //     totalCarbon: 6.7,
    //     confidence: 0.92,
    //     tips: [
    //       "Excellent sustainable choice!",
    //       "Salmon is a great protein with lower carbon impact",
    //       "Adding more vegetables reduces footprint further",
    //     ],
    //     comparison: { avgMeal: 12.5, savings: 5.8 },
    //   });
    //   setAnalyzing(false);
    // }, 3000);
  };

  const saveEntry = () => {
    console.log("Saving entry...");
    reset();
  };

  const reset = () => {
    setCapturedImage(null);
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
            Analyzing Your Meal
          </h3>
          <p className="text-gray-600">
            AI is identifying ingredients and calculating carbon footprint
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
        title="Capture Meal"
        subtitle="Snap a photo to track carbon footprint"
      />

      <div className="p-6 space-y-6 pb-24">
        {!capturedImage ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Camera size={48} className="text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Analyze?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Take a clear photo of your meal and our AI will identify
              ingredients and calculate the carbon footprint
            </p>

            <div className="space-y-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[101%] cursor-pointer shadow-lg"
              >
                <Upload size={24} />
                Choose Photo
              </button>

              <button className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer">
                <Camera size={24} />
                Take Photo
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
          </div>
        ) : results ? (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={capturedImage}
                alt="Analyzed meal"
                className="w-full h-64 object-cover"
              />
            </div>

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
                  {Math.round(results.confidence * 100)}% confidence
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
                  Retake Photo
                </button>
                <button
                  onClick={saveEntry}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={capturedImage}
              alt="Captured meal"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Retake
                </button>
                <button
                  onClick={analyzeImage}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
                >
                  Analyze
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
