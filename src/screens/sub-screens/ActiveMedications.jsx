import React from 'react';
import Section from '../../components/Section';

const ActiveMedications = ({ theme }) => {
  const isLight = theme === 'light';

  const statusColors = {
    Active: isLight ? 'bg-green-600 text-white' : 'bg-green-600 text-white',
    Completed: isLight ? 'bg-gray-400 text-white' : 'bg-stone-500 text-white',
    Paused: isLight ? 'bg-yellow-300 text-black' : 'bg-yellow-500 text-black',
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
    },
  ];

  const medications = mockMeds;

  return (
    <Section className="space-y-6" theme={theme}>
      <div className="flex items-center justify-between">
        <h1 className={`${isLight ? "text-gray-900" : "text-white"} text-xl font-semibold`}>
          Your Medications
        </h1>
        <button
          disabled
          className={`px-4 py-2 rounded-xl text-sm border shadow transition ${
            isLight
              ? "bg-gray-200 text-gray-500 border-gray-300 hover:bg-gray-300"
              : "bg-neutral-700 text-white border-stone-500 hover:bg-neutral-600"
          }`}
        >
          + Request Refill
        </button>
      </div>

      {medications.length === 0 ? (
        <div
          className={`rounded-xl text-center p-6 ${
            isLight
              ? "bg-gray-100 text-gray-500"
              : "bg-neutral-800 text-stone-400"
          }`}
        >
          <p>
            You have no active medications. Your prescriptions will appear here
            once added by your doctor.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {medications.map((med) => (
            <div
              key={med.id}
              className={`rounded-xl p-5 shadow-inner border ${
                isLight
                  ? "bg-white border-gray-300"
                  : "bg-neutral-800 border-stone-700"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2
                    className={`text-lg font-medium ${
                      isLight ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {med.name}
                  </h2>
                  <p className={`${isLight ? "text-gray-600" : "text-stone-400"} text-sm`}>
                    {med.dosage} • {med.frequency}
                  </p>
                  <p className={`${isLight ? "text-gray-600" : "text-stone-400"} text-sm mt-1`}>
                    Prescribed by {med.doctor}
                  </p>
                  <p className={`${isLight ? "text-gray-600" : "text-stone-400"} text-sm`}>
                    Start: {med.startDate}{' '}
                    {med.endDate ? ` | End: ${med.endDate}` : ''}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[med.status]}`}
                >
                  {med.status}
                </span>
              </div>
              {typeof med.refills !== 'undefined' && (
                <p
                  className={`mt-3 text-xs ${
                    isLight ? "text-gray-600" : "text-stone-400"
                  }`}
                >
                  Refills left:{' '}
                  <span
                    className={`font-semibold ${
                      isLight ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {med.refills}
                  </span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </Section>
  );
};

export default ActiveMedications;
