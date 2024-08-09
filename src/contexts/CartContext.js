import { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartLength, setCartLength] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart).length : 0;
  });
 
  const [cartdata,setCartData] = useState(()=>{
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  })

  const updateCartQuantity = (length) => {
    console.log(length)
    setCartLength(length);
  };

  const updateCartData = (data) =>{
    console.log(data)
    setCartData(data)
  }

  return (
    <CartContext.Provider value={{ cartLength, updateCartQuantity, cartdata, updateCartData }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };