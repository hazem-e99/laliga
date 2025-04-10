// src/Contexts/wishlistContext.js
import { createContext, useEffect, useState } from 'react';

export const WishlistContext = createContext();

const getInitialWishlist = () => {
  const stored = localStorage.getItem('wishlist');
  return stored ? JSON.parse(stored) : [];
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(getInitialWishlist());

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item) => {
    if (!wishlist.some((p) => p.id === item.id)) {
      setWishlist((prev) => [...prev, item]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
