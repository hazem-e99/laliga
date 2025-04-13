import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

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

  const normalizeProduct = (product) => {
    return {
      ...product,
      id: product.id || `${product.name}-${product.brand}-${Date.now()}`, // Generating unique ID
      rate: product?.rate || product?.rating?.rate || null,
      brand: product?.brand || "No brand",
    };
  };

  const isProductInWishlist = (product) => {
    return wishlist.some((item) => item.id === product.id); // Check if product exists by ID
  };

  const addToWishlist = (item) => {
    const normalizedProduct = normalizeProduct(item);
  
    if (!isProductInWishlist(normalizedProduct)) {
      setWishlist((prev) => [...prev, normalizedProduct]);
      toast.success("❤️ Product added to wishlist!");
    } else {
      toast.error("⚠️ This product is already in your wishlist.");
    }
  };
  
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    toast.success("🗑️ Product removed from wishlist.");
  };
  
  const clearWishlist = () => {
    setWishlist([]);
    toast.success("🧹 Wishlist cleared.");
  };
  

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
