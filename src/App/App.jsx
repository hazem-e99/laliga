import React from 'react';
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
import "../App/App.css"
import CompleteGoogleProfile from '../Pages/CompleteGoogleProfile';

function App() {
  return (
    <GoogleOAuthProvider clientId="367520079546-bd85slcaa4p4eerk1ioe0vnpgq9avggb.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="/complete-google-profile" element={<CompleteGoogleProfile />} />
{/* <CompleteGoogleProfile></CompleteGoogleProfile> */}
            <Route element={<ProtectedRoute />}>
              <Route path="cart" element={<Cart />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="profile" element={<Profile />} />
              <Route path="product/:id" element={<ProductDetails />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;