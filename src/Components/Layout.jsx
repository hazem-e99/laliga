import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'; // 👈 لازم تضيف دي

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children ? children : <Outlet />} 
      <Footer />
    </div>
  );
};

export default Layout;
