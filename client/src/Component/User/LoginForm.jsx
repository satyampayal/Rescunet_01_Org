import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom"; // If you're using react-router for navigation
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAccount } from "../../redux/slices/authSlices";
import toast from "react-hot-toast";
const LoginForm = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Validation logic
  const validate = (field, value) => {
    switch (field) {
      case "email":
        const emailRegex = /\S+@\S+\.\S+/;
        if (!value.trim()) return "Email is required";
        if (!emailRegex.test(value)) return "Enter a valid email address";
        break;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 4) return "Password must be at least 4 characters";
        break;
      default:
        return null;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate on input change
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: validate(name, formData[name]) });
  };

  useEffect(() => {
    const isValid = Object.values(formData).every((value) => value.trim()) &&
      Object.values(errors).every((error) => !error);
    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleSubmit =async  (e) => {
    e.preventDefault();
    if (isFormValid) {
       const response= await dispatch(loginAccount(formData))
       if(response?.payload?.data?.status=="success") navigate('/')
        
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-400 to-teal-300 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 px-4 rounded-lg transition ${
              isFormValid
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <button
              className="text-blue-500 font-semibold"
              onClick={() => navigate('/user/register')}
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
