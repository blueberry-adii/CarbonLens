import { User } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [b1Active, setB1Active] = useState(true);
  const [b2Active, setB2Active] = useState(false);

  return (
    <div className="px-4 space-y-6 max-w-[1280px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 max-[640px]:gap-0">
          <h2 className="flex items-center gap-2 text-4xl max-[640px]:text-2xl max-[450px]:text-xl max-[450px]:gap-0 font-bold">
            Profile
          </h2>
          <p className="text-gray-500 max-[640px]:text-sm max-[450px]:text-xs">
            Edit settings and customize your profile
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User size={40} className="text-green-600" />
        </div>
        <h2 className="text-xl font-semibold">Aditya Prasad</h2>
        <p className="text-gray-600">Member since August 2024</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Settings</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Daily Reminders</span>
            <div
              className={`w-12 h-6 ${
                b1Active ? "bg-green-500" : "bg-gray-300"
              } rounded-full relative cursor-pointer`}
              onClick={() => {
                setB1Active(!b1Active);
              }}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute left-0.5 ${
                  b1Active ? "translate-x-6" : ""
                } top-0.5 transition-transform ease-in-out duration-150`}
              ></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Weekly Reports</span>
            <button
              className={`w-12 h-6 ${
                b2Active ? "bg-green-500" : "bg-gray-300"
              } rounded-full relative cursor-pointer`}
              onClick={() => {
                setB2Active(!b2Active);
              }}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute left-0.5 ${
                  b2Active ? "translate-x-6" : ""
                } top-0.5 transition-transform ease-in-out duration-150`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">About CarbonLens</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Track your carbon footprint through AI-powered meal analysis. Make
          conscious choices for a sustainable future.
        </p>
      </div>
    </div>
  );
}
