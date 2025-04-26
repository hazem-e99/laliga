import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2'; // استدعاء sweetalert2

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const { t } = useTranslation();
  const [cartCount, setCartCount] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    const parsed = storedCart ? JSON.parse(storedCart) : [];
    return parsed.reduce((acc, item) => acc + item.count, 0);
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const totalCount = cart.reduce((acc, item) => acc + item.count, 0);
    setCartCount(totalCount);
  }, [cart]);

  const normalizeProduct = (product) => {
    return {
      ...product,
      id: product.id || `${product.name}-${product.brand}-${Date.now()}`,
      rate: product?.rate || product?.rating?.rate || null,
      brand: product?.brand || "No brand",
    };
  };

  const isProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const addProductToCart = async (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      const result = await Swal.fire({
        title: 'Login Required',
        text: 'You must be logged in to add products to the cart. Do you want to login now?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        window.location.href = "/laliga/#/login";
      }

      return;
    }

    const normalizedProduct = normalizeProduct(product);

    if (isProductInCart(normalizedProduct)) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === normalizedProduct.id
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
      toast.success(t('product_quantity_increased'));
    } else {
      setCart((prevCart) => [...prevCart, { ...normalizedProduct, count: 1 }]);
      toast.success(t('product_added_successfully'));
    }
  };

  const removeSpecificItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.success(t('product_removed_successfully'));
  };

  const updateItem = (productId, count) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, count: count } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success(t('cart_cleared_successfully'));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addProductToCart,
        removeSpecificItem,
        updateItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
