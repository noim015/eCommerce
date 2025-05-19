import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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

          {/* Total */}
          <div className="text-right mt-6">
            <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>

            <Link to="/checkout">
              <button className="mt-3 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
