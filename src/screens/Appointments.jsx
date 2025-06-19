import React, { useState, useEffect } from 'react';
import Section from "../components/Section.jsx";
import Dropdown from '../components/Dropdown.jsx';

const doctorList = [
  { id: 'doc1', label: 'Dr. Amanda Blake - General Practitioner' },
  { id: 'doc2', label: 'Dr. Jacob Mokoena - Dentist' },
  { id: 'doc3', label: 'Dr. Leila Patel - Therapist' }
];

const Appointments = ({ theme }) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [rescheduleId, setRescheduleId] = useState(null);

  const isLight = theme === 'light';
  const bgColor = isLight ? "bg-white" : "bg-neutral-900";
  const textColor = isLight ? "text-black" : "text-white";
  const subText = isLight ? "text-gray-600" : "text-stone-500";
  const inputBg = isLight ? "bg-white text-black border-stone-200" : "bg-stone-800 text-white border-stone-500";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);

    const rescheduleData = JSON.parse(localStorage.getItem("reschedule_appointment"));
    if (rescheduleData) {
      const { doctor, reason, date, id } = rescheduleData;
      const matchedDoctor = doctorList.find(doc => doctor.includes(doc.label));
      setSelectedDoctor(matchedDoctor?.id || "");
      setReason(reason);
      setDate(date);
      setRescheduleId(id);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !reason || !date) {
      alert("Please fill out all fields");
      return;
    }

    const doctorName = doctorList.find(doc => doc.id === selectedDoctor)?.label || "Unknown Doctor";

    const newAppt = {
      id: rescheduleId || Date.now(),
      doctor: doctorName,
      reason,
      date
    };

    const updated = rescheduleId
      ? appointments.filter(appt => appt.id !== rescheduleId).concat(newAppt)
      : [...appointments, newAppt];

    localStorage.setItem("appointments", JSON.stringify(updated));
    localStorage.removeItem("reschedule_appointment");
    setAppointments(updated);

    setSelectedDoctor("");
    setReason("");
    setDate("");
    setRescheduleId(null);

    alert(rescheduleId ? "🔄 Appointment rescheduled!" : "✅ Appointment scheduled!");
  };

  return (
    <Section className={`flex flex-col mx-auto container ${textColor}`} theme={theme}>
      <h1 className={`tracking-wide text-2xl font-semibold ${textColor}`}>
        {rescheduleId ? "📅 Reschedule Appointment" : "Hey There 👋"}
      </h1>
      <p className={`text-sm mt-1 ${subText}`}>
        {rescheduleId
          ? "Update the details below to reschedule your appointment."
          : "Fill out the form below to schedule an appointment in just 1 minute."}
      </p>

      <form onSubmit={handleSubmit} className="my-6 grid gap-5">
        {/* Doctor Selection */}
        <div className="flex flex-col gap-2">
          <h3 className={`${subText} text-sm font-medium`}>Select A Doctor</h3>
          <Dropdown
            data={doctorList}
            value={selectedDoctor}
            onChange={(val) => setSelectedDoctor(val)}
            theme={theme}
          />
        </div>

        {/* Reason for Appointment */}
        <div className="flex flex-col gap-2">
          <h3 className={`${subText} text-sm font-medium`}>Reason for Appointment</h3>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className={`rounded-xl p-3 h-40 resize-none shadow-sm border-t text-sm ${inputBg}`}
            placeholder="Describe your concern..."
          />
        </div>

        {/* Date Selection */}
        <div className="flex flex-col gap-2">
          <h3 className={`${subText} text-sm font-medium`}>Expected Appointment Date</h3>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`rounded-xl p-3 shadow-sm text-sm ${inputBg}`}
           
          />
        </div>

        <button
          type="submit"
          className={`rounded-full px-4 py-3 mt-4 font-medium tracking-wide shadow-md text-white transition ${
            rescheduleId
              ? 'bg-blue-700 border-t border-blue-500 hover:bg-blue-800'
              : 'bg-green-700 border-t border-green-500 hover:bg-green-800'
          }`}
        >
          {rescheduleId ? "Update Appointment" : "Schedule Appointment"}
        </button>
      </form>
    </Section>
  );
};

export { Appointments };
