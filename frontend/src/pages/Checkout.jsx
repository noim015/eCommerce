import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api/orderApi';
import API from '../utils/axios';

const Checkout = () => {
  const navigate = useNavigate();

  // 🛒  Assume you stored cart items in localStorage
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

  const [shipping, setShipping] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [message, setMessage] = useState('');

  // Derived totals
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 300 ? 0 : 20;
  const taxPrice = Number((0.1 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  // 👉  Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem('userInfo')) navigate('/login');
  }, [navigate]);

  const handleChange = (e) =>
    setShipping({ ...shipping, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress: shipping,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      const createdOrder = await placeOrder(orderData);
      // 🔄  Clear cart & redirect
      localStorage.removeItem('cartItems');
      navigate(`/order/${createdOrder._id}`);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Order failed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      {/* ===== Shipping Form ===== */}
      <form onSubmit={submitHandler} className="space-y-4">
        <h3 className="text-lg font-medium">Shipping Address</h3>
        {['address', 'city', 'postalCode', 'country'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handleChange}
            required
          />
        ))}

        {/* ===== Payment ===== */}
        <h3 className="text-lg font-medium pt-4">Payment Method</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="PayPal">PayPal</option>
          <option value="Stripe">Stripe</option>
          <option value="CashOnDelivery">Cash on Delivery</option>
        </select>

        {/* ===== Order Summary ===== */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium">Order Summary</h3>
          <ul className="text-sm leading-6">
            <li>Items: ${itemsPrice.toFixed(2)}</li>
            <li>Shipping: ${shippingPrice.toFixed(2)}</li>
            <li>Tax (10 %): ${taxPrice.toFixed(2)}</li>
            <li className="font-semibold">Total: ${totalPrice}</li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
        >
          Place Order
        </button>

        {message && <p className="text-red-500 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default Checkout;
