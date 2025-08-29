import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

export default function PopupForm() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  });

  return (
    <div className="inline-block">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-colors ease-in-out px-4 py-2 max-[640px]:px-3 max-[640px]:py-1.5 rounded-md text-white cursor-pointer drop-shadow-lg"
      >
        <Plus size={18} />{" "}
        <p className="max-[640px]:text-sm max-[450px]:hidden">Add Food</p>
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/25 bg-opacity-25 flex items-center justify-center z-50 transition-opacity duration-150 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-2xl shadow-lg p-6 w-96 transform transition-all duration-150 
                       ${
                         open ? "opacity-100 scale-100" : "opacity-0 scale-75"
                       }`}
        >
          <h2 className="text-lg font-semibold mb-4">Add a Food Item</h2>
          <form className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1">
              <label htmlFor="food1" className="flex items-center gap-2">
                Food Item 1 <p className="text-red-400 text-xs">*required</p>
              </label>
              <input
                id="food1"
                type="text"
                required
                className="border border-black/25 outline-none rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="food2">Food Item 2</label>
              <input
                type="text"
                className="border border-black/25 outline-none rounded px-3 py-2"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="food3">Food Item 3</label>
              <input
                type="text"
                className="border border-black/25 outline-none rounded px-3 py-2"
              />
            </div>

            <TimeInputNow />

            <div className="flex justify-between space-x-2 mt-4">
              <button
                type="submit"
                className="px-4 py-2 grow bg-emerald-500 hover:bg-emerald-600 text-white rounded-md cursor-pointer transition-colors ease-in-out"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 grow bg-gray-200 rounded hover:bg-gray-300 cursor-pointer transition-colors ease-in-out"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const TimeInputNow = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setTime(`${hours}:${minutes}`);
  }, []);

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor="time">Time</label>
      <input
        id="time"
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border border-black/25 outline-none rounded px-3 py-2"
      />
    </div>
  );
};
