import React from 'react'
import Section from '../components/Section.jsx';
import DailyHealthTracker from '../components/DailyHealthTracker.jsx';
import { BloodPressureTracker } from '../components/BloodPressure.jsx';
import { PatientDashboardElements, PatientNavLabels } from '../constants/const.js';

const Home = ({setScreen}) => {
  return (
    <Section className="px-6 py-8 space-y-6">
          {/* Welcome Header */}
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

          {/* Quick Access Cards */}
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
                onClick={ renderOnClick }
                className="bg-neutral-800 hover:bg-neutral-700 transition rounded-2xl p-4 flex flex-col items-center justify-center text-stone-200 shadow-inner"
              >
                <span className="text-2xl">{icon}</span>
                <span className="mt-2 text-sm">{label}</span>
              </button>
            ))}
          </div>

          {/* Upcoming Appointment Card */}
          <div className="bg-neutral-800 rounded-2xl p-5 shadow-inner">
            <h2 className="text-lg font-medium text-stone-100 mb-1">Your next appointment</h2>
            <p className="text-stone-400 text-sm">With Dr. Langa — 12 June, 10:30 AM</p>
            <div className="flex space-x-3 mt-4">
              <button className="px-4 py-2 rounded-xl bg-stone-700 border-t border-stone-500 text-sm text-white hover:bg-stone-600 transition">
                Reschedule
              </button>
              <button className="px-4 py-2 rounded-xl bg-rose-600 border-t border-rose-400 shadow-md text-sm text-white hover:bg-rose-500 transition">
                Cancel
              </button>
            </div>
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

          {/* Daily Health Tracker */}
          <div className="grid gap-4">
            <DailyHealthTracker/>
            <BloodPressureTracker/>
          </div>
    </Section>
  )
}

export { Home }