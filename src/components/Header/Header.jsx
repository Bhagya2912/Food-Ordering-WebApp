import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart,Heart} from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-[#070E16] border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
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
              className="text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
            >
              Log in
            </Link>
            <Link
              to="/SignUp"
              className="text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
            >
              Sign Up
            </Link>
            <Link
              to="/"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none"
            >
              Get started
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 py-2 px-4 text-white hover:text-orange-700"
            >
              <ShoppingCart size={24} />
            </Link>
          </div>

          

          {/* Mobile Menu */}
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
            
          </div>
          
        </div>
        
      </nav>
    </header>
  );
};

export default Header;
