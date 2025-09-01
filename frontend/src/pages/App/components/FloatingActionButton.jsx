import { Plus } from "lucide-react";

export default function FloatingActionButton({
  onClick,
  icon: Icon = Plus,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-30 ${className}`}
    >
      <Icon size={24} />
    </button>
  );
}
