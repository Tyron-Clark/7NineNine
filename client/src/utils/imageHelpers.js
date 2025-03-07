/**
 * Helper function to get the correct image URL from a product
 *
 * This function handles various edge cases like missing images
 * or missing image formats, and generates the full URL by
 * prepending the API base URL.
 *
 * @param {Object} product - The product object from the API
 * @param {string} size - The desired image size ('thumbnail', 'small', 'full')
 * @returns {string} - The complete image URL
 */
export const getImageUrl = (product, size = "thumbnail") => {
  // Handle case where product or image array is missing
  if (!product || !product.image || !product.image.length) {
    // Return placeholder image based on requested size
    if (size === "thumbnail") {
      return "https://via.placeholder.com/100";
    } else if (size === "small") {
      return "https://via.placeholder.com/375x500";
    } else {
      return "https://via.placeholder.com/800x600";
    }
  }

  const image = product.image[0];
  const baseUrl = "http://localhost:1337";

  // Return full-size image if requested
  if (size === "full") {
    return `${baseUrl}${image.url}`;
  }

  // Return requested format if available
  if (image.formats && image.formats[size]) {
    return `${baseUrl}${image.formats[size].url}`;
  }

  // Fallback to full size if the requested format isn't available
  return `${baseUrl}${image.url}`;
};
