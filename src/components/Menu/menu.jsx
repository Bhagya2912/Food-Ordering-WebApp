import React, { useEffect, useRef, useState } from "react";
import { food_list } from "../../assets/assets";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { menu_list } from "../../assets/assets";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or use HeroIcons or FontAwesome
import { Link } from "react-router-dom";

const Menu = () => {
  const [active, setActive] = useState(0);
   const { addToCart } = useCart();
   const navigate = useNavigate();
   const [selectedCategory, setSelectedCategory] = useState(null);


  const prev = () => {
  setActive((prev) => (prev === 0 ? food_list.length - 1 : prev - 1));
};

const next = () => {
  setActive((prev) => (prev === food_list.length - 1 ? 0 : prev + 1));
};



  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % food_list.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
 const [startIndex, setStartIndex] = useState(0);

 

  // Get 3 items in a looped manner
  const visibleItems = [
  food_list[startIndex % food_list.length],
  food_list[(startIndex + 1) % food_list.length],
  food_list[(startIndex + 2) % food_list.length],
  food_list[(startIndex + 3) % food_list.length],
];

const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };
  

  return (
    <>
    <section className="py-8 bg-white  relative px-12">
      <h2 className="text-4xl font-bold text-center text-black mb-6">
        Our Food Menu
      </h2>

      <div className="relative  px-10">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-orange-100"
        >
          <ChevronLeft className="w-6 h-6 text-orange-600" />
        </button>

        {/* Scrollable Menu */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-7 scrollbar-hide scroll-smooth"
        >
          {menu_list.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-center cursor-pointer"
              onClick={() => setSelectedCategory(item.menu_name)}
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className="w-24 h-24 mx-auto object-cover rounded-full border-4 border-orange-200 hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-sm font-medium text-gray-700 mt-2">
                {item.menu_name}
              </h3>
            </div>
            
          ))}
          
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-orange-100"
        >
          <ChevronRight className="w-6 h-6 text-orange-600" />
        </button>
      </div>

      {/* Sub-Items for Selected Category */}
      {selectedCategory && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-center text-orange-600 mb-6">
            {selectedCategory} Items
          </h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {food_list
    .filter((food) => food.category === selectedCategory)
    .map((food, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
      >
        <img
          onClick={() => navigate("/product-detail", { state: food })}
          src={food.image}
          alt={food.name}
          className="cursor-pointer w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105 hover:brightness-110"
        />
        <h4 className="text-lg font-semibold mt-2">{food.name}</h4>
        <p className="text-sm text-gray-500">{food.category}</p>
        <div className="flex gap-4 mt-3">
                    
  <button
    onClick={() =>
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        rating: item.rating,
      })
    }
    className="flex items-center gap-2 bg-emerald-600 text-white py-1 px-5 rounded hover:bg-emerald-700 transition duration-300"
  >
    <i className="fa-solid fa-cart-plus"></i> Add
  </button>

  <button
    onClick={() =>
      addToWishlist({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        rating: item.rating,
      })
    }
    className="flex items-center gap-2 bg-white text-red-500 py-1 px-5 rounded-full border border-red-300 hover:bg-red-50 transition duration-300"
  >
    <i className="fa-solid fa-heart"></i>
  </button>
</div>


                </div>
              ))}
              
          </div>
          
        </div>
      )}
    </section>
      <section>
        <div className="relative w-full h-[570px] flex flex-col items-center justify-center overflow-hidden bg-cover bg-center text-white-500"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
        >
          <h2 className="text-4xl font-bold text-white mb-8 italic underline">Best Seller Food Items</h2>

          <div className="relative w-full max-w-6xl flex items-center justify-center h-[400px]">
            <button onClick={prev} className="absolute left-0 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
              ‹
            </button>

            <div className="relative flex justify-center items-center w-full h-full">
              {food_list.map((item, index) => {
                const offset = index - active;
                const isActive = index === active;

                return (
                  <div
                    key={index}
                    className={`absolute transition-all duration-500 ease-in-out rounded-xl overflow-hidden shadow-2xl transform ${
                      isActive ? "scale-110 z-30" : "scale-75 z-10 blur-sm opacity-80"
                    }`}
                    style={{
                      transform: `translateX(${offset * 240}px)`,
                      width: "280px",
                      height: "360px",
                      cursor: "pointer",
                    }}
                    onClick={() => setActive(index)}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                );
              })}
            </div>

            <button onClick={next} className="absolute right-0 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
              ›
            </button>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-2xl font-semibold text-white">{food_list[active].name}</h3>
            <p className="text-sm uppercase text-white tracking-wide">{food_list[active].category}</p>
          </div>
        </div>
      </section>

      
    

      <div className="bg-white py-10 text-center">
        <h2 className="text-orange-500 font-semibold text-sm">🍽️ BEST FOOD MENU🍽️</h2>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Popular Food Items </h1>

        <div className="flex flex-wrap justify-center gap-6 px-4">
  {visibleItems.map((item, index) => (
    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-3 w-64 p-5">
      
       {/* Container for image and rotating border */}
        <div className="relative w-36 h-36 mx-auto mb-4 flex items-center justify-center">
          
          {/* Static Image (centered absolutely) */}
          <div className="absolute w-32 h-32 rounded-full overflow-hidden z-10"><img
  onClick={() => navigate("/product-detail", { state: item })}
  src={item.image}
  alt={item.name}
  className="cursor-pointer w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105 hover:brightness-110"
/>
 </div>

          {/* Rotating Dashed Border (in background) */}
          <div className="w-full h-full rounded-full border-2 border-dashed border-red-400 animate-rotate" />
      </div>
               <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
      <p className="text-gray-500">{item.description}</p>
      <p className="text-red-600 font-semibold text-lg mt-1">₹{item.price}</p>
     <button
  onClick={() =>
    addToCart({
      id: item.id, // Ensure `item.id` exists in your `food_list`
      name: item.name,
      price: item.price,
      image: item.image,
      rating: item.rating
    })
  }
  className="bg-emerald-600 text-white py-1 px-4 rounded hover:bg-red-700 transition duration-300"
>
   <i class="fa-solid fa-cart-plus"></i>{' '}
  Add
  
</button>
<button
  onClick={() =>
  addToWishlist({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    rating: item.rating
  })
}

  className="ml-5 cursor-pointer bg-white text-red-500 py-1 px-5 rounded-full border border-red-300 hover:bg-red-50  transition duration-300"
>
 <i class="fa-solid fa-heart"></i></button>

            </div>
          ))}
          
          
        </div>
        
         <style>
    {`
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .animate-rotate {
        animation: spin 5s linear infinite;
      }
    `}
  </style>

      </div>

      <style>
  {`
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;     /* Firefox */
    }
  `}
</style>

      
  

      
    </>
  );
};

export default Menu;


   

    
    
  