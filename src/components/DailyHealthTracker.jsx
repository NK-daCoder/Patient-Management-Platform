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

const ChartBlock = ({ title, data, dataKey, color, theme }) => (
  <div className="w-full">
    <h4 className={`text-xs mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-stone-400'}`}>{title}</h4>
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke={theme === 'light' ? '#666' : '#aaa'} />
        <YAxis stroke={theme === 'light' ? '#666' : '#aaa'} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === 'light' ? "#f9f9f9" : "#1e1e1e",
            borderRadius: "0.5rem",
            border: "none",
          }}
          labelStyle={{ color: theme === 'light' ? "#444" : "#ccc" }}
          itemStyle={{ color: theme === 'light' ? "#000" : "#fff" }}
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

const DailyHealthTracker = ({ theme }) => {
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

  const bgCard = theme === 'light' ? 'bg-white border border-gray-200' : 'bg-stone-900 border-t border-stone-500';
  const textMain = theme === 'light' ? 'text-black' : 'text-stone-300';
  const textSecondary = theme === 'light' ? 'text-gray-700' : 'text-stone-400';
  const inputStyle = theme === 'light' ? 'bg-gray-100 text-black' : 'bg-stone-800 text-white';

  return (
    <div className={`${bgCard} rounded-xl p-4 sm:p-6 shadow-lg space-y-6 w-full transition-all`}>
      <h2 className={`text-lg font-semibold ${textMain}`}>🩺 Daily Health Tracker</h2>

      {/* Mood Tracker */}
      <div>
        <label className={`block text-sm mb-1 ${textSecondary}`}>How are you feeling today?</label>
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
        <p className="text-center text-3xl mt-2">{mood <= 3 ? "😟" : mood <= 6 ? "😐" : "😄"}</p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        {[
          { label: "Steps", value: steps, setValue: setSteps, placeholder: "Steps", type: "number" },
          { label: "Sleep (hrs)", value: sleep, setValue: setSleep, placeholder: "Sleep", type: "number", step: 0.1 },
          { label: "Water (L)", value: water, setValue: setWater, placeholder: "Water", type: "number", step: 0.1 },
        ].map(({ label, value, setValue, placeholder, type, step }, i) => (
          <div key={i}>
            <input
              type={type}
              step={step}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className={`w-full text-center rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-400 ${inputStyle}`}
            />
            <p className="mt-1 text-center">{label}</p>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSubmit}
        className="w-full mt-2 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition"
      >
        Save Today's Entry
      </button>

      {/* Charts Section */}
      <section className="rounded-lg p-4 space-y-6 mt-8 gap-3">
        <h3 className={`text-sm font-semibold tracking-wide ${textMain}`}>📈 Weekly Overview</h3>
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <ChartBlock title="Mood" data={chartData} dataKey="mood" color="#3b82f6" theme={theme} />
          <ChartBlock title="Sleep (hrs)" data={chartData} dataKey="sleep" color="#10b981" theme={theme} />
          <ChartBlock title="Water (L)" data={chartData} dataKey="water" color="#0ea5e9" theme={theme} />
          <ChartBlock title="Steps" data={chartData} dataKey="steps" color="#f59e0b" theme={theme} />
        </section>
      </section>
    </div>
  );
};

export default DailyHealthTracker;
