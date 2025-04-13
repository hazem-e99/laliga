import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

const getInitialWishlist = () => {
  const stored = localStorage.getItem("wishlist");
  return stored ? JSON.parse(stored) : [];
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(getInitialWishlist());

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
// /////////////
const toggleWishlist = (product) => {
  if (isProductInWishlist(product)) {
    removeFromWishlist(product.id);
  } else {
    addToWishlist(product);
  }
};
// ///////
  const normalizeProduct = (product) => {
    return {
      ...product,
      id: product.id || `${product.name}-${product.brand}-${Date.now()}`, // توليد id فريد
      rate: product?.rate || product?.rating?.rate || null,
      brand: product?.brand || "No brand",
    };
  };

  const isProductInWishlist = (product) => {
    return wishlist.some((item) => item.id === product.id);
  };

  const addToWishlist = (product) => {
    const normalized = normalizeProduct(product);
    setWishlist((prevItems) => {
      const exists = prevItems.find(item => item.id === normalized.id);
      if (exists) return prevItems;
      return [...prevItems, normalized];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        toggleWishlist,             
        isProductInWishlist         
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};