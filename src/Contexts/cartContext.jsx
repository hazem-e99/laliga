import React, { createContext, useState, useEffect } from "react";

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
      rate: product?.rate || product?.rating?.rate || null,
      brand: product?.brand || "No brand",
    };
  };
  
  const isProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);  
  };
  
  const addProductToCart = (product) => {
    const normalizedProduct = normalizeProduct(product);
  
    if (isProductInCart(normalizedProduct)) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === normalizedProduct.id
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...normalizedProduct, count: 1 }]);
    }
  };
  const removeSpecificItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
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
