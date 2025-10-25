import { Camera, Edit3 } from "lucide-react";

export default function QuickActionMenu({
  isOpen,
  onClose,
  onCapture,
  onManualEntry,
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/30 flex items-end justify-center p-4 z-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-3xl w-full max-w-md p-6 transform transition-all duration-300"
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

        <h3 className="text-lg font-semibold text-center mb-6">
          Quick Actions
        </h3>

        <div className="space-y-3">
          <button
            onClick={onCapture}
            className="w-full flex items-center gap-4 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <Camera size={24} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-800">Capture Meal</div>
              <div className="text-sm text-gray-600">
                Take photo for AI analysis
              </div>
            </div>
          </button>

          <button
            onClick={onManualEntry}
            className="w-full flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Edit3 size={24} className="text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-800">Manual Entry</div>
              <div className="text-sm text-gray-600">
                Add meal details manually
              </div>
            </div>
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
