import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useCart();
  const isInCart = (id) => cartItems.some((item) => item._id === id);

  useEffect(() => {
    // Replace with real API later
    setProducts([
      { _id: '1', name: 'Bluetooth Speaker', price: 59, image: 'https://via.placeholder.com/300x200' },
      { _id: '2', name: 'Smart Watch', price: 129, image: 'https://via.placeholder.com/300x200' },
      { _id: '3', name: 'Wireless Mouse', price: 39, image: 'https://via.placeholder.com/300x200' }
    ]);
  }, []);

  return (
    <div className="mt-20 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="border rounded-lg p-4 shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded mb-3" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <button
  onClick={() => addToCart(product)}
  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
  disabled={isInCart(product._id)}
>
  {isInCart(product._id) ? 'In Cart' : 'Add to Cart'}
</button>

    <Link to={`/product/${product._id}`}>
    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
        View
    </button>
    </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
