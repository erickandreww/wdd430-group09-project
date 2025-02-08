// context/CartContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Use useEffect to initialize cartItems from local storage
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const updatedCart = [...prev, item];
      localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update local storage
      return updatedCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter(item => item.id !== id);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update local storage
      return updatedCart;
    });
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, totalPrice, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};