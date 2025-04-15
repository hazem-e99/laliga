import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

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

  const addProductToCart = (product) => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "/login"; 
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
      toast.success("🛒 Product quantity increased in the cart!");
    } else {
      setCart((prevCart) => [...prevCart, { ...normalizedProduct, count: 1 }]);
      toast.success("✅ Product added to cart successfully!");
    }
  };

  const removeSpecificItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.success("🗑️ Product removed from cart successfully!");
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
    toast.success("🧹 Cart has been cleared successfully!");
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
