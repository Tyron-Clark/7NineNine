import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:1337/api/products/${id}?populate=*`
        );
        setProduct(response.data.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
        Error loading product: {error}
      </div>
    );
  }

  if (!product) {
    return <p className="text-center">Product not found</p>;
  }

  const { title, description, price, image } = product;

  const imageUrl =
    image && image.length > 0
      ? `http://localhost:1337${image[0].url}`
      : "https://via.placeholder.com/375x500";

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-4xl font-bold my-8">{title}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <p className="text-gray-600">{description}</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-black mb-4">${price}</p>
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ease-in-out duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
