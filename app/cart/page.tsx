// app/cart/page.tsx
import React from 'react';
import { useCart } from '../../context/cartContext'; // Assuming you have a CartContext

const CartPage: React.FC = () => {
  const { cartItems, totalPrice, removeFromCart } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <h2>{item.name}</h2>
                <p>Price: ${item.price}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h2>Total Price: ${totalPrice}</h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;