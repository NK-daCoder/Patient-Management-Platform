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
  const [rescheduleId, setRescheduleId] = useState(null);

  // Load appointments
  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("patient_appointments")) || [];
    setAppointments(storedAppointments);

    const rescheduleData = JSON.parse(localStorage.getItem("reschedule_appointment"));
    if (rescheduleData) {
      setAppointmentType(rescheduleData.appointmentType);
      setDoctor(rescheduleData.doctor);
      setDate(rescheduleData.date);
      setTime(rescheduleData.time);
      setReason(rescheduleData.reason);
      setRescheduleId(rescheduleData.id);
      localStorage.removeItem("reschedule_appointment");
    }
  }, []);

  const saveAppointment = () => {
    if (!appointmentType || !doctor || !date || !time || !reason.trim()) {
      alert("⛔ Please fill in all the fields.");
      return;
    }

    const newAppointment = {
      id: rescheduleId || Date.now().toString(),
      appointmentType,
      doctor,
      date,
      time,
      reason,
    };

    let updatedAppointments;
    if (rescheduleId) {
      updatedAppointments = appointments.map(appt =>
        appt.id === rescheduleId ? newAppointment : appt
      );
    } else {
      updatedAppointments = [...appointments, newAppointment];
    }

    localStorage.setItem("patient_appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);

    // Reset form
    setAppointmentType("");
    setDoctor("");
    setDate("");
    setTime("");
    setReason("");
    setRescheduleId(null);
  };

  const isLight = theme === "light";
  const cardStyle = isLight ? "bg-white text-black" : "bg-neutral-900 text-stone-300";

  return (
    <Section className={`w-full container mx-auto rounded-xl p-6 ${cardStyle}`} theme={theme}>
      <h2 className="text-xl font-semibold mb-4">
        📅 {rescheduleId ? "Reschedule" : "Book"} an Appointment
      </h2>
      <form>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm mb-1 block">Type</label>
            <select
              value={appointmentType}
              onChange={(e) => {
                setAppointmentType(e.target.value);
                setDoctor(""); // reset doctor
              }}
              className={`w-full py-2 px-3 rounded-lg text-sm ${
                isLight ? "bg-gray-100" : "bg-stone-800 text-white"
              }`}
            >
              <option value="">Select type</option>
              {Object.keys(appointmentTypes).map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm mb-1 block">Doctor</label>
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              disabled={!appointmentType}
              className={`w-full py-2 px-3 rounded-lg text-sm ${
                isLight ? "bg-gray-100" : "bg-stone-800 text-white"
              }`}
            >
              <option value="">Select doctor</option>
              {appointmentTypes[appointmentType]?.map((doc) => (
                <option key={doc}>{doc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm mb-1 block">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full py-2 px-3 rounded-lg text-sm ${
                isLight ? "bg-gray-100" : "bg-stone-800 text-white"
              }`}
            />
          </div>

          <div>
            <label className="text-sm mb-1 block">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`w-full py-2 px-3 rounded-lg text-sm ${
                isLight ? "bg-gray-100" : "bg-stone-800 text-white"
              }`}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm mb-1 block">Reason for Appointment</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="4"
            placeholder="Describe symptoms or reason for visit..."
            className={`w-full rounded-lg py-2 px-3 text-sm resize-none ${
              isLight ? "bg-gray-100" : "bg-stone-800 text-white"
            }`}
          />
        </div>

        <button
          type="submit"
          onClick={saveAppointment}
          className="mt-6 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
        >
          {rescheduleId ? "Update Appointment" : "Save Appointment"}
        </button>
      </form>
    </Section>
  );
};

export { Appointments };
