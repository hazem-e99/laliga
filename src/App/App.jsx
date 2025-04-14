import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from '../Components/Layout';
import ProductDetails from '../Pages/ProductDetails';
import Dashboard from '../Pages/Dashboard';
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


function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return <Intro />;
  }

  return (
    <GoogleOAuthProvider clientId="367520079546-bd85slcaa4p4eerk1ioe0vnpgq9avggb.apps.googleusercontent.com">
      <CartProvider>
        <WishlistProvider>

          {/* Toast Notifications */}
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

          {/* App Routes */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="/complete-google-profile" element={<CompleteGoogleProfile />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="cart" element={<Cart />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="product/:id" element={<ProductDetails />} />
                  <Route path="ProductDetails" element={<ProductDetails />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
          
        </WishlistProvider>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
