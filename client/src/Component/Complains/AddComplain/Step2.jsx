import { useState } from "react";
import statesAndCities from "../../statesAndCities.json"; // Import the JSON file
import NATIONALITY from "../../../constantdata/NATIONALITY";


function Step2() {
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        state: "",
        city: "",
        zipCode:"",
        region:"",
        province:"",
        country:"India"
      });

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });

  if (name === "state") {
    setCities(statesAndCities[value] || []); // Update cities based on state
  }
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md text-black">
    <form onSubmit={handleSubmit} className="space-y-6">
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

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
            <div>
              <label className="block text-sm font-medium">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 border-gray-300"
                  }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Region</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 border-gray-300"
                  }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Province</label>
              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                className={`mt-1 block w-full border rounded-md px-3 py-2 border-gray-300"
                  }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Nationality</label>
            <select 
            name="Nationality"
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
    </form>
   </div>
  )
}

export default Step2