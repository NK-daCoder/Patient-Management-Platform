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

const BloodPressureTracker = () => {
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

  return (
    <div className="bg-stone-900 rounded-xl p-6 shadow-lg space-y-6 w-full mx-auto">
      <h2 className="text-stone-300 text-lg font-semibold">Blood Pressure Tracker</h2>

      {/* Input fields */}
      <div className="grid grid-cols-3 gap-4 text-sm text-stone-400">
        <div>
          <input
            type="number"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            placeholder="Systolic"
            className="w-full bg-stone-800 text-white text-center rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <p className="mt-1 text-center">Systolic</p>
        </div>
        <div>
          <input
            type="number"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            placeholder="Diastolic"
            className="w-full bg-stone-800 text-white text-center rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <p className="mt-1 text-center">Diastolic</p>
        </div>
        <div>
          <input
            type="number"
            value={pulse}
            onChange={(e) => setPulse(e.target.value)}
            placeholder="Pulse"
            className="w-full bg-stone-800 text-white text-center rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <p className="mt-1 text-center">Pulse (bpm)</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full mt-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition"
      >
        Save Today's BP
      </button>

      {/* Blood Pressure Chart */}
      <div className="bg-stone-800 rounded-lg p-4 mt-6">
        <h3 className="text-stone-300 text-sm font-semibold mb-3">BP Trend (7 Days)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis domain={[50, 180]} tickCount={6} stroke="#aaa" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1e1e1e", borderRadius: "0.5rem", border: "none" }}
              labelStyle={{ color: "#ccc" }}
              itemStyle={{ color: "#fff" }}
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
