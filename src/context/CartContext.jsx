import React, { createContext, useContext, useState, useEffect } from 'react';


// Create the Cart context
const CartContext = createContext();


// Hook to use the CartContext
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Cart state
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      return [];
    }
  });

  // Wishlist state
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const storedWishlist = localStorage.getItem('wishlistItems');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
      console.error('Failed to parse wishlist from localStorage:', error);
      return [];
    }
  });

  // Order history state
  const [orderHistory, setOrderHistory] = useState(() => {
    try {
      const storedOrders = localStorage.getItem('orderHistory');
      return storedOrders ? JSON.parse(storedOrders) : [];
    } catch (error) {
      console.error('Failed to parse order history from localStorage:', error);
      return [];
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Failed to save wishlist to localStorage:', error);
    }
  }, [wishlistItems]);

  // Sync order history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    } catch (error) {
      console.error('Failed to save order history to localStorage:', error);
    }
  }, [orderHistory]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Add item to wishlist
  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find(item => item.id === product.id)) {
        return prevItems; // already exists
      }
      return [...prevItems, product];
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // Place order
  const placeOrder = () => {
    if (cartItems.length === 0) {
      console.warn("Cannot place order: Cart is empty");
      return;
    }
    const order = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      items: [...cartItems], // Clone to avoid mutating
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "Pending",
    };
    console.log("Order placed:", order); // Debug log
    setOrderHistory((prevOrders) => [...prevOrders, order]);
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        orderHistory,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};