import React, { useState, useEffect } from "react";
import statesAndCities from "../../statesAndCities.json"; // Import the JSON file
import eyeColor from "../../../constantdata/eyeColor";
import HairColor from "../../../constantdata/HairColor";
import GENDER from "../../../constantdata/GENDER";
import NATIONALITY from "../../../constantdata/NATIONALITY";
const MissingPersonForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    connection: "",
    state: "",
    city: "",
  });

  const [cities, setCities] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "state") {
      setCities(statesAndCities[value] || []); // Update cities based on state
    }
  };
  const [errors, setErrors] = useState({});
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md text-black">

      <form onSubmit={handleSubmit} className="space-y-6">
          <>
            <h3 className="text-xl  text-gray-700 text-center font-extrabold">Although you are logged in, please complete the fields below before proceeding.</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Phone *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Connection to Missing *
                </label>
                <select
                  name="connection"
                  value={formData.connection}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 "
                  required
                >
                  <option value="">Select...</option>
                  <option value="Law Enforcement">Law Enforcement</option>
                  <option value="Family Member">Family Member</option>
                  <option value="Case Worker">Case Worker</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes For MPC Staff - Confidential
              </label>
              <textarea
                name="confidentialNotes"
                value={formData.confidentialNotes}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </>
        <>
          <h3 className="text-3xl font-extrabold text-gray-700">Missing Person Details</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 ${errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
              />
              <p className=" text-sm">The missing person's full, legal name as last used.</p>
            </div>
            <div>
              <label className="block text-sm font-medium">Alias</label>
              <input
                type="text"
                name="alias"
                value={formData?.alias}
                onChange={handleInputChange}
                className="mt-1 block w-full border rounded-md px-3 py-2 border-gray-300"
              />
              <p className=" text-sm">If they are known by other names, include them here.</p>
            </div>
            <div>
              <label className="block text-sm font-medium">Date of Birth (mm/dd/yyyy)</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData?.dateOfBirth}
                onChange={handleInputChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 ${errors?.dateOfBirth ? "border-red-500" : "border-gray-300"
                  }`}
              />
              <p className=" text-sm">Enter Date as: mm/dd/yyyy</p>
            </div>
            <div>
              <label className="block text-sm font-medium">Approximate Age at Missing</label>
              <input
                type="text"
                name="approxAgeAtMissing"
                value={formData?.approxAgeAtMissing}
                onChange={handleInputChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 ${errors?.dateOfBirth ? "border-red-500" : "border-gray-300"
                  }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Hair Color *</label>
            <select 
            name="hairColor"
            value={formData?.hairColor}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
            >
              <option value={""}>select One</option>
              {HairColor.map((hair) => (
                  <option key={hair} value={hair}>
                    {hair}
                  </option>
                ))}

            </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Eye Color *</label>
            <select 
            name="eyeColor"
            value={formData?.eyeColor}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
            >
              <option value={""}>select One</option>
              {eyeColor.map((eye) => (
                  <option key={eye} value={eye}>
                    {eye}
                  </option>
                ))}

            </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Height</label>
              <input
                type="text"
                name="height"
                value={formData?.height}
                onChange={handleInputChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 ${errors?.dateOfBirth ? "border-red-500" : "border-gray-300"
                  }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Weight</label>
              <input
                type="text"
                name="weight"
                value={formData?.weight}
                onChange={handleInputChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 ${errors?.dateOfBirth ? "border-red-500" : "border-gray-300"
                  }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
            <select 
            name="gender"
            value={formData?.gender}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
            >
              <option value={""}>select One</option>
              {GENDER.map((gen) => (
                  <option key={gen} value={gen}>
                    {gen}
                  </option>
                ))}

            </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Nationality</label>
            <select 
            name="gender"
            value={formData?.nationality}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
            >
              <option value={""}>Select One</option>
              {NATIONALITY.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}

            </select>
            </div>
            
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State *
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select State...</option>
                {Object.keys(statesAndCities).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City *
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
                disabled={!formData.state}
              >
                <option value="">Select City...</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 ">
          <div>
              <label className="block text-sm font-medium text-gray-700">
              Medical Conditions
              </label>
              <textarea
                name="medicalConditions"
                value={formData?.confidentialNotes}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
              Distinguishing Features
              </label>
              <textarea
                name="distinguishingFeatures"
                value={formData?.distinguishingFeatures}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
              Warnings
              </label>
              <textarea
                name="medicalConditions"
                value={formData?.confidentialNotes}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="text-sm text-black">Describe anything someone encountering the missing person should be cautious of.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
              Last Seen Wearing
              </label>
              <textarea
                name="medicalConditions"
                value={formData?.lastSeenWearing}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
             Circumstances of Disappearance *
              </label>
              <textarea
                name="circumstancesofDisappearance *"
                value={formData?.circumstancesofDisappearance}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="text-sm text-black">Be as specific as possible and include as much information as you can. This field will expand as much as needed.</p>
            </div>
          </div>
        </>


      </form>
    </div>
  );
};

export default MissingPersonForm;
