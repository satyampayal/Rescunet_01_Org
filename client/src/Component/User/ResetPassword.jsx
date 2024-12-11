import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/slices/authSlices';
const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch=useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Simple email validation (just checking for the "@" symbol)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulating a successful submission
   const response=await dispatch(resetPassword({email}))
   if(response?.payload?.data?.success){
    setSuccess('A reset link has been sent to your email!');
    setEmail('');
   }

    
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-[#051622] via-[#1ba098] to-[#deb992]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Reset Password</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Success Message */}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
