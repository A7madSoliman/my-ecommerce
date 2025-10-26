import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import AllProducts from "./Pages/AllProducts/AllProducts";
import NotFound from "./Components/NotFound/NotFound";
import RouterError from "./Components/RouterError/RouterError";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Signup/Signup";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <RouterError />, // Use the router error component
      children: [
        {
          index: true,
          element: (
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          ),
        },
        {
          path: "allProducts",
          element: (
            <ErrorBoundary>
              <AllProducts />
            </ErrorBoundary>
          ),
        },
        {
          path: "categories",
          element: (
            <ErrorBoundary>
              <h1>Categories</h1>
            </ErrorBoundary>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ErrorBoundary>
              <h1>Wishlist</h1>{" "}
            </ErrorBoundary>
          ),
        },
        {
          path: "signin",
          element: (
            <ErrorBoundary>
              <Signin />
            </ErrorBoundary>
          ),
        },
        {
          path: "signup",
          element: (
            <ErrorBoundary>
              <Signup />
            </ErrorBoundary>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
