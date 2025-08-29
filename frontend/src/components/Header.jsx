import { Leaf, Menu } from "lucide-react";

export default function Header() {
  return (
    <div className="p-4 rounded-b-lg shadow-xl">
      <div className="text-2xl font-bold flex items-center justify-between max-w-[1280px] mx-auto">
        <div className="flex items-center gap-4">
          <Leaf
            size={40}
            className="text-emerald-600 bg-emerald-100 p-1.5 rounded-md"
          />
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
