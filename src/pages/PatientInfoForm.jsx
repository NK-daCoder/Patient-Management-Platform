import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import { FileDrop } from '../components/FileDrop';

const PatientInfoForm = () => {
  const [identificationType, setIdentificationType] = useState("Birth Certificate");

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dob: '',
    address: '',
    emergencyContact: '',
    phone: '',
    gender: '',
    occupation: '',
    emergencyPhone: '',
    physician: '',
    insuranceProvider: '',
    allergies: '',
    familyHistory: '',
    insurancePolicyNumber: '',
    currentMeds: '',
    pastMeds: '',
    identificationNumber: '',
    identificationType: 'Birth Certificate',
    consents: {
      treatment: false,
      disclosure: false,
      privacy: false
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Patient Info:', formData);
  };

  const handleConsentChange = (field) => (e) => {
    setFormData({
      ...formData,
      consents: { ...formData.consents, [field]: e.target.checked }
    });
  };

  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <header className="container mx-auto flex items-center gap-2 py-5">
        <img src="/logo.png" alt="CareNet Logo" className='size-8 rounded-md' />
        <p className="font-medium tracking-wide">CareNet</p>
      </header>

      <section className='container mx-auto flex flex-col gap-1 py-5'>
        <h1 className="text-2xl font-light text-center">Welcome.</h1>
        <p className="text-sm text-stone-300 text-center">
          Fill in the form below to tell us more about yourself
        </p>
      </section>

      <main className="container mx-auto px-5 py-7 border-t bg-neutral-950 border-neutral-700 shadow-md rounded-3xl mt-5">
        <form onSubmit={handleSubmit}>
          <FormSection title="Personal Information">
            <div className="flex flex-col gap-2 mb-6">
              <FormLabel htmlFor="user-full-name">Full Name:</FormLabel>
              <FormInput
                id="user-full-name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="ex: Maria Credit spokovich"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 my-8">
              <div className='flex flex-col gap-6'>
                <FormField id="user-email" label="Email Address:" placeholder="ex: test@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <FormField id="user-birthday" label="Date of Birth:" type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
                <FormField id="user-address" label="Address:" placeholder="ex: 31 Lombart Street"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <FormField id="user-emergency-contact" label="Emergency Contact:" placeholder="ex: +27 67 204 6585"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                />
              </div>

              <div className='flex flex-col gap-6'>
                <FormField id="user-phone" label="Phone number:" placeholder="ex: +1(234)567-8900"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <GenderSelection
                  gender={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
                <FormField id="user-occupation" label="Occupation:" placeholder="ex: Software Engineering"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                />
                <FormField id="user-emergency-phone" label="Emergency Phone Number:" placeholder="ex: +1(868)579-9831"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Medical Information">
            <FormField
              id="user-primary-physician"
              label="Primary Care Physician:"
              placeholder="ex: Dr Adam Smith"
              value={formData.physician}
              onChange={(e) => setFormData({ ...formData, physician: e.target.value })}
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 my-8">
              <div className='flex flex-col gap-6'>
                <FormField id="user-insurance-provider" label="Insurance Provider" placeholder="ex: BlueCross"
                  value={formData.insuranceProvider}
                  onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                />
                <FormTextArea id="user-allergies" label="Allergies (if any)" placeholder="ex: Peanut, Penicillin, Pollen"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                />
                <FormTextArea id="user-family-medical-history" label="Family Medical History" placeholder="ex: Mother had breast cancer"
                  value={formData.familyHistory}
                  onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
                />
              </div>

              <div className='flex flex-col gap-6'>
                <FormField id="user-insurance-policy-number" label="Insurance policy number" placeholder="AVC1234567"
                  value={formData.insurancePolicyNumber}
                  onChange={(e) => setFormData({ ...formData, insurancePolicyNumber: e.target.value })}
                />
                <FormTextArea id="user-current-meds" label="Current Medication" placeholder="ex: Ibuprofen 200mg"
                  value={formData.currentMeds}
                  onChange={(e) => setFormData({ ...formData, currentMeds: e.target.value })}
                />
                <FormTextArea id="user-med-history" label="Past Medical History" placeholder="ex: Asthma diagnostics in childhood"
                  value={formData.pastMeds}
                  onChange={(e) => setFormData({ ...formData, pastMeds: e.target.value })}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Identification and Verification">
            <Dropdown
              data={identificationType}
              children={(
                <ul className="flex flex-col">
                  <li>
                    <DropdownButton onClick={() => {
                      setIdentificationType("Birth Certificate");
                      setFormData({ ...formData, identificationType: "Birth Certificate" });
                    }}>
                      Birth Certificate
                    </DropdownButton>
                  </li>
                  <li>
                    <DropdownButton onClick={() => {
                      setIdentificationType("ID Document");
                      setFormData({ ...formData, identificationType: "ID Document" });
                    }}>
                      ID Document
                    </DropdownButton>
                  </li>
                </ul>
              )}
            />

            <FormField
              id="id-number"
              label="Identification Number"
              placeholder="ex: 1234567"
              value={formData.identificationNumber}
              onChange={(e) => setFormData({ ...formData, identificationNumber: e.target.value })}
            />

            <div className='flex flex-col gap-2 mt-6'>
              <FormLabel htmlFor="user-id-media">Scanned Copy of Identification Document</FormLabel>
              <FileDrop />
            </div>
          </FormSection>

          <FormSection title="Consent and Privacy">
            <ConsentCheckbox label="I consent to receive treatment for my health condition."
              checked={formData.consents.treatment}
              onChange={handleConsentChange('treatment')}
            />
            <ConsentCheckbox label="I consent to the use and disclosure of my health information for treatment purposes"
              checked={formData.consents.disclosure}
              onChange={handleConsentChange('disclosure')}
            />
            <ConsentCheckbox label="I acknowledge that I have reviewed and agree to the privacy policy"
              checked={formData.consents.privacy}
              onChange={handleConsentChange('privacy')}
            />
          </FormSection>

          <SubmitButton>Continue</SubmitButton>
        </form>
      </main>
    </div>
  );
};

