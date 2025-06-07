import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'; // ✅ Import AuthContext

// Create CartContext
const CartContext = createContext();

// Hook to use CartContext
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // ✅ Get current user

  // States
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  // ✅ Load user-specific data on login
  useEffect(() => {
    if (user?.email) {
      try {
        const cart = localStorage.getItem(`cart_${user.email}`);
        const wishlist = localStorage.getItem(`wishlist_${user.email}`);
        const orders = localStorage.getItem(`orders_${user.email}`);
        setCartItems(cart ? JSON.parse(cart) : []);
        setWishlistItems(wishlist ? JSON.parse(wishlist) : []);
        setOrderHistory(orders ? JSON.parse(orders) : []);
      } catch (error) {
        console.error("Error loading user-specific data:", error);
        setCartItems([]);
        setWishlistItems([]);
        setOrderHistory([]);
      }
    } else {
      // Clear data if no user
      setCartItems([]);
      setWishlistItems([]);
      setOrderHistory([]);
    }
  }, [user]);

  // ✅ Save user-specific cart to localStorage
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  // ✅ Save user-specific wishlist to localStorage
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, user]);

  // ✅ Save user-specific order history to localStorage
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`orders_${user.email}`, JSON.stringify(orderHistory));
    }
  }, [orderHistory, user]);

  // 🛒 Add to Cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  // ❌ Remove from Cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 🔄 Update Quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // 🧹 Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // ❤️ Add to Wishlist
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists ? prev : [...prev, product];
    });
  };

  // 💔 Remove from Wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 🧾 Place Order
  const placeOrder = () => {
    if (cartItems.length === 0) {
      console.warn("Cannot place order: Cart is empty");
      return;
    }

    const order = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      items: [...cartItems],
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "Pending",
    };

    setOrderHistory((prev) => [...prev, order]);
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
