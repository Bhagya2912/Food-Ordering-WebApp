import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
             
              
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
          🍔 Create Your Account
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-orange-600 font-semibold underline">
            Login here
          </a>
        </p>
      </div>
    </div>
       );
};

export default SignUp;

