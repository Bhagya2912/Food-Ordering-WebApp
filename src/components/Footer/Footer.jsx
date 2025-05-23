import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { FaArrowUpLong } from "react-icons/fa6";



function Footer() {
   const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercentage);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
       
    <footer className="bg-[#070E16] text-white px-6 pt-0">
      {/* Top Contact Bar */}
      <div className="bg-orange-500 rounded-b-3xl p-6 lg:flex justify-between items-center text-white mb-12">
        {/* Address */}
        <div className="flex items-center gap-4 mb-6 lg:mb-0">
          <div className="text-3xl"><i className="fas fa-location-dot"></i></div>
          <div>
            <p className="text-sm font-medium">Address</p>
            <p className="text-lg font-semibold">4648 Rocky Road Philadelphia</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4 mb-6 lg:mb-0">
          <div className="text-3xl"><i className="fas fa-envelope"></i></div>
          <div>
            <p className="text-sm font-medium">Send Email</p>
            <p className="text-lg font-semibold">foodieinfo@foodiemoodie.com</p>
          </div>
        </div>

        {/* Call */}
        <div className="flex items-center gap-4">
          <div className="text-3xl"><i className="fas fa-phone"></i></div>
          <div>
            <p className="text-sm font-medium">Call Emergency</p>
            <p className="text-lg font-semibold">+88 0123 654 99</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="grid md:grid-cols-4 gap-8 pb-16">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-white">FoodieMoodie</h2>
            <i className="fas fa-concierge-bell text-2xl text-orange-500"></i>
          </div>
          <hr className="border-orange-500 w-16 mb-4" />
          <p className="text-gray-300 text-sm mb-4">
            “Craving. Click. Delivered. That’s the FoodieMoodie way.Your mood. Our food.Food that fits your mood.
Serving smiles one bite at a time.

Hungry? Let FoodieMoodie fix that."


          </p>
          <div className="flex space-x-4">
            <a href="#"><i className="fab fa-facebook-f border p-2 rounded hover:bg-white hover:text-black"></i></a>
            <a href="#"><i className="fab fa-x-twitter border p-2 rounded hover:bg-white hover:text-black"></i></a>
            <a href="#"><i className="fab fa-linkedin-in border p-2 rounded hover:bg-white hover:text-black"></i></a>
            <a href="#"><i className="fab fa-youtube border p-2 rounded hover:bg-white hover:text-black"></i></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <hr className="border-orange-500 w-10 mb-2" />
          <ul className="space-y-2">
            <li><i className="fas fa-angles-right mr-2 text-orange-500"></i> About Us</li>
            <li><i className="fas fa-angles-right mr-2 text-orange-500"></i> Our Gallery</li>
            <li><i className="fas fa-angles-right mr-2 text-orange-500"></i> Our Blogs</li>
            <li><i className="fas fa-angles-right mr-2 text-orange-500"></i> FAQ’S</li>
            <li><i className="fas fa-angles-right mr-2 text-orange-500"></i> Contact Us</li>
          </ul>
        </div>

        {/* Our Menu */}
        <div>
          <h3 className="text-xl font-bold mb-4">Our Menu</h3>
          <hr className="border-orange-500 w-10 mb-2" />
          <ul className="space-y-2">
            <li><i className="fas fa-angles-right mr-2 text-orange-500"></i> Burger King</li>
            <li><i className="fas fa-angles-right mr-2 text-orange-500"></i> Pizza King</li>
            <li><i className="fas fa-angles-right mr-2 text-orange-500"></i> Fresh Food</li>
            <li><i className="fas fa-angles-right mr-2 text-orange-500"></i> Vegetable</li>
            <li><i className="fas fa-angles-right mr-2 text-orange-500"></i> Desserts</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <hr className="border-orange-500 w-10 mb-4" />
          <p className="text-gray-400 mb-2">Monday – Friday: <span className="text-orange-500">8am – 4pm</span></p>
          <p className="text-gray-400 mb-4">Saturday: <span className="text-orange-500">8am – 12am</span></p>
          <div className="flex items-center mb-4">
            <input
              type="email"
              placeholder="Your email address"
              className="p-2 rounded-l bg-white text-black w-full"
            />
            <button className="bg-orange-500 p-2 rounded-r">
              <i className="fas fa-arrow-right text-white"></i>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="policy" />
            <label htmlFor="policy" className="text-sm text-gray-300">
              I agree to the <a href="#" className="underline text-white">Privacy Policy.</a>
            </label>
          </div>
          </div>
     
                    
                    <div
      style={{
        position: "fixed",
        bottom: "15px",
        right: "15px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        transition: "opacity 0.3s ease, visibility 0.3s ease",
      }}
      onClick={scrollToTop}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          style={{
            strokeDasharray: "307.919, 307.919",
            strokeDashoffset: `${(1 - scrollProgress / 100) * 307.919}px`,
            fill: "none",
            stroke: "#ff9800",
            strokeWidth: "2",
            transition: "stroke-dashoffset 50ms linear",
          }}
        />
      </svg>
      <FaArrowUpLong style={{ color: "#ff9800", fontSize: "20px", zIndex: 10 }} />
    </div>
      </div>
      
    </footer>
  );
};

export default Footer

