import { createContext, useContext, useEffect, useState } from "react";

// Create cart context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Cart provider component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage or empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingItem = prevCart.find(
        (item) => item.documentId === product.documentId
      );

      if (existingItem) {
        // Update quantity if product exists
        return prevCart.map((item) =>
          item.documentId === product.documentId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item if product doesn't exist
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.documentId !== productId)
    );
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.documentId === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Provide cart context
  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
        cartTotal,
        toggleCart,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
