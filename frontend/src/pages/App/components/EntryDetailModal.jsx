import { X, Leaf, Edit3, Trash2 } from "lucide-react";

export default function EntryDetailModal({
  entry,
  isOpen,
  onClose,
  onDelete,
  onEdit,
}) {
  if (!isOpen || !entry) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Meal Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl mb-6 flex items-center justify-center">
            <Leaf size={48} className="text-green-600" />
          </div>

          <div className="text-center mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {entry.totalCarbon} kg
            </div>
            <div className="text-gray-600">Total Carbon Footprint</div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">
              Ingredient Breakdown
            </h3>
            <div className="space-y-2">
              {entry.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="text-gray-600">{item.carbon} kg CO₂</span>
                </div>
              ))}
            </div>
          </div>

          {entry.tips && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                💡 Sustainability Tips
              </h3>
              <div className="space-y-2">
                {entry.tips.map((tip, index) => (
                  <div
                    key={index}
                    className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg"
                  >
                    • {tip}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => onEdit(entry)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Edit3 size={18} />
              Edit
            </button>
            <button
              onClick={() => onDelete(entry.id)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
