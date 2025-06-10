import { useState, useEffect, useContext } from "react";
import { Link, NavLink,useNavigate } from "react-router-dom";
import { Heart, Menu } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import SearchBar from "../SearchBar/SearchBar";
import { useCart } from "../../context/CartContext";
import { faTags } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png'; // ✅ Correct path
import { AuthContext } from "../../context/AuthContext";
import { Tag, BadgePercent } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartItems, wishlistItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const wishlistCount = wishlistItems.length || 0;
  const { user,logout } = useContext(AuthContext);
 const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
 
  const handleLogout = () => {
    logout();  // Use context logout
  navigate("/home");
  };


 const toggleSidebar = (e) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
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
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="hidden lg:flex items-center">
  <img
    src="https://myfoodie.world/wp-content/uploads/2018/08/foodie_Logo_pos.png"
    className="mr-0  w-auto h-30 max-h-12  object-contain"
    alt="Logo"
  />
</Link>
         

          {/* Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center p-2 size-10 ml-3 text-sm text-black rounded-lg lg:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Right-side buttons */}
          <div className="flex items-center lg:order-2">
            <Link
              to="/SignUp"
              className="text-white hover:bg-black font-medium text-sm px-4 py-2 focus:outline-none"
              aria-label="Sign up"
            >
           
            </Link>
            
            <Link to="/cart" className="relative  text-black" aria-label={`Cart with ${cartCount} items`}>
              <FontAwesomeIcon icon={faCartPlus} className="text-2xl" />
              <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            </Link>
            <Link
  to="/wishlist"
  className="ml-5 flex items-center text-black hover:text-orange-500 relative"
  aria-label={`Wishlist with ${wishlistCount} items`}
>
  <div className="relative">
    <Heart size={30} />
    {isLoggedIn && wishlistCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
        {wishlistCount}
      </span>
    )}
  </div>
</Link>

             {user ? (
        <div className="relative inline-block text-left">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="cursor-pointer text-white ml-8 bg-orange-600 text-sm px-4 py-2 rounded font-semibold focus:outline-none"
          >
            Welcome,  {user.fullName} <i className="fa-solid fa-user ml-1"></i>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-47 bg-white border rounded shadow-lg z-50">
               <button>
                    <Link
                      to="/Profile"
                     className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? "text-orange-500" : "text-white"} hover:text-orange-700`
                    }
                      aria-label="Place a new order"
                    >
                 <div className="flex items-center px-4 py-2 gap-2 cursor-pointer hover:text-red-800 text-black">
  <i className="fa-solid fa-user"></i>
  <span className="block text-left">Profile</span>
</div>
                    </Link>  
              </button>         
  <button
    onClick={() => {
      if (isSidebarOpen) toggleSidebar(); // Close the sidebar if it's open
      if (user) {
        navigate("/order-history");
      } else {
        navigate("/login");
      }
    }}
    className="cursor-pointer block w-full px-4 py-2 text-left text-black hover:text-red-800"
    aria-label="Order History"
  >
    Your Order
  </button>


              <button
                onClick={handleLogout}
                className="cursor-pointer block w-full px-4 py-2 text-left text-black hover:text-red-800"
              >
                Logout
              </button>
              
            </div>
          )}
        </div>
      ) : (
        <Link
  to="/login"
  className="cursor-pointer bg-orange-600 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded font-semibold focus:outline-none ml-4 sm:ml-8 w-auto"
>
  Login <i className="fa-solid fa-user ml-1"></i>
</Link>

      )}
   
          </div>

          {/* Mobile + Desktop Menu */}
          <div
            className={`${
              menuOpen ? "flex" : "hidden"
            } flex-col lg:flex lg:flex-row lg:space-x-8 w-full lg:w-auto lg:order-1 mt-4 lg:mt-0`}
            id="mobile-menu"
          >
            <ul className="flex flex-col lg:flex-row font-medium w-full mt-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? "text-orange-500" : "text-black"} hover:text-orange-700`
                  }
                  onClick={() => setMenuOpen(false)}
                  aria-label="Home"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? "text-orange-500" : "text-black"} hover:text-orange-700`
                  }
                  onClick={() => setMenuOpen(false)}
                  aria-label="About"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? "text-orange-500" : "text-Black"} hover:text-orange-700`
                  }
                  onClick={() => setMenuOpen(false)}
                  aria-label="Contact"
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? "text-orange-500" : "text-black"} hover:text-orange-700`
                  }
                  onClick={() => setMenuOpen(false)}
                  aria-label="Menu"
                >
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink
      to="/offer"
      className={({ isActive }) =>
        `flex items-center gap-1 py-2 px-3 mr-2 ${
          isActive ? "text-orange-500" : "text-black"
        } hover:text-orange-700`
      }
      onClick={() => setMenuOpen(false)}
      aria-label="Menu"
    >
      <BadgePercent className="w-5 h-5 text-black" />
      <span className="font-medium text-black">Offers</span>
      <span className="text-[10px] font-bold text-orange-500 ml-1 mb-3">NEW</span>
    </NavLink>
              </li>
            </ul>

            <div className="hidden text-black lg:flex items-center gap-4 ml-0 mr-12">
              <SearchBar />
            </div>
          </div>

         
        </div>
        
      </nav>
    </header>
  );
};

export default Header;