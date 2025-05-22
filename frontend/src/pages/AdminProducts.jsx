import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/axios'; // Use your axios instance

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/products/${id}`);
        setProducts(products.filter((product) => product._id !== id)); // Remove from local state
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-4">Admin: Manage Products</h1>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Link to="/admin/add-product" className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block">
            Add New Product
          </Link>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">${product.price}</td>
                  <td className="border px-4 py-2">
                    <Link to={`/admin/edit-product/${product._id}`} className="text-blue-600 hover:underline mr-2">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
