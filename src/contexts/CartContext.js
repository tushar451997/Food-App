import { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartLength, setCartLength] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart).length : 0;
  });

  const updateCartQuantity = (length) => {
    setCartLength(length);
  };

  return (
    <CartContext.Provider value={{ cartLength, updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };