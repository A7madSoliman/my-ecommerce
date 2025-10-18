import { useEffect, useState } from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loading from "../../Components/Loading/Loading";

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function getAllProducts() {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
      console.log(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data", error);
      setError("Failed to load products. Please try again.");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        <HeroSection />
        <div className="error-message">
          <p>{error}</p>
          <button onClick={getAllProducts}>Retry</button>
        </div>
      </>
    );
  }

  return (
    <>
      <HeroSection />
      <div className="grid grid-cols-12">
        <ProductCard />
      </div>
    </>
  );
}

export default Home;
