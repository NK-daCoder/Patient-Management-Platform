import React, { useEffect, useState } from 'react';
import Section from '../components/Section.jsx';
import DailyHealthTracker from '../components/DailyHealthTracker.jsx';
import { BloodPressureTracker } from '../components/BloodPressure.jsx';
import { PatientNavLabels } from '../constants/const.js';

const Home = ({ setScreen }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];

    const upcoming = stored
      .filter(appt => new Date(appt.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setAppointments(upcoming);
  }, []);

  const cancelAppointment = (id) => {
    const updated = appointments.filter(appt => appt.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const rescheduleAppointment = (appt) => {
    // You could store the selected appt in localStorage and redirect
    localStorage.setItem("reschedule_appointment", JSON.stringify(appt));
    setScreen(PatientNavLabels.Appointments);
  };

  return (
    <Section className="px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-stone-100 tracking-tight">
            Welcome back, Nehemiah 👋
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            Let’s take care of your health today.
          </p>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Consult Doctor", icon: "🩺", renderOnClick: () => setScreen(PatientNavLabels.Consultation) },
          { label: "Book Appointment", icon: "📅", renderOnClick: () => setScreen(PatientNavLabels.Appointments) },
          { label: "Prescriptions", icon: "💊", renderOnClick: () => setScreen(PatientNavLabels.Medications) },
          { label: "Records", icon: "📁", renderOnClick: () => setScreen(PatientNavLabels.Records) },
          { label: "Notifications", icon: "📣", renderOnClick: () => setScreen(PatientNavLabels.Notifications) },
          { label: "Emergency", icon: "🚨", renderOnClick: () => setScreen(PatientNavLabels.Emergency) },
        ].map(({ label, icon, renderOnClick }) => (
          <button
            key={label}
            onClick={renderOnClick}
            className="bg-neutral-800 hover:bg-neutral-700 transition rounded-2xl p-4 flex flex-col items-center justify-center text-stone-200 shadow-inner"
          >
            <span className="text-2xl">{icon}</span>
            <span className="mt-2 text-sm">{label}</span>
          </button>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-neutral-800 rounded-2xl p-5 shadow-inner">
        <h2 className="text-lg font-medium text-stone-100 mb-3">Upcoming Appointments</h2>

        {appointments.length === 0 ? (
          <p className="text-stone-500 text-sm">You have no upcoming appointments 📭</p>
        ) : (
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="bg-neutral-900 p-4 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0"
              >
                <div>
                  <p className="text-stone-200 text-sm font-medium">
                    {appt.doctor} — {new Date(appt.date).toDateString()}
                  </p>
                  <p className="text-stone-400 text-xs mt-1">"{appt.reason}"</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => rescheduleAppointment(appt)}
                    className="px-3 py-1 rounded-xl bg-blue-700 border-t border-blue-500 text-xs text-white hover:bg-blue-600 transition"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => cancelAppointment(appt.id)}
                    className="px-3 py-1 rounded-xl bg-rose-600 border-t border-rose-400 text-xs text-white hover:bg-rose-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Medication Summary */}
      <div className="bg-neutral-800 rounded-2xl p-5 shadow-inner">
        <h2 className="text-lg font-medium text-stone-100 mb-2">Current Prescriptions</h2>
        <ul className="space-y-2 text-sm text-stone-400">
          <li>• Lisinopril 10mg – 2 Refills Left</li>
          <li>• Metformin 500mg – 1 Refill Left</li>
          <li>• Vitamin D – Active</li>
        </ul>
      </div>

      {/* Trackers */}
      <div className="grid gap-4">
        <DailyHealthTracker />
        <BloodPressureTracker />
      </div>
    </Section>
  );
};

export { Home };
