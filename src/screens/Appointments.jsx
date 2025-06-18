import React, { useState, useEffect } from 'react';
import Section from "../components/Section.jsx";
import Dropdown from '../components/Dropdown.jsx';

const doctorList = [
  { id: 'doc1', label: 'Dr. Amanda Blake - General Practitioner' },
  { id: 'doc2', label: 'Dr. Jacob Mokoena - Dentist' },
  { id: 'doc3', label: 'Dr. Leila Patel - Therapist' }
];

const Appointments = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [rescheduleId, setRescheduleId] = useState(null);

  useEffect(() => {
    // Load appointments
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);

    // Check if we're rescheduling
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

    let updated;

    if (rescheduleId) {
      // Remove old appointment and replace with new
      updated = appointments.filter(appt => appt.id !== rescheduleId);
      updated.push(newAppt);
    } else {
      updated = [...appointments, newAppt];
    }

    localStorage.setItem("appointments", JSON.stringify(updated));
    localStorage.removeItem("reschedule_appointment");
    setAppointments(updated);

    // Reset form
    setSelectedDoctor("");
    setReason("");
    setDate("");
    setRescheduleId(null);

    alert(rescheduleId ? "🔄 Appointment rescheduled!" : "✅ Appointment scheduled!");
  };

  return (
    <Section className="flex flex-col mx-auto container">
      <h1 className="tracking-wide text-white text-lg">
        {rescheduleId ? "Reschedule Appointment" : "Hey There 👋"}
      </h1>
      <p className="text-sm text-stone-600 my-1">
        {rescheduleId
          ? "Update the details below to reschedule your appointment."
          : "Fill out the form below to schedule an appointment in just 1 minute"}
      </p>

      <form onSubmit={handleSubmit} className="my-4 grid gap-5">
        {/* Doctor Selection */}
        <div className="flex flex-col gap-2">
          <h3 className="text-stone-500 text-sm">Select A Doctor</h3>
          <Dropdown
            data={doctorList}
            value={selectedDoctor}
            onChange={(val) => setSelectedDoctor(val)}
          />
        </div>

        {/* Reason */}
        <div className="flex flex-col gap-2">
          <h3 className="text-stone-500 text-sm">Reason for Appointment</h3>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="rounded-xl p-3 bg-stone-800 text-white h-40"
            placeholder="Describe your concern..."
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <h3 className="text-stone-500 text-sm">Expected Appointment Date</h3>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl p-3 bg-stone-800 text-white"
          />
        </div>

        <button
          type="submit"
          className='bg-green-700 border-t border-green-500 hover:bg-green-800 tracking-wide shadow-md mt-4 rounded-full text-white p-3'
        >
          {rescheduleId ? "Update Appointment" : "Schedule Appointment"}
        </button>
      </form>
    </Section>
  );
};

export { Appointments };
