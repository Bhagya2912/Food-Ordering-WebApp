import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { ShoppingCart } from 'lucide-react';
import { Heart } from 'lucide-react';


function Header() {
  return (
     <header className=" shadow sticky z-50 top-0">
            <nav className="bg-[#070E16] border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa5tsIAwU2JsxALAQei7ZeSzax8s2W4FusnkY5nsVJGEm8kxXz9lqQ_t-4IUkVCErhGG8&usqp=CAU"
                               className="mr-5 h-12 "
                            alt="Logo"
                        />
                         <img
                            src="https://cdn-icons-png.flaticon.com/128/9561/9561688.png"
                            className="mr-5 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2 ">
                        <Link
                            to="/login"
                            className="text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5  focus:outline-none"
                        >
                            Log in
                        </Link>
                       
                        <Link
                            to="/SignUp"
                            className="text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2  lg:py-2.5 focus:outline-none"
                        >
                            Sign Up
                        </Link>
                        <Link
                            to="/"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Get started
                        </Link>

                        <Link
        to="/cart"
        className="flex items-center gap-2 py-2 pr-4 pl-3 text-white border-b border-gray-100 duration-200 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
      >
        <ShoppingCart size={30} />
        <span></span>
      </Link>
  
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to="/"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/about"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/contact"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/menu"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-white"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    menu
                                </NavLink>
                            </li>

                            
                            
                             
  <li className="w-full lg:w-auto">
      <form  className="flex items-center gap-2">
        <input
          type="text"
          
          placeholder="Search..."
          className="px-3 py-1 border text-white border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
        />
        <button
          type="submit"
          className="text-white bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded-full text-sm"
        >
          Search
        </button>
      </form>
    </li>

    <li>
      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          `flex items-center gap-1 py-2 w-full pr-4 pl-3 duration-200 ${
            isActive ? "text-orange-700" : "text-white"
          } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
        }
      >
        <Heart size={18} />
        <span className="hidden sm:inline">Favourite</span>
      </NavLink>
    </li>


                  
                            
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header
