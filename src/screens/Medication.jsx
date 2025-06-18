import React, { useState } from 'react'
import Section from '../components/Section'
import { PatientDashboardElements } from '../constants/const'
import ActiveMedications from './sub-screens/ActiveMedications'
import { MedicationReminder } from './sub-screens/MedicationReminder'
import { PrescriptionHistory } from './sub-screens/PrescriptionHistory'

const Medication = () => {
    const [section, setSection] = useState("💊 Active Medications")
    const renderSection = () => {
        switch (section) {
            case "💊 Active Medications":
                return <ActiveMedications/>
            case "🗓️ Medication Reminders":
                return <MedicationReminder/>
            case "🧾 Prescriptions History":
                return <PrescriptionHistory/>
            default:
                console.log("Unable to render section");
        }
    }
  return (
    <Section className="flex flex-col gap-1 mx-auto container">
        <h1 className='text-white tracking-wide text-md'>Medication Tabs</h1>
        <p className="text-stone-600">Lets find out more about your medication</p>
        <ul className="flex gap-3 items-center overflow-x-auto mt-2">
            {
                PatientDashboardElements.MedicationTabs.map((tab, index) => (
                    <li key={`tab-${tab.label}-${index + 1}`}>
                        <button 
                            onClick={() => setSection(tab.label)}
                            className={`text-white text-sm border-t  ${section === tab.label ? "bg-green-700 border-green-300" : "bg-stone-900 border-neutral-700"} rounded-full p-3 shadow-md`}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))
            }
        </ul>

        {renderSection()}
    </Section>
  )
}

export default Medication