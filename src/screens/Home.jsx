import React, { useEffect, useState } from 'react';
import Section from '../components/Section.jsx';
import DailyHealthTracker from '../components/DailyHealthTracker.jsx';
import { BloodPressureTracker } from '../components/BloodPressure.jsx';
import { PatientNavLabels } from '../constants/const.js';

const Home = ({ setScreen, theme, transition }) => {
  const [appointments, setAppointments] = useState([]);
  const isLight = theme === 'light';

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patient_appointments")) || [];

    const upcoming = stored
      .filter(appt => new Date(appt.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    setAppointments(upcoming);
  }, []);

  const cancelAppointment = (id) => {
    const updated = appointments.filter(appt => appt.id !== id);
    setAppointments(updated);
    localStorage.setItem("patient_appointments", JSON.stringify(updated));
  };

  const rescheduleAppointment = (appt) => {
    localStorage.setItem("reschedule_appointment", JSON.stringify(appt));
    setScreen(PatientNavLabels.Appointments);
  };

  const cardBg = isLight ? "bg-white " : "bg-neutral-800 border-stone-500";
  const cardText = isLight ? "text-black" : "text-stone-100";
  const subText = isLight ? "text-gray-500" : "text-stone-400";

  return (
    <Section className="md:px-6 py-8 space-y-6" theme={theme}>
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

      {/* Appointments */}
      <div className={`${cardBg} rounded-2xl p-5 shadow-md border-t pb-5`}>
        <h2 className={`tracking-wide text-md font-medium mb-3 ${cardText}`}>Upcoming Appointments</h2>
        {appointments.length === 0 ? (
          <p className={`${subText} text-sm tracking-wide`}>You have no upcoming appointments 📭</p>
        ) : (
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            <ul className="space-y-3 text-sm">
              {appointments.map((appt, i) => (
                <li key={appt.id} className={`p-6 rounded-lg border-t shadow-md ${isLight ? "border-gray-200 bg-neutral-100" : "border-stone-700 bg-stone-900"}`}>
                  <article className="flex flex-col gap-1">
                    <p><strong>Type:</strong> {appt.appointmentType}</p>
                    <p><strong>Doctor:</strong> {appt.doctor}</p>
                    <p><strong>Date:</strong> {appt.date}</p>
                    <p><strong>Time:</strong> {appt.time}</p>
                    <p><strong>Reason:</strong> {appt.reason}</p>
                    <div className="flex gap-2 mt-5">
                      <button
                        type="button"
                        className="text-white bg-gradient-to-b from-green-400 to-green-600 transform hover:scale-105 shadow-md rounded-full p-2"
                        onClick={() => rescheduleAppointment(appt)}
                      >
                        Reschedule
                      </button>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 font-medium"
                        onClick={() => cancelAppointment(appt.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Trackers */}
      <DailyHealthTracker theme={theme} />
      <BloodPressureTracker theme={theme} />
      <div className="sm:hidden h-[4rem]" aria-hidden={true}></div>
    </Section>
  );
};

export { Home };
