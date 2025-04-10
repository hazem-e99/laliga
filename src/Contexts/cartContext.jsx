import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // حفظ cart في localStorage عند كل تغيير
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addProductToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, count: 1 }]);
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
      value={{ cart, addProductToCart, removeSpecificItem, updateItem , clearCart,}}
    >
      {children}
    </CartContext.Provider>
  );
};
