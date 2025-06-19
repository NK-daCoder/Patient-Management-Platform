import React, { useEffect, useState } from 'react';
import Section from '../components/Section.jsx';
import DailyHealthTracker from '../components/DailyHealthTracker.jsx';
import { BloodPressureTracker } from '../components/BloodPressure.jsx';
import { PatientNavLabels } from '../constants/const.js';

const Home = ({ setScreen, theme, transition }) => {
  const [appointments, setAppointments] = useState([]);
  const isLight = theme === 'light';

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
    localStorage.setItem("reschedule_appointment", JSON.stringify(appt));
    setScreen(PatientNavLabels.Appointments);
  };

  const cardBg = isLight ? "bg-white " : "bg-neutral-800 border-stone-500";
  const cardText = isLight ? "text-black" : "text-stone-100";
  const subText = isLight ? "text-gray-500" : "text-stone-400";
  const buttonStyle = isLight
    ? "bg-white/60 text-stone-900 font-medium  hover:border-green-300 shadow-lg hover:shadow-green-600/50"
    : "bg-neutral-800 hover:bg-green-700 text-stone-200 border-t border-stone-600 shadow-lg hover:shadow-green-800/50";

  return (
    <Section className="px-6 py-8 space-y-6" theme={theme}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-xl font-semibold tracking-wide ${cardText}`}>
            Welcome back, Nehemiah 👋
          </h1>
          <p className={`mt-1 text-sm tracking-wide ${subText}`}>
            Let’s take care of your health today.
          </p>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-5">
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
            className={`${buttonStyle} transition transform  bg-gradient-to-b hover:from-green-500 hover:to-green-700 hover:text-white hover:scale-105 rounded-2xl px-4 p-6 flex flex-col items-center justify-center active:scale-95`}
          >
            <span className="text-lg">{icon}</span>
            <span className="mt-1 text-sm tracking-wide">{label}</span>
          </button>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div className={`${cardBg} rounded-2xl p-5 shadow-md border-t pb-5`}>
        <h2 className={`tracking-wide text-md font-medium mb-3 ${cardText}`}>Upcoming Appointments</h2>
        {appointments.length === 0 ? (
          <p className={`${subText} text-sm tracking-wide`}>You have no upcoming appointments 📭</p>
        ) : (
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className={`${isLight ? "bg-gray-50" : "bg-neutral-900"} p-4 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0`}
              >
                <div>
                  <p className={`${cardText} text-sm font-medium`}>
                    {appt.doctor} — {new Date(appt.date).toDateString()}
                  </p>
                  <p className={`${subText} text-xs mt-1`}>"{appt.reason}"</p>
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
      <div className={`${cardBg} rounded-2xl p-5 shadow-md border-t pb-5`}>
        <h2 className={`text-lg font-medium mb-2 ${cardText}`}>Current Prescriptions</h2>
        <ul className={`space-y-2 text-sm ${subText}`}>
          <li>• Lisinopril 10mg – 2 Refills Left</li>
          <li>• Metformin 500mg – 1 Refill Left</li>
          <li>• Vitamin D – Active</li>
        </ul>
      </div>

      {/* Trackers */}
      <div className="grid gap-4">
        <DailyHealthTracker theme={theme} />
        <BloodPressureTracker theme={theme}/>
      </div>
    </Section>
  );
};

export { Home };
