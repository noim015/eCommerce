import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <div className="mt-20 px-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between border p-4 rounded shadow-sm">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="bg-gray-200 px-2 rounded text-lg"
                >−</button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item._id)}
                  className="bg-gray-200 px-2 rounded text-lg"
                >+</button>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
