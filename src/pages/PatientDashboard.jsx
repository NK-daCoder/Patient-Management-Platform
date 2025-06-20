import React, { useState, useEffect } from 'react';
import { PatientDashboardElements, PatientNavLabels } from "../constants/const.js";
import { Link } from 'react-router-dom';
import { CareNetPatients } from '../constants/paths.js';
import { PatientProfile } from '../components/PatientProfile.jsx';
import { menuIcon, messageAlert, settings } from '../constants/icons.js';

import { Home } from '../screens/Home.jsx';
import { Appointments } from '../screens/Appointments.jsx';
import Medication from '../screens/Medication.jsx';
import { Records } from '../screens/Record.jsx';
import { Settings } from '../screens/Settings.jsx';

import '../stylesheet/animation.css';

const PatientDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("Home");
  const [theme, setTheme] = useState("dark");
  const [burgerMenuIsOpen, setBurgerMenuIsOpen] = useState(false);

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
        className={`md:stick md:top-0 group shadow-md md:h-screen border-r 
        ${theme === "light" ? "bg-neutral-100 border-gray-200" : "bg-neutral-950 border-neutral-900"} 
        fixed bottom-0 left-0 z-50  md:static flex flex-row md:flex-col justify-between sm:px-2 sm:py-6 transition-all duration-300 overflow-hidden sm:w-[25%] md:w-[9%] lg:w-[5.5%] lg:hover:w-[15%]`}
      >
        <section>
          <Link to={CareNetPatients.patientDashBoard} className="hidden border-b border-neutral-600/20 pb-5 sm:flex flex-col lg:flex-row items-center gap-2 transition-all duration-200">
            <img src="/logo.png" alt="CareNet Logo" className="size-10 filter brightness-105 mx-auto group-hover:mx-0" />
            <span className={`md:text-sm lg:text-md tracking-wide font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === "light" ? "text-green-600" : "text-green-500"}`}>
              Care Net
            </span>
          </Link>

          <ul className="w-screen flex flex-row justify-between sm:justify-start h-16 sm:p-0 md:w-auto sm:flex-col gap-2 sm:mt-7">
            {PatientDashboardElements.PrimaryNavigations.map((item, index) => (
              <li key={`${item.label}-${index}`} className='h-full w-full sm:h-auto'>
                <button
                  onClick={() => setSelectedSection(item.label)}
                  type="button"
                  className={`${selectedSection === item.label ? "border-t-2 sm:border-t-0 sm:border-r-2 border-green-500 bg-green-500/20" : ""} 
                  flex items-center justify-center sm:justify-start gap-3 px-3 py-3 sm:py-2 w-full 
                  ${theme !== "light" ? "text-white hover:bg-green-900" : "text-neutral-800 hover:bg-green-200 font-semibold"} 
                  transition-all duration-200 h-full`}
                >
                  <img src={item.icon} alt={item.label} className={`size-5 ${theme !== "light" ? "filter invert brightness-0" : ""}`} />
                  <span className="text-sm tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:inline">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <ul className="hidden sm:flex flex-col gap-2 py-6">
          {PatientDashboardElements.SecondaryNavigations.map((item, index) => (
            <li key={`${item.label}-${index}`}>
              <button
                onClick={() => setSelectedSection(item.label)}
                type="button"
                className={`${selectedSection === item.label ? "border-r-2 border-green-500 bg-green-500/20" : ""} 
                  flex items-center gap-3 px-3 py-2 w-full 
                  ${theme !== "light" ? "text-white hover:bg-green-900" : "text-neutral-800 hover:bg-green-200 font-semibold"} 
                  transition-all duration-200`}
              >
                <img src={item.icon} alt={item.label} className={`size-5 ${theme !== "light" ? "filter invert brightness-0" : ""}`} />
                <span className="text-sm tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden lg:inline">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        
      </nav>

      <section className=" flex-grow sm:px-5 py-3 sm:h-screen sm:overflow-y-auto">
        <header className={`fixed top-0 left-0 w-screen sm:w-auto z-50 sm:static flex justify-between items-center border-b sm:border-t sm:container sm:mx-auto sm:rounded-xl p-3 sm:p-6 ${theme === "light" ? "bg-gray-100 border-neutral-300 text-black" : "bg-neutral-950 border-neutral-700 text-neutral-300"}`}>
          <div className="sm:hidden flex flex-col items-center gap-1">
            <img src="/logo.png" alt="care net logo" className="size-5 filter brightness-100"/>
            <span className="text-sm font-bold text-green-400">Care Net</span>
          </div>
          
          <h2 className="text-md tracking-wide font-semibold text-stone-700">{selectedSection}</h2>
          
          <ul className="flex gap-2 items-center">
            <li className="hidden sm:inline">
              <button type="button" className={`size-10 rounded-[35%] flex items-center justify-center shadow-md shadow-stone-900/20 border-t border-stone-900/20 ${theme !== "light" ? "bg-stone-800" : " bg-neutral-100"}`}>
                <img src={messageAlert} alt="" className={`size-5 ${theme !== "light" ? "filter invert brightness-0" : ""}`} />
              </button>
            </li>
            <li><PatientProfile theme={theme} setTheme={setTheme} /></li>
            <li className="sm:hidden relative">
              <button onClick={() => setBurgerMenuIsOpen(!burgerMenuIsOpen)} type="button" className={`flex items-center rounded-[17%] size-9 justify-center bg-gradient-to-b from-green-500 to-green-700 shadow-md ${theme != "light" ? "shadow-green-400/20" : "shadow-green-300"} transition-transform transform active:scale-90`}>
                <img src={menuIcon} alt="" className={`size-6 invert filter brightness-200`}/>
              </button>
              <section
                className={`
                  fixed left-0 top-[4.3rem] w-full overflow-hidden border-b z-40
                  ${burgerMenuIsOpen ? "max-h-[300px] py-4 px-6" : "max-h-0 py-0 px-6"}
                  transition-all duration-500 ease-in-out
                  ${theme !== "light" ? "bg-stone-900 border-stone-600" : "bg-neutral-100 border-neutral-300"}
                `}
              >
                <ul className="flex flex-col gap-4">
                  {PatientDashboardElements.SecondaryNavigations.map((item, index) => (
                    <li key={`mobile-menu-${item.label}`}>
                      <button
                        onClick={() => {
                          setSelectedSection(item.label);
                          setBurgerMenuIsOpen(false); // close after click
                        }}
                        className="flex items-center gap-3 w-full text-left"
                      >
                        <img src={item.icon} alt={item.label} className="size-5" />
                        <span className="text-stone-400 text-sm tracking-wide">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

            </li>
          </ul>
        </header>

        {/* 🔄 Animated Section Switcher */}
        <main className="fade-wrapper py-8 sm:p-0 sm:mt-4">
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
