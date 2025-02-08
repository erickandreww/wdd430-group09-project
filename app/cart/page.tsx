// app/cart/page.tsx
"use client"; // Ensure this is at the top of the file

import React from 'react';
import { useCart } from '../../context/cartContext'; // Adjust the path based on your folder structure

const CartPage: React.FC = () => {
  const { cartItems, totalPrice, removeFromCart } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center mb-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Price: ${item.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-4">Total Price: ${totalPrice}</h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;