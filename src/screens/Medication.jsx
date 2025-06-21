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
        console.warn("Unknown section.");
        return null;
    }
  };

  const baseTabStyle = "text-sm rounded-full px-4 py-2 font-medium transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-green-400";

  return (
    <Section className="flex flex-col gap-4 mx-auto container px-4 md:px-8 pb-8 sm:py-3" theme={theme}>
      <header className="mt-2 space-y-1">
        <h1 className={`text-[17px] font-semibold tracking-tight ${isLight ? "text-gray-900" : "text-white"}`}>
          Medication Overview
        </h1>
        <p className={`text-sm ${isLight ? "text-gray-600" : "text-stone-400"}`}>
          Manage your medication confidently and consistently.
        </p>
      </header>

      <nav className="flex gap-3 items-center overflow-x-auto scrollbar-none pt-1 pb-3 -mx-1">
        {PatientDashboardElements.MedicationTabs.map((tab, index) => {
          const isActive = section === tab.label;
          return (
            <button
              key={`medication-tab-${index}`}
              aria-pressed={isActive}
              onClick={() => setSection(tab.label)}
              className={`${baseTabStyle} 
                ${isLight
                  ? isActive
                    ? "bg-gradient-to-br from-green-400 to-green-600 text-white border-green-500 shadow-md"
                    : "bg-white text-gray-800 border-gray-300 hover:border-gray-400"
                  : isActive
                    ? "bg-gradient-to-br from-green-600 to-green-800 text-white border-green-500 shadow-md"
                    : "bg-stone-800 text-gray-200 border-stone-700 hover:border-stone-600"}
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      <section className="animate-fadeIn transition-opacity duration-300 ease-in-out">
        {renderSection()}
      </section>
    </Section>
  );
};

export default Medication;
