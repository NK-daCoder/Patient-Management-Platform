import React from "react";

const RefillRequestModal = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  const isLight = theme === "light";

  return (
    <div
      className="fixed inset-0 z-50 top-0 left-0 flex items-center justify-center backdrop-blur-md bg-black/30 transition-all"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-[90%] max-w-md p-6 rounded-2xl shadow-lg border backdrop-blur-2xl transition-all transform scale-100 ${
          isLight
            ? "bg-white/60 border-gray-300 text-gray-800"
            : "bg-stone-900/60 border-stone-700 text-white"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">📦 Request Refill</h2>
          <button
            onClick={onClose}
            className={`text-sm px-3 py-1 rounded-md font-medium transition ${
              isLight
                ? "bg-gray-200 hover:bg-gray-300"
                : "bg-stone-800 hover:bg-stone-700"
            }`}
          >
            Close
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Medication Name</label>
            <input
              type="text"
              placeholder="e.g., Ibuprofen"
              className={`w-full px-4 py-2 rounded-lg bg-opacity-50 backdrop-blur-md ${
                isLight
                  ? "bg-white text-black border border-gray-300"
                  : "bg-stone-800 text-white border border-stone-600"
              } focus:outline-none focus:ring-2 focus:ring-green-400`}
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Dosage</label>
            <input
              type="text"
              placeholder="e.g., 200mg"
              className={`w-full px-4 py-2 rounded-lg bg-opacity-50 backdrop-blur-md ${
                isLight
                  ? "bg-white text-black border border-gray-300"
                  : "bg-stone-800 text-white border border-stone-600"
              } focus:outline-none focus:ring-2 focus:ring-green-400`}
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Quantity</label>
            <input
              type="number"
              placeholder="e.g., 30"
              className={`w-full px-4 py-2 rounded-lg bg-opacity-50 backdrop-blur-md ${
                isLight
                  ? "bg-white text-black border border-gray-300"
                  : "bg-stone-800 text-white border border-stone-600"
              } focus:outline-none focus:ring-2 focus:ring-green-400`}
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Preferred Pharmacy</label>
            <input
              type="text"
              placeholder="e.g., Clicks, Dis-Chem..."
              className={`w-full px-4 py-2 rounded-lg bg-opacity-50 backdrop-blur-md ${
                isLight
                  ? "bg-white text-black border border-gray-300"
                  : "bg-stone-800 text-white border border-stone-600"
              } focus:outline-none focus:ring-2 focus:ring-green-400`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-semibold bg-green-500 hover:bg-green-600 transition"
          >
            Submit Refill Request
          </button>
        </form>
      </div>
    </div>
  );
};

export { RefillRequestModal };
