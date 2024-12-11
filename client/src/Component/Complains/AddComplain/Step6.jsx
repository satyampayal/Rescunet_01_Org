import React, { useState } from "react";

const Step6 = () => {
    const [formData, setFormData] = useState({
        emailAddresses: "",
        dedicatedWebsite: "",
        policeProfilePage: "",
        facebookPage: "",
        twitterPage: "",
        instagramPage: "",
        linkedInPage: "",
        tiktokPage: "",
        youtubeAccount: "",
        socialMediaBehaviour: "",
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        console.log("Social Media Information Submitted: ", formData);
        alert("Social Media Information Submitted Successfully!");
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg text-black">
            <h1 className="text-2xl font-bold mb-4">Social Media Information</h1>

            <div className="grid  grid-cols-1 gap-6 md:grid-cols-3">
                {/* Email Addresses */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Any Known Email Addresses</label>
                    <input
                        type="text"
                        value={formData.emailAddresses}
                        onChange={(e) => handleInputChange("emailAddresses", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter email addresses separated by commas"
                    />
                </div>

                {/* Dedicated Website */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Dedicated Website For This Case</label>
                    <input
                        type="url"
                        value={formData.dedicatedWebsite}
                        onChange={(e) => handleInputChange("dedicatedWebsite", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter website URL"
                    />
                </div>

                {/* Police Profile Page */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Police Profile Page For Case</label>
                    <input
                        type="url"
                        value={formData.policeProfilePage}
                        onChange={(e) => handleInputChange("policeProfilePage", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter police profile page URL"
                    />
                </div>

                {/* Facebook Page */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Facebook Page Dedicated to This Case</label>
                    <input
                        type="url"
                        value={formData.facebookPage}
                        onChange={(e) => handleInputChange("facebookPage", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter Facebook page URL"
                    />
                </div>

                {/* Twitter Page */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Twitter/X Page</label>
                    <input
                        type="url"
                        value={formData.twitterPage}
                        onChange={(e) => handleInputChange("twitterPage", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter Twitter/X page URL"
                    />
                </div>

                {/* Instagram Page */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Instagram</label>
                    <input
                        type="url"
                        value={formData.instagramPage}
                        onChange={(e) => handleInputChange("instagramPage", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter Instagram profile URL"
                    />
                </div>

                {/* LinkedIn Page */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Missing Person's LinkedIn Account Page</label>
                    <input
                        type="url"
                        value={formData.linkedInPage}
                        onChange={(e) => handleInputChange("linkedInPage", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter LinkedIn profile URL"
                    />
                </div>

                {/* TikTok */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">TikTok</label>
                    <input
                        type="url"
                        value={formData.tiktokPage}
                        onChange={(e) => handleInputChange("tiktokPage", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter TikTok profile URL"
                    />
                </div>

                {/* YouTube Account */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">YouTube Account</label>
                    <input
                        type="url"
                        value={formData.youtubeAccount}
                        onChange={(e) => handleInputChange("youtubeAccount", e.target.value)}
                        className="w-full border rounded-md px-3 py-2 border-gray-300"
                        placeholder="Enter YouTube account URL"
                    />
                </div>
            </div>


            {/* Social Media Behaviour */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Social Media Behaviour</label>
                <textarea
                    value={formData.socialMediaBehaviour}
                    onChange={(e) => handleInputChange("socialMediaBehaviour", e.target.value)}
                    className="w-full border rounded-md px-3 py-2 border-gray-300"
                    placeholder="Describe the missing person's social media behaviour"
                    rows="4"
                />
                <p className="text-sm  ">If you have any information regarding the social media habits of the missing person, describe them for investigators.</p>
            </div>

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

export default Step6;
