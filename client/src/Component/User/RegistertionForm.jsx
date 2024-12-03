import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { createAccount } from "../../redux/slices/authSlices";
const RegistrationForm = () => {
   const navigate=useNavigate();
   const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Validation rules
  const validate = (field, value) => {
    switch (field) {
      case "firstName":
        if (!value.trim()) return "First Name is required";
        break;
      case "lastName":
        if (!value.trim()) return "Last Name is required";
        break;
      case "email":
        if (!value.trim() || !/\S+@\S+\.\S+/.test(value)) return "Valid Email is required";
        break;
      case "password":
        if (!value || value.length < 4) return "Password must be at least 4 characters";
        break;
      case "dob":
        if (!value) return "Date of Birth is required";
        if (new Date(value) > new Date()) return "Date of Birth cannot be in the future";
        break;
      default:
        return null;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update errors dynamically
    if (touched[name]) {
      setErrors({ ...errors, [name]: validate(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validate(name, formData[name]) });
  };

  useEffect(() => {
    // Check if the form is valid
    const isValid = Object.values(formData).every((value) => value.trim()) &&
      Object.values(errors).every((error) => !error);
    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleSubmit = async  (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log(formData)
      const response = await  dispatch(createAccount(formData))
      console.log(response)
      if(response?.data?.success){
        toast.success("User Register Successfully")
      setIsFlipped(true);// Trigger flip animation
       }
      // setTimeout(() => {
      //   setIsFlipped(false); // Reset flip after success
      // }, 1000); // Match flip animation timing
    }
  };
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google Sign-In successful!", credentialResponse);
    // Send credentialResponse to backend for verification
  };

  const handleGoogleLoginError = () => {
    console.error("Google Sign-In failed!");
  };
  return (
    <div className="h-[110vh] bg-gradient-to-r from-[#051622] via-[#1ba098] to-[#deb992] flex items-start justify-center">
      <div
        className={`relative w-full max-w-md mt-10 transition-transform duration-700 transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          perspective: "100px",
        }}
      >
        {/* Front Side */}
        <div
          className={`absolute w-full bg-white shadow-lg rounded-lg p-8 ${
            isFlipped ? "hidden" : "block"
          }`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <h1 className="text-2xl font-bold mb-4 text-center">User Registration</h1>
          <form onSubmit={handleSubmit} noValidate>
            {["firstName", "lastName", "email", "password", "dob"].map((field, index) => (
              <div className="mb-4" key={index}>
                <label
                  className="block text-sm font-medium mb-1 capitalize"
                  htmlFor={field}
                >
                  {field === "dob" ? "Date of Birth" : field}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type={field === "dob" ? "date" : field === "password" ? "password" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    errors[field] && touched[field]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors[field] && touched[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 px-4 rounded-lg transition ${
                isFormValid
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Register
            </button>
          </form>
           {/* Google Sign-In Option */}
        <div className="mt-4 text-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            useOneTap
          />
        </div>

        {/* Login Option */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <button
              className="text-blue-500 font-semibold"
              onClick={()=>navigate('/user/login')}
            >
              Login here
            </button>
          </p>
        </div>
        </div>

        {/* Back Side */}
        <div
          className={`absolute w-full bg-green-500 text-white shadow-lg rounded-lg p-8 flex flex-col gap-3 items-center justify-center ${
            isFlipped ? "block" : "hidden"
          }`}
          style={{
            transform: "rotateY(180deg) rotateY(180deg)",
          }}
        >
       <h2 className="text-2xl font-bold">Thank you for registering!😊</h2>
  <p className="text-lg text-center">
    Please check your email to verify you are a real user .
  </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
