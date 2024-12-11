import { useState } from "react";

const Step4 = () => {
    const [formData, setFormData] = useState({
        policeAgency: "",
        caseNumber: "",
        contactName: "",
        phone: "",
        email: "",
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.policeAgency) newErrors.policeAgency = "Local Police Agency is required.";
        if (!formData.caseNumber) newErrors.caseNumber = "Case/Report Number is required.";
        if (!formData.contactName) newErrors.contactName = "Contact name is required.";
        if (!formData.phone) newErrors.phone = "Phone number is required.";
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email must be valid.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Form Data Submitted: ", formData);
            alert("Law Enforcement Information Submitted Successfully!");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-md text-black">
            <h1 className="text-2xl font-bold mb-4">Law Enforcement Section</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="mb-4 ">
                    <label className="block text-sm font-medium mb-1">Local Police Agency *</label>
                    <input
                        type="text"
                        value={formData.policeAgency}
                        onChange={(e) => handleInputChange("policeAgency", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter local police agency name"
                    />
                    {errors.policeAgency && <p className="text-red-500 text-sm">{errors.policeAgency}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Case / Report # Assigned *</label>
                    <input
                        type="text"
                        value={formData.caseNumber}
                        onChange={(e) => handleInputChange("caseNumber", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter case or report number"
                    />
                    {errors.caseNumber && <p className="text-red-500 text-sm">{errors.caseNumber}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Who to contact *</label>
                    <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter contact name or unit"
                    />
                    {errors.contactName && <p className="text-red-500 text-sm">{errors.contactName}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Phone *</label>
                    <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter contact phone number"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter contact email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
            </div>
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

export default Step4;
