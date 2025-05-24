import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import SearchBar from "../SearchBar/SearchBar";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartItems, wishlistItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const wishlistCount = wishlistItems.length || 0;

  const toggleSidebar = (e) => {
    e.preventDefault();
    console.log("Sidebar toggled:", !isSidebarOpen); // Debug log
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        console.log("Escape key pressed, closing sidebar"); // Debug log
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-[#070E16] border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="hidden lg:flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa5tsIAwU2JsxALAQei7ZeSzax8s2W4FusnkY5nsVJGEm8kxXz9lqQ_t-4IUkVCErhGG8&usqp=CAU"
              className="mr-5 h-12"
              alt="Logo"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/9561/9561688.png"
              className="mr-5 h-12"
              alt="Logo"
            />
          </Link>

          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center p-2 ml-3 text-sm text-white rounded-lg lg:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Right-side buttons */}
          <div className="flex items-center lg:order-2">
            <Link
              to="/login"
              className="text-white hover:bg-black font-medium text-sm px-4 py-2 focus:outline-none"
              aria-label="Log in"
            >
              Log in
            </Link>
            <Link
              to="/SignUp"
              className="text-white hover:bg-black font-medium text-sm px-4 py-2 focus:outline-none"
              aria-label="Sign up"
            >
              Sign Up
            </Link>
            <Link
              to="/"
              className="hidden lg:flex text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none"
              aria-label="Get started"
            >
              Get started
            </Link>
            <Link to="/cart" className="relative text-white" aria-label={`Cart with ${cartCount} items`}>
              <FontAwesomeIcon icon={faCartPlus} className="text-2xl" />
              <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            </Link>
            <Link
              to="/wishlist"
              className="ml-5 flex items-center text-white hover:text-orange-500 relative"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <div className="relative">
                <Heart size={30} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {wishlistCount}
                </span>
              </div>
            </Link>
          </div>

          {/* Mobile + Desktop Menu */}
          <div
            className={`${
              menuOpen ? "flex" : "hidden"
            } flex-col lg:flex lg:flex-row lg:space-x-8 w-full lg:w-auto lg:order-1 mt-4 lg:mt-0`}
            id="mobile-menu"
          >
            <ul className="flex flex-col lg:flex-row font-medium w-full">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? "text-orange-500" : "text-white"} hover:text-orange-700`
                  }
                  aria-label="Home"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? "text-orange-500" : "text-white"} hover:text-orange-700`
                  }
                  aria-label="About"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? "text-orange-500" : "text-white"} hover:text-orange-700`
                  }
                  aria-label="Contact"
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? "text-orange-500" : "text-white"} hover:text-orange-700`
                  }
                  aria-label="Menu"
                >
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Other"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? "text-orange-500" : "text-white"} hover:text-orange-700 flex items-center`
                  }
                  onClick={toggleSidebar}
                  aria-label="Open additional options"
                >
                  Other
                </NavLink>
              </li>
            </ul>

            <div className="hidden text-white lg:flex items-center gap-4 ml-4">
              <SearchBar />
            </div>
          </div>

          {/* Sidebar */}
          {isSidebarOpen && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
                onClick={toggleSidebar}
                aria-label="Close sidebar"
              ></div>
              <div
                className={`fixed top-0 left-0 h-full w-64 bg-[#070E16] text-white p-4 z-50 transform transition-transform duration-300 ease-in-out lg:w-80 ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
                role="dialog"
                aria-label="Sidebar navigation"
              >
                
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link
                      to="/profile"
                      className="text-white hover:text-orange-500"
                      onClick={toggleSidebar}
                      aria-label="View profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="text-white hover:text-orange-500"
                      onClick={toggleSidebar}
                      aria-label="Account settings"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/support"
                      className="text-white hover:text-orange-500"
                      onClick={toggleSidebar}
                      aria-label="Contact support"
                    >
                      Support
                    </Link>
                  </li>
                 <li>
                <Link
                  to="/order-history"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? "text-orange-500" : "text-white"} hover:text-orange-700`
                  }
                  aria-label="order-history"
                >
                 Order History
                </Link>
              </li>
                  <li>
                    <Link
                      to="/order"
                      className="text-white hover:text-orange-500"
                      onClick={toggleSidebar}
                      aria-label="Place a new order"
                    >
                     Offer
                    </Link>
                  </li>
                   <li>
                    <Link
                      to="/"
                      className="text-white hover:text-orange-500"
                      onClick={toggleSidebar}
                      aria-label="Place a new order"
                    >
                     Logout
                    </Link>
                  </li>
                  <button
                  onClick={toggleSidebar}
                  className="mb-4 text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-lg focus:outline-none"
                  aria-label="Close sidebar"
                >
                  Close 
                </button>
                </ul>
              </div>
            </>
          )}
        </div>
        
      </nav>
    </header>
  );
};

export default Header;