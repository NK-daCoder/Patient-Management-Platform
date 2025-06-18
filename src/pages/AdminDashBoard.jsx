import React, { useState } from 'react'
import { AdminDashboardElements } from '../constants/const'
import { Link } from 'react-router-dom'
import { CareNetAdmin } from '../constants/paths'
import { AdminNavLabels } from "../constants/const"
import AdminDoctors from '../screens/AdminDoctors'
import { PatientProfile } from '../components/PatientProfile'
import { dashboardPanel, notification } from '../constants/icons'
import { adminIllustration } from '../constants/wallpaper'

const AdminDashBoard = () => {
  const [selectedSection, setSelectedSection] = useState(AdminNavLabels.Doctors);

  const renderScreen = () => {
    switch (selectedSection) {
      case AdminNavLabels.Doctors:
        return <AdminDoctors/>
    
      default:
        break;
    }
  }


  return (
    <section className="flex">
      <nav className='w-[19%] shadow-md md:h-screen border-r bg-neutral-950 border-neutral-900 flex flex-col justify-between px-4 py-6'>
        <Link 
          to={CareNetAdmin.admin} 
          className="flex flex-col items-center gap-1 px-2 transition-all duration-200 py-5"
        >
          <img src="/logo.png" alt="CareNet Logo" className="size-10 filter brightness-105" />
          <span className='text-xl tracking-wide text-green-500 font-semibold'>Care Net</span>
        </Link>
        
        {/* Primary Navigation */}
        <ul className="flex flex-col gap-4">
          {AdminDashboardElements.PrimaryNavElements.map((item, index) => (
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
          {AdminDashboardElements.SecondaryNavElements.map((item, index) => (
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
      <div className="my-5 flex flex-col gap-6 container mx-auto px-3">
        <header className="flex justify-between px-4 border-b py-4 border-neutral-600">
          <h1 className="text-white tracking-wide">{selectedSection}</h1>
          <ul className="flex gap-3 items-center">
            {
              [{label: "Notification", icon:notification}, {label: "Dashboard Panels", icon:dashboardPanel}].map((icon, index) => (
                <li key={`header-item-${index+1}`}>
                  <button className="size-8 shadow-md rounded-full p-2 bg-neutral-800">
                    <img src={icon.icon} alt={icon.label} title={icon.label} className="size-full filter invert brightness-0"/>
                  </button>
                </li>
              ))
            }
            <li>
              <PatientProfile/>
            </li>
          </ul>
        </header>
        
        <section className=" flex p-5 h-[30%] shadow-md mt-4 items-center justify-between relative bg-neutral-950 border-t border-stone-700 rounded-xl">
            <div className="flex flex-col gap-1">
              <h2 className="flex flex-col font-semibold text-lg tracking-wide">
                <span className="text-white">Good Morning,</span>
                <span className="text-green-600">
                  NK Mothiedie
                </span> 
              </h2>
              <p className="text-stone-700 text-sm">Have a nice day at work</p>
            </div>
            <div className="h-full w-[20rem]"><img src={adminIllustration} alt="" className="absolute w-[18rem] -bottom-3 "/></div>
        </section>
        <section className="flex flex-col gap-3 px-3">
          <h2 className="text-md text-white tracking-wide">Doctor Stats</h2>
          <ul className="text-white flex gap-3">
            <li>
              <article>
                <section className="flex gap-2 items-center border-t border-stone-800 p-6 rounded-xl shadow-md bg-neutral-950">
                  <div className="flex">
                    <img src={ adminIllustration } alt="admin illustration" className="size-7 rounded"/>
                  </div>
                  <div>
                    <p className="text-sm text-stone-600">Total Doctors</p>
                    <p className="text-2xl tracking-wide">0</p>
                  </div>
                </section>
              </article>
            </li>
            <li>
              <article>
                <section className="flex gap-2 items-center border-t border-stone-800 p-6 rounded-xl shadow-md bg-neutral-950">
                  <div className="flex">
                    <img src="#" alt="" className="size-7 rounded"/>
                  </div>
                  <div>
                    <p className="text-sm text-stone-600">Active Doctors</p>
                    <p className="text-2xl tracking-wide">0</p>
                  </div>
                </section>
              </article>
            </li>
          </ul>
        </section>
      </div>
    </section>
  )
}

export default AdminDashBoard