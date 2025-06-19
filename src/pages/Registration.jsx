import React from 'react';
import { registrationImage, signUpImage } from '../constants/wallpaper';
import { Link } from 'react-router-dom';
import { CareNetAdmin, CareNetPatients } from '../constants/paths';
import { TechCompanyLogos } from '../constants/icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Registration = () => {
  return (
    <div className="bg-neutral-900">
      <section className="min-h-screen bg-neutral-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-neutral-950 border border-neutral-800 shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 px-8 py-12 text-white">
          <form className="flex flex-col gap-6">
            <h1 className="text-3xl font-light tracking-wide mb-4">Create Account</h1>

            <div className="flex flex-col gap-2">
              <label htmlFor="user-name" className="text-sm">Full Name:</label>
              <input
                type="text"
                id="user-name"
                placeholder="Enter Full Name"
                className="bg-neutral-800 border border-neutral-700 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="user-email" className="text-sm">Email:</label>
              <input
                type="email"
                id="user-email"
                placeholder="Your Email"
                className="bg-neutral-800 border border-neutral-700 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="user-password" className="text-sm">Password:</label>
              <input
                type="password"
                id="user-password"
                placeholder="Enter your password"
                className="bg-neutral-800 border border-neutral-700 text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="user-phone" className="text-sm">Phone Number:</label>
              <PhoneInput
                country={'za'}
                inputClass="!bg-neutral-800 !border !border-neutral-700 !text-white !text-sm !px-4 !py-3 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-green-600 !w-full !pl-11"
                buttonClass="!bg-neutral-800 !border !border-neutral-700"
                containerClass="!text-black"
                inputProps={{
                  name: 'phone',
                  required: true,
                  id: 'user-phone'
                }}
              />
            </div>

            <div className="flex justify-between items-center text-sm mt-2">
              <Link to={CareNetPatients.login} className="hover:underline">Already have an account?</Link>
              <Link to={CareNetAdmin.login} className="hover:underline">Admin</Link>
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-600 hover:bg-green-700 transition-all py-3 rounded-full font-semibold text-white shadow-md"
            >
              Continue
            </button>
          </form>

          <div className="my-6 border-t border-neutral-700" />

          <fieldset className="text-sm">
            <legend className="mb-4">Continue with:</legend>
            <ul className="flex flex-wrap gap-4">
              {TechCompanyLogos.map((company, index) => (
                <li key={`key-${company.label}-${index}`}>
                  <button
                    type="button"
                    className="flex flex-col items-center justify-center bg-neutral-800 border border-neutral-700 rounded-xl p-4 w-20 h-20 shadow-md hover:bg-neutral-700 transition"
                  >
                    <img src={company.icon} alt={company.label} className="h-5 mb-2 filter grayscale" />
                    <span className="text-xs">{company.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </fieldset>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={registrationImage}
            alt="Registration visual"
            className="w-full h-full object-cover contrast-125 brightness-90"
          />
        </div>
      </div>
    </section>
    </div>
    
  );
};

export { Registration };
