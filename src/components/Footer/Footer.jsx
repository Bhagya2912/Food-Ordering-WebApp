import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowUpLong } from "react-icons/fa6";



function Footer() {
   const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Basic email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = () => {
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!isChecked) {
      alert('Please agree to the Privacy Policy.');
      return;
    }
    // Clear email field before navigating
  setEmail('');
   setIsChecked(false);

    // If all good, navigate to homepage
    navigate('/');
  };

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

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
const [popupUsed, setPopupUsed] = useState(false); // Track if user already clicked confirm/cancel


  const handleCallClick = () => {
    setShowPopup(true);
    setMessage('');
  };

 const handleConfirmCall = () => {
  setMessage('Calling now...');
  setShowPopup(false);

  // Auto-hide message after 3 seconds
  setTimeout(() => {
    setMessage('');
  }, 500);

  // Optional: Simulate call
  // window.location.href = 'tel:+88012365499';
};

const handleCancel = () => {
  setShowPopup(false);
  setMessage('Call cancelled.');

  // Auto-hide message after 3 seconds
  setTimeout(() => {
    setMessage('');
  }, 500);
};




  return (
       
    <footer className="bg-white text-black px-6 pt-0">
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
            <a
  href="mailto:foodieinfo@foodiemoodie.com"
  className="flex items-center gap-4 mb-6 lg:mb-0 hover:opacity-80 transition"
  target="_blank" 
  rel="noopener noreferrer"
>
  <div>
    <p className="text-sm font-medium">Send Email</p>
    <p className="text-lg font-semibold">foodieinfo@foodiemoodie.com</p>
  </div>
</a>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6 lg:mb-0">
         <div className="text-3xl"><i class="fa-regular fa-clock"></i></div>
          <div>
            <p className="text-sm font-medium">Monday – Friday: <span className="text-white-500">8am – 4pm</span></p>
            <p className="text-lg font-semibold">Saturday: <span className="text-white-500">8am – 12am</span></p>
          </div>
        </div>


        {/* Call */}
        <div className="flex items-center gap-4">
           <div className="relative">
     
       {/* Contact Section */}
      <div
        className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition"
        onClick={handleCallClick}
      >
        <div className="text-3xl"><i className="fas fa-phone"></i></div>
        <div>
          <p className="text-sm font-medium">Call Emergency</p>
          <p className="text-lg font-semibold">+88 0123 654 99</p>
        </div>
      </div>

      {/* Top-Aligned Popup */}
      {showPopup && (
        <div className="fixed top-15 left-1/2 transform -translate-x-1/2 bg-white px-6 py-4 rounded shadow-lg z-50 border border-gray-200">
          <p className="text-base text-black font-semibold mb-2 text-center">Do you want to call?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleConfirmCall}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Call
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Auto-disappearing Message */}
      {message && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded shadow-md z-50">
          {message}
        </div>
      )}
    </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="grid md:grid-cols-4 gap-8 pb-16">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-black">FoodieMoodie</h2>
            <i className="fas fa-concierge-bell text-2xl text-orange-500"></i>
          </div>
          <hr className="border-orange-500 w-16 mb-4" />
          <p className="text-black text-sm mb-4">
            “Craving. Click. Delivered. That’s the FoodieMoodie way.Your mood. Our food.Food that fits your mood.
Serving smiles one bite at a time.

Hungry? Let FoodieMoodie fix that."


          </p>
         <div className="flex space-x-4">
  <a
    href="https://www.facebook.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fab fa-facebook-f border p-2 rounded hover:bg-orange-500 hover:text-black"></i>
  </a>
  <a
    href="https://www.instagram.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fa-brands fa-instagram border p-2 rounded hover:bg-orange-500 hover:text-black"></i>
  </a>
  <a
    href="https://www.linkedin.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fab fa-linkedin-in border p-2 rounded hover:bg-orange-500 hover:text-black"></i>
  </a>
  <a
    href="https://youtu.be/FWJlEHS6P0Q"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fab fa-youtube border p-2 rounded hover:bg-orange-500 hover:text-black"></i>
  </a>
</div>

        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <hr className="border-orange-500 w-10 mb-2" />
          <ul className="space-y-2">
            <li><Link to="/about" className="flex items-center hover:text-orange-500 transition">
      <i className="fas fa-angles-right mr-2 text-orange-500"></i> About Us
    </Link></li>
            <li><Link to="/" className="flex items-center hover:text-orange-500 transition">
            <i className="fas fa-angles-right mr-2 text-orange-500"></i>  Home</Link></li>
            <li><Link to="/menu" className="flex items-center hover:text-orange-500 transition">
<i className="fas fa-angles-right mr-2 text-orange-500"></i> Our Menu</Link></li>
            <li><Link to="/offer" className="flex items-center hover:text-orange-500 transition">
            <i className="fas fa-angles-right mr-2 text-orange-500"></i> Our Offers</Link></li>
            <li><Link to="/contact" className="flex items-center hover:text-orange-500 transition">
            <i className="fas fa-angles-right mr-2 text-orange-500"></i> Contact Us</Link></li>
          </ul>
        </div>

        {/* Our Menu */}
       <div>
  <Link to="/menu">
    <h3 className="text-xl font-bold mb-4 cursor-pointer hover:text-orange-500 transition">
      Our Menu
    </h3>
  </Link>
  <hr className="border-orange-500 w-10 mb-2" />
  <ul className="space-y-2">
    <li>
      <Link to="/menu" className="flex items-center hover:text-orange-500 transition">
        <i className="fas fa-angles-right mr-2 text-orange-500"></i> Pasta
      </Link>
    </li>
    <li>
      <Link to="/menu" className="flex items-center hover:text-orange-500 transition">
        <i className="fas fa-angles-right mr-2 text-orange-500"></i> Pizza
      </Link>
    </li>
    <li>
      <Link to="/menu" className="flex items-center hover:text-orange-500 transition">
        <i className="fas fa-angles-right mr-2 text-orange-500"></i> Fresh Food
      </Link>
    </li>
    <li>
      <Link to="/menu" className="flex items-center hover:text-orange-500 transition">
        <i className="fas fa-angles-right mr-2 text-orange-500"></i> Breakfast
      </Link>
    </li>
    <li>
      <Link to="/menu" className="flex items-center hover:text-orange-500 transition">
        <i className="fas fa-angles-right mr-2 text-orange-500"></i> Desserts
      </Link>
    </li>
  </ul>
</div>


        {/* Contact Us */}
        <div>
      <h3 className="text-xl font-bold mb-4">Subscribe</h3>

      <div className="flex items-center mb-4">
        <input
          type="email"
          placeholder="Your email address"
          className="p-2 rounded-l border bg-white text-black w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-orange-500 ml-1 p-2 rounded-r" onClick={handleSubscribe}>
          <i className="fas fa-arrow-right text-black"></i>
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="policy"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor="policy" className="text-sm text-black">
          I agree to the <a href="#" className="underline text-black">Privacy Policy.</a>
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

