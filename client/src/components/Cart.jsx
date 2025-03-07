import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";

// Helper function for image URLs
const getImageUrl = (product, size = "thumbnail") => {
  if (!product || !product.image || !product.image.length) {
    return "https://via.placeholder.com/100";
  }

  const image = product.image[0];

  if (size === "full") {
    return `http://localhost:1337${image.url}`;
  }

  if (image.formats && image.formats[size]) {
    return `http://localhost:1337${image.formats[size].url}`;
  }

  // Fallback to full size
  return `http://localhost:1337${image.url}`;
};

const Cart = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsCartOpen(false)}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.documentId} className="p-4 flex">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={getImageUrl(item, "thumbnail")}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.title}</h3>
                        <p className="ml-4">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item.documentId, item.quantity - 1)
                          }
                          className="p-1 px-2"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-2 py-1">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.documentId, item.quantity + 1)
                          }
                          className="p-1 px-2"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.documentId)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6 space-y-2">
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full px-6 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;
