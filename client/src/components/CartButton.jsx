import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const CartButton = () => {
  let cartItemCount = 0;
  let toggleCart = () => {};

  try {
    // Use try-catch to gracefully handle case when context isn't ready
    const cart = useCart();
    cartItemCount = cart.cartItemCount;
    toggleCart = cart.toggleCart;
  } catch (error) {
    console.log("Cart context not ready yet");
  }

  return (
    <button
      onClick={toggleCart}
      className="relative text-gray-800 hover:text-gray-600 focus:outline-none"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-6 h-6" />
      {cartItemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartItemCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;
