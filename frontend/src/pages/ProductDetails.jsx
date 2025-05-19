import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    // Dummy product fetch (replace with real API)
    const products = [
      { _id: '1', name: 'Bluetooth Speaker', price: 59, description: 'High quality sound', image: 'https://via.placeholder.com/300x200' },
      { _id: '2', name: 'Smart Watch', price: 129, description: 'Track your steps', image: 'https://via.placeholder.com/300x200' },
      { _id: '3', name: 'Wireless Mouse', price: 39, description: 'Ergonomic design', image: 'https://via.placeholder.com/300x200' }
    ];
    const found = products.find((p) => p._id === id);
    setProduct(found);
  }, [id]);

  const isInCart = cartItems.some((item) => item._id === id);

  if (!product) return <p className="mt-20 px-6">Loading...</p>;

  return (
    <div className="mt-20 px-6 max-w-xl mx-auto">
      <img src={product.image} alt={product.name} className="w-full h-60 object-cover rounded mb-4" />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <p className="mb-4">{product.description}</p>

      {isInCart ? (
        <p className="text-green-600">Already in cart</p>
      ) : (
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductDetails;
