import React, { useState } from 'react';
import { registerUser } from '../api/userApi';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData.name, formData.email, formData.password);
      setMessage('🎉 Registration successful!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-4 mt-25">
      <h2 className="text-xl font-semibold text-center">Register</h2>

      <input
        name="name"
        type="text"
        placeholder="Full Name"
        className="w-full p-2 border border-gray-300 rounded"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full p-2 border border-gray-300 rounded"
        onChange={handleChange}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Register
      </button>

      {message && <p className="text-sm text-center text-red-500">{message}</p>}
    </form>
  );
};

export default RegisterForm;
