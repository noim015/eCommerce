import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 text-center mt-auto">
      <p className="text-gray-600">&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
