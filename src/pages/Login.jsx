import React from 'react';
import { registrationImage, signUpImage } from '../constants/wallpaper';
import { Link } from 'react-router-dom';
import { CareNetAdmin, CareNetPatients } from '../constants/paths';
import { TechCompanyLogos } from '../constants/icons';

const Login = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-neutral-900 p-4">
      <div className="flex w-full bg-neutral-950 border-l border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
        <form className="flex flex-col justify-center flex-1 p-10 text-white">
          <fieldset className="flex flex-col gap-6">
            <legend className="text-3xl font-light mb-8 tracking-wide">Login</legend>

            <div className="flex flex-col gap-2">
              <label htmlFor="user-email" className="text-sm tracking-wide">Email: </label>
              <input 
                type="text" 
                id="user-email" 
                placeholder="Your Email" 
                className="bg-neutral-800 border-t-2 shadow-md border-neutral-700 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="user-password" className="text-sm tracking-wide">Password</label>
              <input 
                type="password" 
                id="user-password" 
                placeholder="Enter your password" 
                className="bg-neutral-800 border-t-2 border-neutral-700 shadow-md text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div className='flex justify-between items-center'>
                <Link to={CareNetPatients.registration} className="text-sm hover:underline tracking-wide">Don't Have An Account</Link>
                <Link to={CareNetAdmin.login} className="text-sm hover:underline tracking-wide">Admin</Link>
            </div>

            <button 
              type="submit" 
              className="mt-4 bg-green-600 border-t-2 border-green-200 shadow-md font-medium py-3 rounded-full transition-colors hover:bg-green-700"
            >
              Continue
            </button>
          </fieldset>
          <hr className='border-t border-neutral-700 my-5'/>
          <fieldset className='text-sm tracking-wide'>
            <legend className="text-sm tracking-wide">Continue With: </legend>
            <ul className="flex gap-3 mt-5">
                { TechCompanyLogos.map((company, index) => (
                    <li>
                        <button type="button" className="border-t-2 border-neutral-700 rounded-md shadow-md size-16 flex flex-col gap-1 items-center justify-center bg-neutral-800">
                            <img src={company.icon} alt={company.label} className="size-5 filter grayscale"/>
                            <span className="text-sm tracking-wide">{company.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
          </fieldset>
        </form>

        <div className="flex-1 hidden md:block">
          <img 
            src={registrationImage} 
            alt="Registration visual" 
            className="h-full w-full object-cover contrast-125 brightness-90"
          />
        </div>
      </div>
    </section>
  );
};

export { Login };
