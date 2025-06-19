import React, { useEffect, useState, useRef } from "react";

import html2pdf from "html2pdf.js";
import Section from "../../components/Section";

const PrescriptionHistory = ({theme}) => {
  const [history, setHistory] = useState([]);
  const pdfRef = useRef();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    const reminders = JSON.parse(localStorage.getItem("medicationReminders")) || [];
    const today = new Date();

    const completed = reminders.filter((reminder) => {
      const startDate = new Date(reminder.startDate);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + parseInt(reminder.duration));
      return endDate < today;
    });

    setHistory(completed);
  };

  const handleDelete = (id) => {
    const allReminders = JSON.parse(localStorage.getItem("medicationReminders")) || [];
    const updated = allReminders.filter((item) => item.id !== id);
    localStorage.setItem("medicationReminders", JSON.stringify(updated));
    fetchHistory();
  };

  const handleDownloadPDF = () => {
    const opt = {
      margin:       0.5,
      filename:     'prescription-history.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(pdfRef.current).save();
  };

  return (
    <Section className="space-y-4" theme={theme}>
      <div className="flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold tracking-tight">Prescription History 📜</h1>
        {history.length > 0 && (
          <button
            onClick={handleDownloadPDF}
            className="bg-green-700 hover:bg-green-800 text-white text-sm px-4 py-2 rounded-xl transition"
          >
            📄 Download PDF
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-stone-500">No completed medications yet.</p>
      ) : (
        <div ref={pdfRef} className="grid gap-4">
          {history.map((item, index) => {
            const start = new Date(item.startDate);
            const end = new Date(start);
            end.setDate(start.getDate() + parseInt(item.duration));

            return (
              <div
                key={index}
                className="bg-neutral-900 rounded-xl shadow-md p-4 border border-stone-800 relative"
              >
                <h2 className="text-white font-medium text-lg">{item.name}</h2>
                <p className="text-stone-400 text-sm">
                  🕐 Taken at: <span className="text-white">{item.time}</span>
                </p>
                <p className="text-stone-400 text-sm">
                  📅 From: <span className="text-white">{start.toDateString()}</span>
                </p>
                <p className="text-stone-400 text-sm">
                  📅 To: <span className="text-white">{end.toDateString()}</span>
                </p>
                <p className="text-green-500 text-xs mt-2">✅ Completed</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-400 text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
};

export { PrescriptionHistory };
