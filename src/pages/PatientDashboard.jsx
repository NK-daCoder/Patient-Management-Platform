import React, { useState, useEffect } from 'react';
import { PatientDashboardElements } from "../constants/const.js";
import { Link } from 'react-router-dom';
import { CareNetPatients } from '../constants/paths.js';
import { PatientProfile } from '../components/PatientProfile.jsx';
import { messageAlert } from '../constants/icons.js';

import { Home } from '../screens/Home.jsx';
import { Appointments } from '../screens/Appointments.jsx';
import Medication from '../screens/Medication.jsx';
import { Records } from '../screens/Record.jsx';

const PatientDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Home");

  useEffect(() => {
    // If there's a reschedule flag in localStorage, open the Appointments screen
    const reschedule = localStorage.getItem("reschedule_appointment");
    if (reschedule) {
      setSelectedSection("Appointments");
    }
  }, []);

  const renderSection = () => {
    switch (selectedSection) {
      case "Home":
        return <Home setScreen={setSelectedSection} />;
      case "Appointments":
        return <Appointments />;
      case "Medications":
        return <Medication/>
      case "Record": 
        return <Records/>
      default:
        console.warn("No matching section to render.");
        return null;
    }
  };

  return (
    <section className="flex">
      <nav className='shadow-md md:h-screen border-r bg-neutral-950 border-neutral-900 flex flex-col justify-between px-4 py-6 w-[15%]'>
        <Link 
          to={CareNetPatients.patientDashBoard} 
          className="flex flex-col items-center gap-1 px-2 transition-all duration-200 py-5"
        >
          <img src="/logo.png" alt="CareNet Logo" className="size-10 filter brightness-105" />
          <span className='text-xl tracking-wide text-green-500 font-semibold'>Care Net</span>
        </Link>
        
        {/* Primary Navigation */}
        <ul className="flex flex-col gap-4">
          {PatientDashboardElements.PrimaryNavigations.map((item, index) => (
            <li key={`${item.label}-${index}`}>
              <button
                onClick={() => setSelectedSection(item.label)}
                type="button"
                className={` ${selectedSection === item.label ? "bg-green-800 border-t shadow-sm border-green-500" : ""} flex items-center gap-3 px-3 py-2 text-neutral-300 hover:bg-green-900 rounded-full transition-all duration-200 w-full text-left`}
              >
                <img 
                  src={item.icon} 
                  alt={item.label} 
                  className="size-5 filter invert brightness-0" 
                />
                <span className="text-sm tracking-wide">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Secondary Navigation */}
        <ul className="flex flex-col gap-4 py-6">
          {PatientDashboardElements.SecondaryNavigations.map((item, index) => (
            <li key={`${item.label}-${index}`}>
              <button
                onClick={() => setSelectedSection(item.label)}
                type="button"
                className={`${selectedSection === item.label ? "bg-green-800 border-t shadow-sm border-green-500" : ""} flex items-center gap-3 px-3 py-2 text-neutral-300 hover:bg-green-900 rounded-full transition-all duration-200 w-full text-left`}
              >
                <img 
                  src={item.icon} 
                  alt={item.label} 
                  className="size-5 filter invert brightness-0" 
                />
                <span className="text-sm tracking-wide">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="md:h-screen flex-grow px-5 py-3 overflow-y-auto">
        <header className="flex justify-between items-center border-t px-6 container mx-auto border-neutral-700 rounded-xl shadow-md bg-neutral-950 p-3">
          <h2 className="text-md tracking-wide text-neutral-300">{selectedSection}</h2>
          <ul className="flex gap-2 items-center">
            {[messageAlert].map((item, index) => (
              <li key={`header-item-${index}`}>
                <button type="button" className="size-9 p-2 rounded-md">
                  <img src={item} alt="" className="size-full invert brightness-0" />
                </button>
              </li>
            ))}
            <li>
              <PatientProfile />
            </li>
          </ul>
        </header>

        {renderSection()}
      </section>
    </section>
  );
};

export default PatientDashboard;
