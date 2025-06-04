import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!phoneRegex.test(phone)) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

   const newUser = { name: fullName, email, phone, password };
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = existingUsers.find((user) => user.email === email);
    if (userExists) {
      alert('User with this email already exists.');
      return;
    }

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    alert('Signup successful! Please log in.');
    navigate('/login');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2015/04/10/00/41/food-715542_1280.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
          🍔 Create Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleSignup}>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" required className="w-full px-4 py-2 border rounded-md" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required className="w-full px-4 py-2 border rounded-md" />
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required className="w-full px-4 py-2 border rounded-md" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full px-4 py-2 border rounded-md" />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required className="w-full px-4 py-2 border rounded-md" />
          <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-600 transition">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;


