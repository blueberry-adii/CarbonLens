import { Leaf, Menu } from "lucide-react";

export default function Header() {
  return (
    <div className="p-4 rounded-b-lg shadow-xl">
      <div className="text-2xl font-bold flex items-center justify-between max-w-[1280px] mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
            <Leaf size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h1>CarbonLens</h1>
            <h2 className="text-sm font-medium text-gray-400">
              Carbon Footprint Tracker
            </h2>
          </div>
        </div>
        <Menu size={32} className="cursor-pointer" />
      </div>
    </div>
  );
}
