import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const getDateKey = () => {
  return `bpTracker-${new Date().toISOString().split("T")[0]}`;
};

const BloodPressureTracker = ({ theme }) => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(getDateKey())) || {};
    setSystolic(stored.systolic ?? "");
    setDiastolic(stored.diastolic ?? "");
    setPulse(stored.pulse ?? "");
    refreshChart();
  }, []);

  const handleSubmit = () => {
    const data = {
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      pulse: Number(pulse),
    };
    localStorage.setItem(getDateKey(), JSON.stringify(data));
    refreshChart();
    alert("Blood pressure saved 🩸");
  };

  const refreshChart = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = `bpTracker-${d.toISOString().split("T")[0]}`;
      const entry = JSON.parse(localStorage.getItem(key));
      data.push({
        date: d.toLocaleDateString("en-GB", { weekday: "short" }),
        systolic: entry?.systolic ?? null,
        diastolic: entry?.diastolic ?? null,
      });
    }
    setChartData(data);
  };

  const isLight = theme === "light";

  return (
    <div
      className={`rounded-xl p-6 shadow-lg space-y-6 w-full mx-auto ${
        isLight ? "bg-white text-gray-900" : "bg-stone-900 text-stone-300"
      }`}
    >
      <h2 className="text-lg font-semibold">Blood Pressure Tracker</h2>

      {/* Input fields */}
      <div
        className={`grid grid-cols-3 gap-4 text-sm ${
          isLight ? "text-gray-700" : "text-stone-400"
        }`}
      >
        {[["Systolic", systolic, setSystolic], ["Diastolic", diastolic, setDiastolic], ["Pulse", pulse, setPulse]].map(
          ([label, value, setter], idx) => (
            <div key={idx}>
              <input
                type="number"
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={label}
                className={`w-full ${
                  isLight
                    ? "bg-gray-100 text-black"
                    : "bg-stone-800 text-white"
                } text-center rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400`}
              />
              <p className="mt-1 text-center">{label === "Pulse" ? "Pulse (bpm)" : label}</p>
            </div>
          )
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`w-full mt-4 py-2 text-sm font-semibold text-white rounded-lg transition ${
          isLight ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        Save Today's BP
      </button>

      {/* Chart */}
      <div
        className={`rounded-lg p-4 mt-6 ${
          isLight ? "bg-gray-100" : "bg-stone-800"
        }`}
      >
        <h3 className="text-sm font-semibold mb-3">
          BP Trend (7 Days)
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <XAxis
              dataKey="date"
              stroke={isLight ? "#555" : "#aaa"}
            />
            <YAxis
              domain={[50, 180]}
              tickCount={6}
              stroke={isLight ? "#555" : "#aaa"}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isLight ? "#f9f9f9" : "#1e1e1e",
                borderRadius: "0.5rem",
                border: "none",
              }}
              labelStyle={{ color: isLight ? "#333" : "#ccc" }}
              itemStyle={{ color: isLight ? "#111" : "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="systolic"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Systolic"
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Diastolic"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { BloodPressureTracker };
