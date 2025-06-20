import React, { useState, useEffect } from "react";
import Section from "../components/Section";

const appointmentTypes = {
  Dental: ["Dr. Smile", "Dr. Molara"],
  Surgical: ["Dr. Cutwell", "Dr. Stitch"],
  Therapeutic: ["Dr. Calm", "Dr. Heal"],
  Pediatric: ["Dr. Kidd", "Dr. Junior"],
};

const Appointments = ({ theme }) => {
  const [appointmentType, setAppointmentType] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patient_appointments")) || [];
    setAppointments(stored);
  }, []);

  const saveAppointment = () => {
    if (!appointmentType || !doctor || !date || !time || !reason.trim()) {
      alert("⛔ Please fill in all the fields including reason for visit.");
      return;
    }

    const newAppointment = { appointmentType, doctor, date, time, reason };
    const updated = [...appointments, newAppointment];
    localStorage.setItem("patient_appointments", JSON.stringify(updated));
    setAppointments(updated);

    // Reset fields
    setAppointmentType("");
    setDoctor("");
    setDate("");
    setTime("");
    setReason("");
  };

  const isLight = theme === "light";
  const cardStyle = isLight ? "bg-white text-black" : "bg-neutral-900 text-stone-300";
  const glassStyle = "backdrop-blur-md bg-white/10 border border-white/10 shadow-xl";

  return (
    <Section className={`w-full container mx-auto rounded-xl p-6 ${cardStyle}`} theme={theme}>
      <h2 className="text-xl font-semibold mb-4">📅 Book an Appointment</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Appointment Type */}
        <div>
          <label className="text-sm mb-1 block">Type</label>
          <select
            value={appointmentType}
            onChange={(e) => {
              setAppointmentType(e.target.value);
              setDoctor("");
            }}
            className={`w-full py-2 px-3 rounded-lg text-sm focus:outline-none focus:ring-2 ${
              isLight ? "bg-gray-100 text-black" : "bg-stone-800 text-white"
            }`}
          >
            <option value="">Select type</option>
            {Object.keys(appointmentTypes).map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Doctor */}
        <div>
          <label className="text-sm mb-1 block">Doctor</label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            disabled={!appointmentType}
            className={`w-full py-2 px-3 rounded-lg text-sm focus:outline-none focus:ring-2 ${
              isLight ? "bg-gray-100 text-black" : "bg-stone-800 text-white"
            }`}
          >
            <option value="">Select doctor</option>
            {appointmentTypes[appointmentType]?.map((doc) => (
              <option key={doc}>{doc}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="text-sm mb-1 block">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full py-2 px-3 rounded-lg text-sm focus:outline-none focus:ring-2 ${
              isLight ? "bg-gray-100 text-black" : "bg-stone-800 text-white"
            }`}
          />
        </div>

        {/* Time */}
        <div>
          <label className="text-sm mb-1 block">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={`w-full py-2 px-3 rounded-lg text-sm focus:outline-none focus:ring-2 ${
              isLight ? "bg-gray-100 text-black" : "bg-stone-800 text-white"
            }`}
          />
        </div>
      </div>

      {/* Reason */}
      <div className="mt-4">
        <label className="text-sm mb-1 block">Reason for Appointment</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows="4"
          placeholder="Describe symptoms or reason for visit..."
          className={`w-full rounded-lg py-2 px-3 text-sm resize-none focus:outline-none focus:ring-2 ${
            isLight ? "bg-gray-100 text-black" : "bg-stone-800 text-white"
          }`}
        />
      </div>

      <button
        onClick={saveAppointment}
        className="mt-6 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
      >
        Save Appointment
      </button>

      {/* Display Appointments */}
      {appointments.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">Your Appointments</h3>
          <ul className="space-y-3 text-sm">
            {appointments.map((appt, i) => (
              <li key={`appt-${i}`} className={`p-3 rounded-lg border ${isLight ? "border-gray-200" : "border-stone-700"}`}>
                <p><strong>Type:</strong> {appt.appointmentType}</p>
                <p><strong>Doctor:</strong> {appt.doctor}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p><strong>Reason:</strong> {appt.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
};

export { Appointments };
