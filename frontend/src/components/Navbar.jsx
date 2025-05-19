import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">MyStore</Link>
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/products" className="hover:text-blue-500">Products</Link>
          <Link to="/cart" className="hover:text-blue-500">Cart</Link>
          <Link to="/login" className="hover:text-blue-500">Login</Link>
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-3 shadow">
          <Link to="/" className="block py-2">Home</Link>
          <Link to="/products" className="block py-2">Products</Link>
          <Link to="/cart" className="block py-2">Cart</Link>
          <Link to="/login" className="block py-2">Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
