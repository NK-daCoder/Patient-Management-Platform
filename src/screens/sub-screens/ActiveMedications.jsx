import React from 'react'
import Section from '../../components/Section';

const ActiveMedications = () => {
    const statusColors = {
        Active: 'bg-green-600 text-white',
        Completed: 'bg-stone-500 text-white',
        Paused: 'bg-yellow-500 text-black',
    };
    const mockMeds = [
        {
          id: 'med1',
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice Daily',
          status: 'Active',
          refills: 2,
          doctor: 'Dr. Amanda Blake',
          startDate: '2024-06-01',
        },
        {
          id: 'med2',
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once Daily',
          status: 'Completed',
          refills: 0,
          doctor: 'Dr. Jacob Mokoena',
          startDate: '2024-01-10',
          endDate: '2024-05-10',
        }
    ];

    const medications = mockMeds;

  return (
    <Section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-xl font-semibold">Your Medications</h1>
        <button
          disabled
          className="bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-xl text-sm text-white border border-stone-500 shadow"
        >
          + Request Refill
        </button>
      </div>

      {medications.length === 0 ? (
        <div className="bg-neutral-800 text-stone-400 p-6 rounded-xl text-center">
          <p>You have no active medications. Your prescriptions will appear here once added by your doctor.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {medications.map((med) => (
            <div
              key={med.id}
              className="bg-neutral-800 rounded-xl p-5 shadow-inner border border-stone-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-white text-lg font-medium">{med.name}</h2>
                  <p className="text-stone-400 text-sm">{med.dosage} • {med.frequency}</p>
                  <p className="text-stone-400 text-sm mt-1">Prescribed by {med.doctor}</p>
                  <p className="text-stone-400 text-sm">
                    Start: {med.startDate} {med.endDate ? ` | End: ${med.endDate}` : ''}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[med.status]}`}
                >
                  {med.status}
                </span>
              </div>
              {typeof med.refills !== 'undefined' && (
                <p className="text-stone-400 text-xs mt-3">
                  Refills left: <span className="font-semibold text-white">{med.refills}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}

export default ActiveMedications