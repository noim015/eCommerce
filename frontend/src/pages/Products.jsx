import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';


const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, removeFromCart, cartItems } = useCart();

  useEffect(() => {
    // Dummy data for now
    setProducts([
      { _id: '1', name: 'Headphones', price: 99 },
      { _id: '2', name: 'Smart Watch', price: 149 },
      { _id: '3', name: 'Power Bank', price: 49 }
    ]);
  }, []);

  const isInCart = (id) => cartItems.some((item) => item._id === id);

  return (
    <div className="mt-20 px-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow-sm">
            <div className="h-32 bg-gray-200 rounded mb-3"></div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price}</p>
            {isInCart(product._id) ? (
              <button
                onClick={() => removeFromCart(product._id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Remove from Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
              
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
