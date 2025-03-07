import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getImageUrl } from "../utils/imageHelpers";

const url = "http://localhost:1337/api/products?populate=*";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url);
        setProducts(response.data.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation to product detail
    e.stopPropagation(); // Stop event bubbling
    addToCart(product, 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products.map((product) => {
          const { documentId, title, description, price } = product;

          return (
            <div
              key={documentId}
              className="mt-9 w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            >
              <Link
                to={`/products/${documentId}?populate=*`}
                className="block h-full cursor-pointer"
              >
                <img
                  src={getImageUrl(product, "small")}
                  alt={title}
                  className="h-80 w-72 object-cover rounded-t-xl"
                />
                <div className="px-4 py-3 w-72">
                  <p className="text-lg font-bold text-black truncate block capitalize">
                    {title}
                  </p>
                  <span className="text-gray-400 mr-3 uppercase text-xs">
                    {description}
                  </span>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">
                      ${price}
                    </p>
                    <div className="ml-auto">
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
                        aria-label="Add to cart"
                      >
                        <ShoppingCart className="h-5 w-5 text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default ProductGrid;
