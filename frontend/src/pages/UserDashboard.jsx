import React, { useEffect, useState } from 'react';
import API from '../utils/axios';

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stored = localStorage.getItem('userInfo');
        if (!stored) {
          setError('You are not logged in.');
          return;
        }

        const profileRes = await API.get('/users/profile');
        const orderRes = await API.get('/orders/myorders');

        setUser(profileRes.data);
        setOrders(orderRes.data);
      } catch (err) {
        setError('Failed to load dashboard');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}</h2>

      <h3 className="text-xl font-medium mb-2">Your Orders</h3>
      <ul className="space-y-3">
        {orders.map((order) => (
          <li key={order._id} className="border p-3 rounded bg-gray-50">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {order.isPaid ? 'Paid' : 'Unpaid'}</p>
            <p><strong>Total:</strong> ${order.totalPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
