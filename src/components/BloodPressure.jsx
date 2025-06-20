import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const getDateKey = () => `bpTracker-${new Date().toISOString().split("T")[0]}`;

const BloodPressureTracker = ({ theme }) => {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [chartData, setChartData] = useState([]);
  const [averages, setAverages] = useState({ systolic: 0, diastolic: 0, pulse: 0 });

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
    alert("🩸 Blood pressure saved!");
  };

  const refreshChart = () => {
    const data = [];
    let sumSystolic = 0, sumDiastolic = 0, sumPulse = 0, count = 0;

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = `bpTracker-${d.toISOString().split("T")[0]}`;
      const entry = JSON.parse(localStorage.getItem(key));
      const systolic = entry?.systolic ?? null;
      const diastolic = entry?.diastolic ?? null;
      const pulse = entry?.pulse ?? null;

      if (systolic && diastolic && pulse) {
        sumSystolic += systolic;
        sumDiastolic += diastolic;
        sumPulse += pulse;
        count++;
      }

      data.push({
        date: d.toLocaleDateString("en-GB", { weekday: "short" }),
        systolic,
        diastolic,
        pulse,
      });
    }

    setChartData(data);

    setAverages({
      systolic: count ? (sumSystolic / count).toFixed(1) : 0,
      diastolic: count ? (sumDiastolic / count).toFixed(1) : 0,
      pulse: count ? (sumPulse / count).toFixed(1) : 0,
    });
  };

  const handleExport = () => {
    let csv = "Date,Systolic,Diastolic,Pulse\n";
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const key = `bpTracker-${dateStr}`;
      const entry = JSON.parse(localStorage.getItem(key));
      if (entry) {
        csv += `${dateStr},${entry.systolic || ""},${entry.diastolic || ""},${entry.pulse || ""}\n`;
      }
    }

    // Add today explicitly in case user just saved
    const today = new Date().toISOString().split("T")[0];
    if (!csv.includes(today)) {
      csv += `${today},${systolic},${diastolic},${pulse}\n`;
    }

    csv += `\nAverages:,${averages.systolic},${averages.diastolic},${averages.pulse}`;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `bp-export-${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isLight = theme === "light";

  return (
    <div className={`rounded-xl p-6 shadow-lg space-y-6 w-full mx-auto ${isLight ? "bg-white text-gray-900" : "bg-stone-900 text-stone-300"}`}>
      <h2 className="text-lg font-semibold">🩸 Blood Pressure Tracker</h2>

      <p className="text-xs text-stone-500 italic">Today: {new Date().toDateString()}</p>

      {/* Inputs */}
      <div className={`grid grid-cols-3 gap-4 text-sm ${isLight ? "text-gray-700" : "text-stone-400"}`}>
        {[["Systolic", systolic, setSystolic], ["Diastolic", diastolic, setDiastolic], ["Pulse", pulse, setPulse]].map(([label, value, setter], idx) => (
          <div key={idx}>
            <input
              type="number"
              value={value}
              onChange={(e) => setter(e.target.value)}
              placeholder={label}
              className={`w-full ${isLight ? "bg-gray-100 text-black" : "bg-stone-800 text-white"} text-center rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400`}
            />
            <p className="mt-1 text-center">{label === "Pulse" ? "Pulse (bpm)" : label}</p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <button
          onClick={handleSubmit}
          className={`w-full sm:w-auto py-2 px-4 text-sm font-semibold text-white rounded-lg transition ${isLight ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-500"}`}
        >
          Save Today’s BP
        </button>

        <button
          onClick={handleExport}
          className={`w-full sm:w-auto py-2 px-4 text-sm font-medium text-white rounded-lg transition shadow-md bg-gradient-to-bl from-green-300 to-green-600 shadow-green-400 transform `}
        >
          📁 Export CSV
        </button>
      </div>

      {/* Averages Display */}
      <div className={`grid grid-cols-3 gap-4 text-center text-sm mt-2 ${isLight ? "text-stone-600" : "text-stone-400"}`}>
        <div><p>Avg Systolic</p><p className="text-lg font-semibold">{averages.systolic}</p></div>
        <div><p>Avg Diastolic</p><p className="text-lg font-semibold">{averages.diastolic}</p></div>
        <div><p>Avg Pulse</p><p className="text-lg font-semibold">{averages.pulse}</p></div>
      </div>

      {/* Chart */}
      <div className={`rounded-lg p-4 mt-6 ${isLight ? "bg-gray-100" : "bg-stone-800"}`}>
        <h3 className="text-sm font-semibold mb-3">📊 BP Trend (7 Days)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" stroke={isLight ? "#555" : "#aaa"} />
            <YAxis domain={[50, 180]} tickCount={6} stroke={isLight ? "#555" : "#aaa"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isLight ? "#f9f9f9" : "#1e1e1e",
                borderRadius: "0.5rem",
                border: "none",
              }}
              labelStyle={{ color: isLight ? "#333" : "#ccc" }}
              itemStyle={{ color: isLight ? "#111" : "#fff" }}
            />
            <Line type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Systolic" />
            <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Diastolic" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { BloodPressureTracker };
