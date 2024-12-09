import React, { useState } from "react";
import Step1 from "./AddComplain/Step1";
import Step2 from "./AddComplain/Step2";

const MissingPersonForm = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        "MISSING PERSON",
        "LOCATION",
        "PHOTOS",
        "POLICE",
        "MILITARY",
        "VEHICLE",
        "SOCIAL MEDIA",
    ];

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const isStepActive = (index) => index + 1 === currentStep;
    const isStepCompleted = (index) => index + 1 < currentStep;

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-md m-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-start">
                Enter A New Case
            </h2>
            <p className="text-lg text-gray-600 mb-6 text-start">
                Be sure you are prepared with all of the relevant information, including police contacts, 
                case number, and photos. All new cases must be verified before being published. 
                Please allow up to 48 hours for approval.
            </p>

            {/* Step Progress Indicator */}
            <div className="flex md:flex-row flex-col items-center justify-between mb-8 gap-1 ">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`flex-1  text-center  py-2 px-4  font-medium transition duration-300 rounded-full ${
                            isStepActive(index)
                                ? "bg-green-500 text-white"
                                : isStepCompleted(index)
                                ? "bg-green-300 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        {index+1}.{step}
                    </div>
                ))}
            </div>

            {/* Form */}
            <form className="space-y-8">
                {/* Render Step 1 Component */}
                {currentStep === 1 && <Step1 />}
                {currentStep === 2 && <Step2 />}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Previous
                        </button>
                    )}
                    {currentStep < steps.length && (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                        >
                            Next
                        </button>
                    )}
                    {currentStep === steps.length && (
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default MissingPersonForm;
