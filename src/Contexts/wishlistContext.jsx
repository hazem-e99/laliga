import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from 'react-i18next';

export const WishlistContext = createContext();

const getInitialWishlist = () => {
  const stored = localStorage.getItem("wishlist");
  return stored ? JSON.parse(stored) : [];
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(getInitialWishlist());
  const { t } = useTranslation();

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
    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "/login"; 
      return;
    }

    const normalized = normalizeProduct(product);
    const exists = wishlist.find((item) => item.id === normalized.id);

    if (exists) {
      toast.error(t('product_already_in_wishlist'));
      return;
    }

    setWishlist((prev) => [...prev, normalized]);
    toast.success(t('product_added_to_wishlist'));
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    toast.success(t('product_removed_from_wishlist'));
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
    toast.success(t('wishlist_cleared'));
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
