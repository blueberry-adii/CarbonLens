export default function StatsCard({
  icon: Icon,
  title,
  value,
  subtitle,
  color = "green",
  trend,
}) {
  const colorClasses = {
    green: "bg-green-500 text-green-600",
    blue: "bg-blue-500 text-blue-600",
    purple: "bg-purple-500 text-purple-600",
    orange: "bg-orange-500 text-orange-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${
            colorClasses[color].split(" ")[0]
          } rounded-xl flex items-center justify-center`}
        >
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <div
            className={`text-xs px-2 py-1 rounded-full ${
              trend > 0
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}
