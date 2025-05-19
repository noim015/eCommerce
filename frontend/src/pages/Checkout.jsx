import React from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="mt-20 px-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        {cartItems.map(item => (
          <div key={item._id} className="flex justify-between border-b py-2">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <div className="flex justify-between mt-4 font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={() => alert("Checkout simulation - place order logic here")}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
