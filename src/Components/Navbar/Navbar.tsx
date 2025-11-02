import { useState, useEffect } from "react";
import Logo from "../../assets/freshcart-logo.svg";
import { Menu, Moon, ShoppingCart, Sun, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const NavbarLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/allproducts" },
  { name: "Categories", href: "/categories" },
  { name: "Wishlist", href: "/wishlist" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();

  // Sync dark mode with document and localStorage
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Check if user is signed in on component mount (from localStorage, auth context, etc.)
  useEffect(() => {
    // You can replace this with your actual authentication check
    const isAuthenticated = localStorage.getItem("isSignedIn") === "true";
    setSignedIn(isAuthenticated);
  }, []);

  const handleAuthClick = () => {
    if (signedIn) {
      // Sign out logic
      setSignedIn(false);
      localStorage.setItem("isSignedIn", "false"); // Remove in real app
      // You might want to clear tokens/user data here
      navigate("/"); // Navigate to home after sign out
    } else {
      // Navigate to sign in page
      navigate("/signin");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <NavLink to="/">
              <img src={Logo} alt="logo" className="w-32 h-10 object-contain" />
            </NavLink>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              {NavbarLinks.map((link) => (
                <NavLink
                  to={link.href}
                  key={link.name}
                  className={({ isActive }) =>
                    `relative font-medium px-2 py-1 transition-colors
                  text-gray-700 dark:text-gray-200
                  hover:text-blue-600 dark:hover:text-blue-400
                  after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5
                  after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform
                  ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 after:scale-x-100"
                      : ""
                  }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Dark Mode */}
              <button
                aria-label="Toggle dark mode"
                onClick={() => setDark((d) => !d)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {dark ? (
                  <Sun className="w-5 h-5 text-yellow-600" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                )}
              </button>
              {/* Cart */}
              <NavLink
                to="/cart"
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                  4
                </span>
              </NavLink>
              {/* Sign in / Sign out */}
              <button
                onClick={handleAuthClick}
                className="cursor-pointer px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                {signedIn ? "Sign out" : "Sign in"}
              </button>
              {/* Hamburger */}
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((o) => !o)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {open ? (
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ${
            open
              ? "max-h-96 opacity-100 pointer-events-auto"
              : "max-h-0 opacity-0 pointer-events-none"
          } bg-white dark:bg-gray-800 shadow-sm`}
        >
          <div className="flex flex-col gap-2 px-4 py-4">
            {NavbarLinks.map((link) => (
              <NavLink
                to={link.href}
                key={link.name}
                className={({ isActive }) =>
                  `font-medium px-3 py-2 rounded transition-colors
                text-gray-700 dark:text-gray-200
                hover:bg-gray-100 dark:hover:bg-gray-800
                ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                    : ""
                }`
                }
                onClick={() => setOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
