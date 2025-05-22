import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../utils/axios'; // ✅ use your axios instance

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    };

    fetchProduct();
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
