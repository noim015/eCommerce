import React, { useState } from 'react';
import { loginUser } from '../api/userApi';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData.email, formData.password);
      setMessage('✅ Login successful!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-4 mt-25">
      <h2 className="text-xl font-semibold text-center">Login</h2>

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
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Login
      </button>

      {message && <p className="text-sm text-center text-red-500">{message}</p>}
    </form>
  );
};

export default LoginForm;
