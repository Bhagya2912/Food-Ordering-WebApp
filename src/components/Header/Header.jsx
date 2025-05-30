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

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartItems, wishlistItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const wishlistCount = wishlistItems.length || 0;
  const { user,logout } = useContext(AuthContext);
 const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
 
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
    src="https://png.pngtree.com/png-clipart/20230323/original/pngtree-cooking-logo-png-image_9001296.png"
    className="mr-5 ml-10 w-auto h-30 max-h-12  object-contain"
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
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {wishlistCount}
                </span>
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
          className="cursor-pointer text-white ml-8 bg-orange-600 text-sm px-4 py-2 rounded font-semibold focus:outline-none"
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
            <ul className="flex flex-col lg:flex-row font-medium w-full">
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
                  to="/Other"
                  className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? "text-orange-500" : "text-black"} hover:text-orange-700 flex items-center`
                  }
                  onClick={toggleSidebar}
                  aria-label="Open additional options"
                >
                  Other
                </NavLink>
              </li>
            </ul>

            <div className="hidden text-black lg:flex items-center gap-4 ml-4">
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
                      Settings{' '}
                      <i class="fa-solid fa-gear" style={{ color: 'orange' }}></i>
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
  <button
    onClick={() => {
      if (isSidebarOpen) toggleSidebar(); // Close the sidebar if it's open
      if (user) {
        navigate("/order-history");
      } else {
        navigate("/login");
      }
    }}
    className="cursor-pointer block text-white hover:text-orange-700 w-full text-left"
    aria-label="Order History"
  >
    Order History
  </button>
</li>


                  <li>
                    <Link
                      to="/Offer"
                     className={({ isActive }) =>
                    `block py-2 px-3 ${isActive ? "text-orange-500" : "text-white"} hover:text-orange-700`
                    }
                      aria-label="Place a new order"
                    >
                  <span className="text-sm font-medium">Offers</span>{' '}
                  <FontAwesomeIcon icon={faTags} className="text-orange-600 mr-2" />
                    </Link>
                  </li>
                   <li>
              {user ? (
        <div className="flex items-center gap-3">
          <button className="cursor-pointer text-red-600 rounded flex items-center gap-2">
            <i className="fa-solid fa-user"></i> {user.fullName}
          </button>
          <button
            onClick={handleLogout}
            className="cursor-pointer text-sm white "
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login">
          <button className="cursor-pointer text-white  rounded flex items-center gap-2">
            <i className="fa-solid fa-user"></i> Login
          </button>
        </Link>
      )}
              </li>
                  <button
                  onClick={toggleSidebar}
                  className="cursor-pointer mb-4 text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-lg focus:outline-none"
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