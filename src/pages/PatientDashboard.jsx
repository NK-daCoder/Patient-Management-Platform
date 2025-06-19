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
import { Settings } from '../screens/Settings.jsx';

import '../stylesheet/animation.css';

const PatientDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Home");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("light", savedTheme === "light");
  }, []);

  useEffect(() => {
    const reschedule = localStorage.getItem("reschedule_appointment");
    if (reschedule) {
      setSelectedSection("Appointments");
    }
  }, []);

  const isActive = (section) => selectedSection === section ? 'section-fade active' : 'section-fade overflow-hidden size-0';

  return (
    <section className={`${theme === "light" ? "bg-white text-black" : "bg-neutral-900 text-white"} flex`}>
      <nav
        className={`sticky top-0 group shadow-md md:h-screen border-r 
        ${theme === "light" ? "bg-neutral-100 border-gray-200" : "bg-neutral-950 border-neutral-900"} 
        flex flex-col justify-between px-2 py-6 transition-all duration-300 overflow-hidden w-16 hover:w-[15%]`}
      >
        <section>
          <Link to={CareNetPatients.patientDashBoard} className="border-b border-neutral-600/20 pb-5 flex items-center gap-2 transition-all duration-200">
            <img src="/logo.png" alt="CareNet Logo" className="size-10 filter brightness-105 mx-auto group-hover:mx-0" />
            <span className={`text-md tracking-wide font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === "light" ? "text-green-600" : "text-green-500"}`}>
              Care Net
            </span>
          </Link>

          <ul className="flex flex-col gap-2 mt-7">
            {PatientDashboardElements.PrimaryNavigations.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                <button
                  onClick={() => setSelectedSection(item.label)}
                  type="button"
                  className={`${selectedSection === item.label ? "border-r-2 border-green-500 bg-green-500/35" : ""} 
                  flex items-center gap-3 px-3 py-2 w-full 
                  ${theme !== "light" ? "text-white hover:bg-green-900" : "text-neutral-800 hover:bg-green-200 font-semibold"} 
                  transition-all duration-200`}
                >
                  <img src={item.icon} alt={item.label} className={`size-5 ${theme !== "light" ? "filter invert brightness-0" : ""}`} />
                  <span className="text-sm tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <ul className="flex flex-col gap-2 py-6">
          {PatientDashboardElements.SecondaryNavigations.map((item, index) => (
            <li key={`${item.label}-${index}`}>
              <button
                onClick={() => setSelectedSection(item.label)}
                type="button"
                className={`${selectedSection === item.label ? "border-r-2 border-green-500 bg-green-500/35" : ""} 
                flex items-center gap-3 px-3 py-2 w-full 
                ${theme !== "light" ? "text-white hover:bg-green-900" : "text-neutral-800 hover:bg-green-200 font-semibold"} 
                transition-all duration-200`}
              >
                <img src={item.icon} alt={item.label} className={`size-5 ${theme !== "light" ? "filter invert brightness-0" : ""}`} />
                <span className="text-sm tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section className=" flex-grow px-5 py-3 ">
        <header className={`flex justify-between items-center border-t px-6 container mx-auto rounded-xl p-3 ${theme === "light" ? "bg-gray-100 border-neutral-300 text-black" : "bg-neutral-950 border-neutral-700 text-neutral-300"}`}>
          <h2 className="text-md tracking-wide font-semibold text-stone-700">{selectedSection}</h2>
          <ul className="flex gap-2 items-center">
            <li>
              <button type="button" className={`size-10 rounded-[35%] flex items-center justify-center shadow-md shadow-stone-900/20 border-t border-stone-900/20 ${theme !== "light" ? "bg-stone-800" : " bg-neutral-100"}`}>
                <img src={messageAlert} alt="" className={`size-5 ${theme !== "light" ? "filter invert brightness-0" : ""}`} />
              </button>
            </li>
            <li><PatientProfile theme={theme} setTheme={setTheme} /></li>
          </ul>
        </header>

        {/* 🔄 Animated Section Switcher */}
        <main className="fade-wrapper mt-4">
          <div className={isActive("Home")}><Home setScreen={setSelectedSection} theme={theme} /></div>
          <div className={isActive("Appointments")}><Appointments theme={theme} /></div>
          <div className={isActive("Medications")}><Medication theme={theme} /></div>
          <div className={isActive("Record")}><Records /></div>
          <div className={isActive("Settings")}><Settings theme={theme} setTheme={setTheme} /></div>
        </main>
      </section>
    </section>
  );
};

export default PatientDashboard;
