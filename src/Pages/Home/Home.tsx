import { useEffect, useState } from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loading from "../../Components/Loading/Loading";
import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  images: string[];
  category: Category;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  quantity: number;
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Scroll event handler to show/hide arrow button
  useEffect(() => {
    const handleScroll = () => {
      // Show arrow when scrolled down more than 300px
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Scroll to products section function
  const scrollToProducts = () => {
    const productsSection =
      document.querySelector(".products-grid") ||
      document.querySelector(".grid");
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      // Fallback: scroll down 80vh if no products section found
      window.scrollTo({
        top: window.innerHeight * 0.8,
        behavior: "smooth",
      });
    }
  };

  async function getAllProducts(page: number = 1, loadMore: boolean = false) {
    if (loadMore) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    setError(null);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=20`
      );

      if (loadMore) {
        setProducts((prev) => [...prev, ...data.data]);
      } else {
        setProducts(data.data);
        console.log(data.data);
      }

      // Check if there are more pages
      setHasMore(
        data.data.length === 20 &&
          data.metadata.currentPage < data.metadata.numberOfPages
      );
      setIsLoading(false);
      setIsLoadingMore(false);
    } catch (error) {
      console.log("Error fetching data", error);
      setError("Failed to load products. Please try again.");
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }

  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getAllProducts(nextPage, true);
  };

  useEffect(() => {
    getAllProducts(1);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ErrorBoundary>
        <HeroSection />

        {/* Scroll down arrow button - shown on initial load */}
        <button
          onClick={scrollToProducts}
          className="fixed bottom-16 right-6 z-40 cursor-pointer bg-blue-500 dark:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 animate-bounce"
          aria-label="Scroll to products"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>

        {/* Scroll to top arrow button - shown when scrolled down */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-16 right-6 z-50 cursor-pointer bg-gray-800 dark:bg-gray-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        )}

        {error && !isLoading && (
          <div className="error-message text-center py-8 bg-white dark:bg-gray-800">
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={() => getAllProducts(1)}
              className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Added products-grid class for better targeting */}
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 min-h-screen">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              img={product.imageCover}
              category={product.category.name}
              productName={product.title}
              price={product.price}
              priceAfterDiscount={product.priceAfterDiscount}
              ratingsAverage={product.ratingsAverage}
            />
          ))}
        </div>

        {hasMore && !error && (
          <div className="text-center py-8 bg-white dark:bg-gray-900">
            <button
              onClick={loadMoreProducts}
              disabled={isLoadingMore}
              className="bg-gray-800 dark:bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? "Loading..." : "Load More Products"}
            </button>
          </div>
        )}
      </ErrorBoundary>
    </>
  );
}

export default Home;
