import React from 'react';
import { adminLoginImage, signUpImage } from '../constants/wallpaper';
import { Link } from 'react-router-dom';
import { CareNetAdmin, CareNetPatients } from '../constants/paths';
import { TechCompanyLogos } from '../constants/icons';

const AdminLogin = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-neutral-900 p-4">
      <div className="flex container mx-auto w-full bg-neutral-950/70 h-[90%] border-l border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
        <form className="flex flex-col justify-center flex-1 p-10 text-white">
          <fieldset className="flex flex-col gap-6">
            <legend className="text-3xl font-light mb-8 tracking-wide flex justify-between items-center w-full pt-4">
              Admin Login
              <Link to={"#"} className="text-white text-sm tracking-wide py-3 px-6 rounded-full border-t-2 shadow-md bg-neutral-900 border-neutral-800 transform transition-transform hover:scale-105">Back To The Homepage</Link>
            </legend>

            <div className="flex flex-col gap-2">
              <label htmlFor="user-email" className="text-sm tracking-wide">Username: </label>
              <input 
                type="text" 
                id="user-email" 
                placeholder="Your Email" 
                className="bg-neutral-800 border-t-2 shadow-md border-neutral-700 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="user-password" className="text-sm tracking-wide">Password:</label>
              <input 
                type="password" 
                id="user-password" 
                placeholder="Enter your password" 
                className="bg-neutral-800 border-t-2 border-neutral-700 shadow-md text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            

            <button 
              type="submit" 
              className="mt-4 bg-green-600 border-t-2 border-green-200 shadow-md font-medium py-3 rounded-full transition-colors hover:bg-green-700"
            >
              Continue
            </button>
          </fieldset>
        </form>

        <div className="flex-1 hidden md:block shadow-inner">
          <img 
            src={ adminLoginImage } 
            alt="Registration visual" 
            className="h-full w-full object-cover contrast-125 brightness-90"
          />
        </div>
      </div>
    </section>
  );
};

export { AdminLogin };
