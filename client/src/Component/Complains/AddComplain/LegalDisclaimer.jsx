import  { useState } from "react";

const LegalDisclaimer = () => {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!agreed) {
      setError("You must agree to the terms before proceeding.");
    } else {
      setError("");
      alert("Thank you for agreeing to the terms. You may proceed.");
      // Proceed to the next step
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg text-black">
      <h1 className="text-2xl font-bold mb-4">Legal Disclaimer</h1>

      <p className="text-gray-700 mb-4">
        By entering data into the RescueNet profiling system, you acknowledge and agree to the following terms:
      </p>

      <ul className="list-disc pl-5 text-gray-700 mb-4">
        <li>
          <strong>Accuracy and Timeliness:</strong> RescueNet is not responsible for the accuracy or timeliness of the information provided. The responsibility for the accuracy and completeness of the data lies solely with the individual entering the information.
        </li>
        <li>
          <strong>Authorized Personnel:</strong> You confirm that you are either a law enforcement representative, a family member of the missing person being entered, or a verified volunteer of RescueNet. Unauthorized entry of data is strictly prohibited.
        </li>
        <li>
          <strong>Agreement to Terms:</strong> By checking the box below, you agree to the terms set forth in this disclaimer. You understand that any false or misleading information entered may have legal consequences and can impede the search and recovery efforts for missing persons.
        </li>
      </ul>

      <p className="text-gray-700 mb-4">
        By proceeding, you confirm that you have read and agree to the above terms.
      </p>

      {/* Agreement Switch */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="agreeSwitch"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="agreeSwitch" className="ml-2 text-sm text-gray-700">
          Do you agree to the above terms?
        </label>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Submit Button */}
      {/* <button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Submit
      </button> */}
    </div>
  );
};

export default LegalDisclaimer;
