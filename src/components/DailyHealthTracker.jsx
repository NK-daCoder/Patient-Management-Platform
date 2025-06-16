import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getTodayKey } from "../utils/utils";

const ChartBlock = ({ title, data, dataKey, color }) => (
  <div>
    <h4 className="text-stone-400 text-xs mb-1">{title}</h4>
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e1e1e",
            borderRadius: "0.5rem",
            border: "none",
          }}
          labelStyle={{ color: "#ccc" }}
          itemStyle={{ color: "#fff" }}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const DailyHealthTracker = () => {
  const [mood, setMood] = useState(5);
  const [steps, setSteps] = useState("");
  const [sleep, setSleep] = useState("");
  const [water, setWater] = useState("");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(getTodayKey())) || {};
    setMood(saved.mood ?? 5);
    setSteps(saved.steps ?? "");
    setSleep(saved.sleep ?? "");
    setWater(saved.water ?? "");
    refreshChart();
  }, []);

  const handleSubmit = () => {
    const data = {
      mood: Number(mood),
      steps: parseInt(steps),
      sleep: parseFloat(sleep),
      water: parseFloat(water),
    };
    localStorage.setItem(getTodayKey(), JSON.stringify(data));
    refreshChart();
    alert("✅ Today's health data saved!");
  };

  const refreshChart = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = `dailyTracker-${d.toISOString().split("T")[0]}`;
      const entry = JSON.parse(localStorage.getItem(key)) || {};
      data.push({
        date: d.toLocaleDateString("en-GB", { weekday: "short" }),
        mood: entry?.mood ?? null,
        sleep: parseFloat(entry?.sleep) || null,
        water: parseFloat(entry?.water) || null,
        steps: parseInt(entry?.steps) || null,
      });
    }
    setChartData(data);
  };

  return (
    <div className="bg-stone-900 border-t border-stone-500 rounded-xl p-6 shadow-lg space-y-6 w-full">
      <h2 className="text-stone-300 text-lg font-semibold">🩺 Daily Health Tracker</h2>

      {/* Mood Slider */}
      <div>
        <label className="block text-stone-400 text-sm mb-1">
          How are you feeling today?
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-xs text-stone-500 mt-1">
          <span>😞 Low</span>
          <span>😊 Great</span>
        </div>
        <p className="text-center text-2xl mt-2">
          {mood <= 3 ? "😟" : mood <= 6 ? "😐" : "😄"}
        </p>
      </div>

      {/* Metrics Inputs */}
      <div className="grid grid-cols-3 gap-4 text-sm text-stone-400">
        <div>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Steps"
            className="w-full bg-stone-800 text-white text-center rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <p className="mt-1 text-center">Steps</p>
        </div>
        <div>
          <input
            type="number"
            step="0.1"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            placeholder="Sleep"
            className="w-full bg-stone-800 text-white text-center rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <p className="mt-1 text-center">Sleep (hrs)</p>
        </div>
        <div>
          <input
            type="number"
            step="0.1"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            placeholder="Water"
            className="w-full bg-stone-800 text-white text-center rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <p className="mt-1 text-center">Water (L)</p>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSubmit}
        className="w-full mt-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition"
      >
        Save Today's Entry
      </button>

      {/* Charts Section */}
      <section className=" rounded-lg p-4 space-y-6 mt-8 gap-3">
        <h3 className="text-stone-300 text-sm font-semibold tracking-wide">📈 Weekly Overview</h3>
        <section className="grid md:grid-cols-2 gap-3">
            <div className="w-full bg-stone-800 p-5 rounded-lg border-t border-neutral-700 shadow-md">
                <ChartBlock title="Mood" data={chartData} dataKey="mood" color="#3b82f6" />
            </div>
            <div className="w-full bg-stone-800 p-5 rounded-lg border-t border-neutral-700 shadow-md">
                <ChartBlock title="Sleep (hrs)" data={chartData} dataKey="sleep" color="#10b981" />
            </div>
            <div className="w-full bg-stone-800 p-5 rounded-lg border-t border-neutral-700 shadow-md">
                <ChartBlock title="Water (L)" data={chartData} dataKey="water" color="#0ea5e9" />
            </div>
            <div className="w-full bg-stone-800 p-5 rounded-lg border-t border-neutral-700 shadow-md">
                <ChartBlock title="Steps" data={chartData} dataKey="steps" color="#f59e0b" />
            </div>
        </section>
      </section>
    </div>
  );
};

export default DailyHealthTracker;
