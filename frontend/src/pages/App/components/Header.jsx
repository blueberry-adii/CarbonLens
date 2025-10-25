import { Leaf } from "lucide-react";

export default function Header({
  title,
  subtitle,
  showBack = false,
  onBack,
  actions,
}) {
  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-b-3xl shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Leaf size={28} />
              {title}
            </h1>
            {subtitle && (
              <p className="text-green-100 text-sm mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </div>
  );
}
