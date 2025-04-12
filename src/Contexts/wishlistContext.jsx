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

  const normalizeProduct = (product) => {
    return {
      ...product,
      id: product.id || `${product.name}-${product.brand}-${Date.now()}`, // توليد id فريد
      rate: product?.rate || product?.rating?.rate || null,
      brand: product?.brand || "No brand",
    };
  };

 
  const isProductInWishlist = (product) => {
    return wishlist.some((item) => item.id === product.id); // نبحث عن المنتج باستخدام الـ id الفريد
  };

  const addToWishlist = (item) => {
    const normalizedProduct = normalizeProduct(item);

    if (!isProductInWishlist(normalizedProduct)) {
      setWishlist((prev) => [...prev, normalizedProduct]); // إضافة المنتج إذا لم يكن موجودًا
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
