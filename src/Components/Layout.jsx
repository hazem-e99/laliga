import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTopButton from './ScrollToTopButton';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar/>
      {children ? children : <Outlet />} 
      <Footer/>
      <ScrollToTopButton/>
    </div>
  );
};

export default Layout;
