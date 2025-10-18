import { Eye, Heart, ShoppingCart, Star } from "lucide-react";

function ProductCard() {
  return (
    <div className="col-span-2 p-2 relative rounded-md overflow-hidden group cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Image Container with Overlay */}
      <div className="relative rounded-md overflow-hidden">
        <img
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          src="https://ecommerce.routemisr.com/Route-Academy-products/1680403266739-cover.jpeg"
          alt="Product"
        />

        {/* Hover Overlay */}
        <div className="layer absolute inset-0 bg-blue-400/30 dark:bg-blue-600/30 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {/* Icons Container - Hidden by default, slides from left on hover */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <div className="flex flex-col gap-4 transform -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
              <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-xl">
                <Eye className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
              </div>
              <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-xl delay-75">
                <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400" />
              </div>
              <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-xl delay-150">
                <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h3 className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Category
        </h3>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">
          Product Name
        </h2>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          150 L.E
        </span>
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            4.5
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
