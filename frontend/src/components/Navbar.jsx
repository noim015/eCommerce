import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();


   // ✅ Track user login state
  const [userInfo, setUserInfo] = useState(() => {
    const stored = localStorage.getItem('userInfo');
    return stored ? JSON.parse(stored) : null;
  });

   // ✅ Update userInfo if login happens elsewhere
  useEffect(() => {
    const checkLogin = setInterval(() => {
      const stored = localStorage.getItem('userInfo');
      setUserInfo(stored ? JSON.parse(stored) : null);
    }, 500);

    return () => clearInterval(checkLogin);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cart');
  setUserInfo(null); // ✅ Update UI immediately
  window.location.href = '/'; // or use navigate()
};

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">MyStore</Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/products" className="hover:text-blue-500">Products</Link>

          {userInfo ? (
            <>
              <span className="text-sm text-gray-700">Hi, {userInfo.name}</span>
              <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
              <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-500">Login</Link>
              <Link to="/register" className="hover:text-blue-500">Register</Link>
            </>
          )}

          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-3 shadow">
          <Link to="/" className="block py-2">Home</Link>
          <Link to="/products" className="block py-2">Products</Link>
          <Link to="/cart" className="block py-2">Cart ({cartItems.length})</Link>

          {userInfo ? (
            <>
              <Link to="/dashboard" className="block py-2">Dashboard</Link>
              <button onClick={handleLogout} className="block text-red-500 py-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2">Login</Link>
              <Link to="/register" className="block py-2">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
