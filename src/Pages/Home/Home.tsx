import { useEffect, useState } from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loading from "../../Components/Loading/Loading";

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
      <HeroSection />

      {error && !isLoading && (
        <div className="error-message text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => getAllProducts(1)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Updated grid for 4 products on normal screens (xl) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 p-4 sm:p-6 lg:p-8">
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
        <div className="text-center py-8">
          <button
            onClick={loadMoreProducts}
            disabled={isLoadingMore}
            className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoadingMore ? "Loading..." : "Load More Products"}
          </button>
        </div>
      )}
    </>
  );
}

export default Home;
