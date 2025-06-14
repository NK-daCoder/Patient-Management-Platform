import React, { useState } from 'react';
import { PatientDashboardElements } from "../constants/const.js";
import { Link } from 'react-router-dom';
import { CareNetPatients } from '../constants/paths.js';
import { PatientProfile } from '../components/PatientProfile.jsx';

const PatientDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Home")
  
  return (
    <section className="flex ">
      <nav className='shadow-md md:h-screen border-r bg-neutral-950 border-neutral-800 flex flex-col justify-between px-4 py-6'>
        <Link 
          to={CareNetPatients.patientDashBoard} 
          className="flex flex-col items-center gap-1 px-2 hover:shadow-lg transition-all duration-200 border-b border-neutral-500 pb-5"
        >
          <img src="/logo.png" alt="CareNet Logo" className="size-9 filter brightness-200" />
          <span className='text-xl tracking-wide text-green-500 font-semibold'>Care Net</span>
        </Link>

        {/* Primary Navigation */}
        <ul className="flex flex-col gap-4">
          {PatientDashboardElements.PrimaryNavigations.map((item, index) => (
            <li key={`${item.label}-${index}`}>
              <button
                onClick={() => setSelectedSection(item.label)}
                type="button"
                className={` ${selectedSection === item.label ? "bg-stone-900 border-t shadow-sm border-green-700" : ""} flex items-center gap-3 px-3 py-2 text-neutral-300 hover:bg-white/10 rounded-xl transition-all duration-200 w-full text-left`}
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
                className={`${selectedSection === item.label ? "bg-green-900 border-t shadow-sm border-green-600" : ""} flex items-center gap-3 px-3 py-2 text-neutral-300 hover:bg-white/10 rounded-xl transition-all duration-200 w-full text-left`}
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

        <PatientProfile/>
      </nav>
      <section className="md:h-screen flex-grow border"></section>
    </section>


  );
};

export default PatientDashboard;