const FormSection = ({ title, children }) => (
  <fieldset className="flex flex-col gap-2 mb-10">
    <legend className="text-2xl font-light tracking-wide pb-5">{title}</legend>
    {children}
  </fieldset>
);

const FormLabel = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="text-neutral-500 text-sm font-light tracking-wide">
    {children}
  </label>
);

const FormInput = ({ id, type = "text", placeholder, value, onChange }) => (
  <input
    type={type}
    id={id}
    className="bg-neutral-800 border-t border-neutral-700 px-2 py-3 rounded-lg text-white text-sm tracking-wide"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

const FormTextArea = ({ id, label, placeholder, value, onChange }) => (
  <div className='flex flex-col gap-2'>
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <textarea
      id={id}
      className="bg-neutral-800 border-t border-neutral-700 px-2 py-3 rounded-lg text-white text-sm tracking-wide h-[5.85rem]"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const FormField = ({ id, label, type = "text", placeholder, value, onChange }) => (
  <div className='flex flex-col gap-2'>
    <FormLabel htmlFor={id}>{label}</FormLabel>
    <FormInput id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} />
  </div>
);

const GenderSelection = ({ gender, onChange }) => (
  <div className='flex flex-col gap-2'>
    <FormLabel htmlFor="user-gender">Gender:</FormLabel>
    <ul id="user-gender" className="flex gap-3">
      {['Male', 'Female', 'Other'].map((g) => (
        <li key={g} className='flex gap-1 p-3 border-t-2 border-neutral-700 bg-neutral-800 rounded-md shadow-md'>
          <input type="radio" name="Gender" value={g} checked={gender === g} onChange={onChange} />
          <label className='text-neutral-500 text-sm'>{g}</label>
        </li>
      ))}
    </ul>
  </div>
);

const DropdownButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="tracking-wide p-2 w-full text-left bg-gradient-to-bl hover:from-neutral-800 hover:to-neutral-900 hover:border-t border-neutral-700 hover:shadow-md rounded-lg text-stone-300 text-sm"
  >
    {children}
  </button>
);

const ConsentCheckbox = ({ label, checked, onChange }) => (
  <div className="flex gap-2 text-sm tracking-wide items-center">
    <input type="checkbox" className="mt-0.5" checked={checked} onChange={onChange} />
    <label>{label}</label>
  </div>
);

const SubmitButton = ({ children }) => (
  <button
    type="submit"
    className='flex items-center justify-center mt-10 p-5 text-center bg-green-600 w-full rounded-xl border-t-2 border-green-400 text-white tracking-wide text-sm hover:bg-green-700 transition-colors'
  >
    {children}
  </button>
);

export default PatientInfoForm;
