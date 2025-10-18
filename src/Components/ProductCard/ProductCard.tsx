import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react"; // Added for image error handling

// Local interface definition
interface ProductCardProps {
  img: string;
  category: string;
  productName: string;
  price: number;
  priceAfterDiscount?: number;
  id: string;
  ratingsAverage: number; // Added optional rating prop
}

const ProductCard: React.FC<ProductCardProps> = ({
  img,
  category,
  productName,
  price,
  priceAfterDiscount,
  ratingsAverage,
}) => {
  const [imageError, setImageError] = useState(false);
  const hasDiscount = priceAfterDiscount && priceAfterDiscount < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

  // Format price to handle decimal values
  const formatPrice = (price: number) => {
    return Math.round(price); // Or use price.toFixed(2) for decimals
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="p-2 relative rounded-md overflow-hidden group cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300 hover:shadow-lg">
      {/* Image Container with Overlay */}
      <div className="relative rounded-md overflow-hidden">
        {imageError ? (
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">No Image</span>
          </div>
        ) : (
          <img
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            src={img}
            alt={productName}
            onError={handleImageError}
            loading="lazy" // Added lazy loading
          />
        )}

        {/* Discount Badge - Top Right */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold z-10">
            -{discountPercentage}%
          </div>
        )}

        {/* Hover Overlay */}
        <div className="layer absolute inset-0 bg-blue-400/30 dark:bg-blue-600/30 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <div className="flex flex-col gap-4 transform -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
              <button
                className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Quick view"
              >
                <Eye className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
              </button>
              <button
                className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-xl delay-75 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Add to wishlist"
              >
                <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400" />
              </button>
              <button
                className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-xl delay-150 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {category}
        </h3>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1 line-clamp-2 min-h-[3.5rem]">
          {productName}
        </h2>
      </div>

      {/* Price Section */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {formatPrice(priceAfterDiscount)} L.E
              </span>
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(price)} L.E
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {formatPrice(price)} L.E
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {ratingsAverage}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
