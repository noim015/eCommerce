import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) return prev;
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const increaseQty = (productId) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseQty = (productId) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0) // Remove if qty is 0
  );
};


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQty,decreaseQty  }}>
      {children}
    </CartContext.Provider>
  );
};
