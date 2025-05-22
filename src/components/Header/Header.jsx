import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Heart, Search } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
    const { cartItems,wishlistItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-[#070E16] border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="hidden lg:flex  items-center">
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
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Right-side buttons */}
          <div className="flex items-center lg:order-2">
            <Link
              to="/login"
              className="text-white hover:bg-black  font-medium  text-sm px-4 py-2 focus:outline-none"
            >
              Log in
            </Link>
            <Link
              to="/SignUp"
              className="text-white hover:bg-black  font-medium  text-sm px-4 py-2 focus:outline-none"
            >
              Sign Up
            </Link>
            <Link
              to="/"
              className="hidden lg:flex text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none"
            >
              Get started
            </Link>
            <Link to="/cart" className="relative text-white">
  <i className="fa-solid fa-cart-plus text-2xl"></i>
  <span
    className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5"
  >
    {cartCount}
  </span>
</Link>
            {/* Wishlist Icon */}
             <Link
  to="/wishlist"
  className="ml-5 flex items-center text-white hover:text-orange-500 relative"
>
  <div className="relative">
    <Heart size={30} />
    <span
      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5"
    >
      {wishlistCount}
    </span>
  </div>
</Link>         </div>

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
                >
                  Menu
                </NavLink>
              </li>
              
            </ul>

            {/* Search and Wishlist - Desktop only */}
            <div className="hidden lg:flex items-center gap-4 ml-4">
              {/* Search Icon */}
             
                <form className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-1 border text-white border-gray-300 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="text-white bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded-full text-sm"
                  >
                    Search
                  </button>
                </form>
              


            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
