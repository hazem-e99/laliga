import React, { useState, useEffect } from 'react';
import { Routes, Route, } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from '../Components/Layout';
import ProductDetails from '../Pages/ProductDetails';
import { HashRouter } from "react-router-dom";

import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Cart from '../Pages/Cart';
import Register from '../Pages/Register';
import Wishlist from '../Pages/Wishlist';
import Profile from '../Pages/Profile';
import ProtectedRoute from '../Components/ProtectedRoute';
import Intro from '../Components/Intro';
import "../App/App.css";
import CompleteGoogleProfile from '../Pages/CompleteGoogleProfile';
import Payment from '../Pages/Payment';
import { CartProvider } from '../Contexts/cartContext';
import { WishlistProvider } from '../Contexts/wishlistContext';
import { Toaster } from "react-hot-toast";
import AdminDashboard from '../adminDashboard/AdminDashboard';
import Team from '../adminDashboard/pages/team/Team';
import Contact from '../adminDashboard/pages/contacts/Contacts';
import Calendar from '../adminDashboard/pages/calendar/Calendar';
import BarChart from '../adminDashboard/pages/barChart/BarChart';
import Dashboard from '../adminDashboard/pages/dashboard/Dashboard';
import PieChart from '../adminDashboard/pages/pieChart/PieChart';
import LineChart from '../adminDashboard/pages/lineChart/LineChart';
import Geography from '../adminDashboard/pages/geography/Geography';


function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return <Intro />;
  }

  return (
    <GoogleOAuthProvider clientId="367520079546-bd85slcaa4p4eerk1ioe0vnpgq9avggb.apps.googleusercontent.com">
      <CartProvider>
        <WishlistProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                fontSize: '18px',
                padding: '16px 24px',
                borderRadius: '12px',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#f0fdf4',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fef2f2',
                },
              },
            }}
          />

          <HashRouter>
          <Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/complete-google-profile" element={<CompleteGoogleProfile />} />
    <Route path="cart" element={<Cart />} />
    <Route path="wishlist" element={<Wishlist />} />
    <Route path="product/:id" element={<ProductDetails />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/payment" element={<Payment />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  </Route>
  <Route path="/admin" element={<AdminDashboard />}>
    <Route index element={<Dashboard />} />
    <Route path="team" element={<Team />} />
    <Route path="contacts" element={<Contact />} />
    <Route path="calendar" element={<Calendar />} />
    <Route path="barchart" element={<BarChart />} />
    <Route path="piechart" element={<PieChart />} />
    <Route path="linechart" element={<LineChart />} />
    <Route path="geography" element={<Geography />} />
  </Route>
</Routes>
          </HashRouter>
        </WishlistProvider>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;