import React, { useState } from 'react';
import Section from '../components/Section';
import { PatientDashboardElements } from '../constants/const';
import ActiveMedications from './sub-screens/ActiveMedications';
import { MedicationReminder } from './sub-screens/MedicationReminder';
import { PrescriptionHistory } from './sub-screens/PrescriptionHistory';

const Medication = ({ theme }) => {
  const [section, setSection] = useState("💊 Active Medications");
  const isLight = theme === 'light';

  const renderSection = () => {
    switch (section) {
      case "💊 Active Medications":
        return <ActiveMedications theme={theme} />;
      case "🗓️ Medication Reminders":
        return <MedicationReminder theme={theme} />;
      case "🧾 Prescriptions History":
        return <PrescriptionHistory theme={theme} />;
      default:
        console.log("Unable to render section");
    }
  };

  return (
    <Section className="flex flex-col gap-1 mx-auto container" theme={theme}>
      <h1 className={`tracking-wide text-md ${isLight ? "text-gray-800" : "text-white"}`}>
        Medication Tabs
      </h1>
      <p className={`${isLight ? "text-gray-600" : "text-stone-600"}`}>
        Let’s find out more about your medication
      </p>

      <ul className="flex gap-3 items-center overflow-x-auto mt-2 pb-2">
        {PatientDashboardElements.MedicationTabs.map((tab, index) => {
          const isActive = section === tab.label;
          return (
            <li key={`tab-${tab.label}-${index + 1}`}>
              <button
                onClick={() => setSection(tab.label)}
                className={`text-sm rounded-full p-3 shadow-md border-t transition bg-gradient-to-bl ${
                  isLight
                    ? isActive
                      ? "from-green-500 via-green-400 to-green-600 text-white border-green-400 "
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    : isActive
                    ? "from-green-600 to-green-800 text-white border-green-400"
                    : "bg-stone-900 text-white border-neutral-700 hover:border-stone-600"
                }`}
              >
                {tab.label}
              </button>
            </li>
          );
        })}
      </ul>

      {renderSection()}
    </Section>
  );
};

export default Medication;
