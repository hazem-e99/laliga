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
      id: product.id || `${product.name}-${product.brand}-${Date.now()}`,
      rate: product?.rate || product?.rating?.rate || null,
      brand: product?.brand || "No brand",
    };
  };

  const isProductInWishlist = (product) => {
    return wishlist.some((item) => item.id === product.id);
  };

  const addToWishlist = (product) => {
    const normalized = normalizeProduct(product);
    const exists = wishlist.find((item) => item.id === normalized.id);

    if (exists) {
      toast.error("⚠️ This product is already in your wishlist.");
      return;
    }

    setWishlist((prev) => [...prev, normalized]);
    toast.success("❤️ Product added to wishlist!");
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    toast.success("🗑️ Product removed from wishlist.");
  };

  const toggleWishlist = (product) => {
    if (isProductInWishlist(product)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
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
        toggleWishlist,
        isProductInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
