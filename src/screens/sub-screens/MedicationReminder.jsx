import React, { useState, useEffect } from 'react';
import Section from '../../components/Section';


const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const getStoredReminders = () => {
  const stored = JSON.parse(localStorage.getItem("medicationReminders")) || [];
  const now = new Date();
  return stored.filter(reminder => new Date(reminder.end) >= now);
};

const MedicationReminder = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [medName, setMedName] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState(today.toISOString().split('T')[0]);
  const [reminders, setReminders] = useState(getStoredReminders());

  useEffect(() => {
    localStorage.setItem("medicationReminders", JSON.stringify(reminders));
  }, [reminders]);

  const handleAddReminder = () => {
    if (!medName || !time || !duration || !startDate) return;

    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + parseInt(duration));

    const newReminder = {
      id: Date.now(),
      name: medName,
      time,
      start: start.toISOString(),
      end: end.toISOString(),
    };

    setReminders(prev => [...prev, newReminder]);

    setMedName("");
    setTime("");
    setDuration("");
    setStartDate(today.toISOString().split('T')[0]);
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => new Date(currentYear, currentMonth, i + 1));

  const isHighlighted = (date) => {
    return reminders.some(rem => {
      const start = new Date(rem.start);
      const end = new Date(rem.end);
      return date >= start && date <= end && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentYear, currentMonth + offset);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  return (
    <Section className="space-y-6">
      <div className="bg-stone-900 p-5 rounded-xl shadow-md space-y-4">
        <h2 className="text-stone-200 text-xl font-semibold">Medication Reminder</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={medName}
            onChange={(e) => setMedName(e.target.value)}
            placeholder="Medication Name"
            className="rounded-xl bg-stone-800 p-3 text-white"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-xl bg-stone-800 p-3 text-white"
          />
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration (days)"
            className="rounded-xl bg-stone-800 p-3 text-white"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-xl bg-stone-800 p-3 text-white"
          />
        </div>
        <button
          onClick={handleAddReminder}
          className="w-full bg-green-700 hover:bg-green-800 transition rounded-full text-white p-3 font-medium"
        >
          Set Reminder
        </button>
      </div>

      <div className="bg-stone-900 p-5 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => changeMonth(-1)} className="text-stone-400">◀</button>
          <h3 className="text-stone-200 text-lg font-semibold">
            {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <button onClick={() => changeMonth(1)} className="text-stone-400">▶</button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <div key={d} className="text-xs text-stone-500 text-center">{d}</div>
          ))}
          {calendarDays.map((date, idx) => (
            <div
              key={idx}
              className={`p-3 text-center rounded-xl text-sm ${isHighlighted(date) ? 'bg-green-600 text-white' : 'bg-stone-800 text-stone-300'}`}
            >
              {date.getDate()}
            </div>
          ))}
        </div>
      </div>

      {/* Medication Summary */}
      <div className="bg-stone-900 p-5 rounded-xl shadow-md space-y-4">
        <h3 className="text-stone-200 text-lg font-semibold">Current Medications</h3>
        {reminders.length === 0 ? (
          <p className="text-stone-500 text-sm">No active medications</p>
        ) : (
          reminders.map(rem => (
            <div key={rem.id} className="border border-stone-700 p-4 rounded-lg text-stone-200 space-y-1 bg-stone-800">
              <h4 className="text-md font-semibold">{rem.name}</h4>
              <p className="text-sm">Time to take: <span className="text-green-400">{rem.time}</span></p>
              <p className="text-sm">Start: {new Date(rem.start).toLocaleDateString()}</p>
              <p className="text-sm">Ends: {new Date(rem.end).toLocaleDateString()}</p>
              <p className="text-xs text-stone-400">Duration: {Math.ceil((new Date(rem.end) - new Date(rem.start)) / (1000 * 60 * 60 * 24))} days</p>
            </div>
          ))
        )}
      </div>
    </Section>
  );
};

export { MedicationReminder };
