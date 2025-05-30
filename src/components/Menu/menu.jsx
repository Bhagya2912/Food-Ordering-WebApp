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
  const { wishlistItems,addToWishlist } = useCart();
   



  const prev = () => {
  setActive((prev) => (prev === 0 ? food_list.length - 1 : prev - 1));
};

const next = () => {
  setActive((prev) => (prev === food_list.length - 1 ? 0 : prev + 1));
};


  const restaurants = [
    {
      id: 1,
      name: "The Spice House",
      image:
        "https://b.zmtcdn.com/data/pictures/chains/0/18564420/313c34595541181e6132f9476b209e62_featured_v2.jpg",
      rating: 4.5,
      menu: [
        { id: "m1", name: "Chicken Curry", price: 12 },
        { id: "m2", name: "Paneer Butter Masala", price: 10 },
        { id: "m3", name: "Garlic Naan", price: 3 },
      ],
    },
    {
      id: 2,
      name: "Ocean's Delight",
      image:
        "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg",
      rating: 4.8,
      menu: [
        { id: "m4", name: "Grilled Salmon", price: 18 },
        { id: "m5", name: "Caesar Salad", price: 9 },
        { id: "m6", name: "Lemon Tart", price: 7 },
      ],
    },
    {
      id: 3,
      name: "Green Garden",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      rating: 4.3,
      menu: [
        { id: "m7", name: "Veggie Burger", price: 8 },
        { id: "m8", name: "Sweet Potato Fries", price: 5 },
        { id: "m9", name: "Mango Smoothie", price: 6 },
      ],
    },
    {
      id: 4,
      name: "Bella Italia",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/b3/78/fa/tamra-restaurant.jpg?w=600&h=-1&s=1",
      rating: 4.7,
      menu: [
        { id: "m10", name: "Margherita Pizza", price: 11 },
        { id: "m11", name: "Pasta Carbonara", price: 13 },
        { id: "m12", name: "Tiramisu", price: 7 },
      ],
    },
  ];

  




  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % food_list.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
 const [startIndex, setStartIndex] = useState(0);

 

  // Get 3 foods in a looped manner
  const visiblefoods = [
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

  const [selectedId, setSelectedId] = useState(null);

  const selectedRestaurant = restaurants.find((r) => r.id === selectedId);

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
          {menu_list.map((food, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-center cursor-pointer"
              onClick={() => setSelectedCategory(food.menu_name)}
            >
              <img
                src={food.menu_image}
                alt={food.menu_name}
                className="w-24 h-24 mx-auto object-cover rounded-full border-4 border-orange-200 hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-sm font-medium text-gray-700 mt-2">
                {food.menu_name}
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

      {/* Sub-foods for Selected Category */}
      {selectedCategory && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-center text-orange-600 mb-6">
            {selectedCategory} foods
          </h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {food_list
    .filter((food) => food.category === selectedCategory)
    .map((food, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow-md p-4 flex flex-col foods-center"
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
        id: food.id,
        name: food.name,
        price: food.price,
        image: food.image,
        rating: food.rating,
      })
    }
    className="cursor-pointer  gap-2 bg-emerald-600 text-white py-1 px-5 rounded hover:bg-emerald-700 transition duration-300"
  >
    <i className="fa-solid fa-cart-plus"></i> Add
  </button>

  <button
    onClick={() =>
      addToWishlist({
        id: food.id,
        name: food.name,
        price: food.price,
        image: food.image,
        rating: food.rating,
      })
    }
    className="cursor-pointer gap-2 bg-white text-red-500 py-1 px-5 rounded-full border border-red-300 hover:bg-red-50 transition duration-300"
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
        <div className="relative w-full h-[570px] flex flex-col foods-center justify-center overflow-hidden bg-cover bg-center text-white-500"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
        >
          <h2 className="text-4xl font-bold flex justify-center text-white mb-15 italic underline">Best Seller Food foods</h2>

          <div className="relative w-full max-w-6xl flex foods-center justify-center h-[400px]">
            <button onClick={prev} className="absolute left-0 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
              ‹
            </button>

            <div className="relative flex justify-center foods-center w-full h-full">
              {food_list.map((food, index) => {
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
                    <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
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

      
       <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Popular Restaurants Menu</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="cursor-pointer rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow bg-white"
            onClick={() =>
              setSelectedId((prev) => (prev === restaurant.id ? null : restaurant.id))
            }
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{restaurant.name}</h3>
              <p className="text-yellow-500">
                {"⭐".repeat(Math.floor(restaurant.rating))}{" "}
                <span className="text-gray-600 font-medium">{restaurant.rating.toFixed(1)}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Restaurant Menu */}
      {selectedRestaurant && (
        <div className="mt-12 max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 border">
          <h3 className="text-2xl font-bold mb-4">
            Menu — {selectedRestaurant.name}
          </h3>
          <ul className="divide-y divide-gray-200">
            {selectedRestaurant.menu.map((food) => (
              <li
                key={food.id}
                className="flex justify-between py-3 text-gray-800 font-medium"
              >
                
                <span>{food.name}</span>
                <span>${food.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          
          <button
            onClick={() => setSelectedId(null)}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Close Menu
          </button>
        </div>
      )}
    </section>

      <div className="bg-white py-10 text-center">
        <h2 className="text-orange-500 font-semibold text-sm">🍽️ BEST FOOD MENU🍽️</h2>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Popular Food foods </h1>

        <div className="flex flex-wrap justify-center gap-6 px-4">
  {visiblefoods.map((food, index) => (
    <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-3 w-64 p-5">
      
       {/* Container for image and rotating border */}
        <div className="relative w-36 h-36 mx-auto mb-4 flex foods-center justify-center">
          
          {/* Static Image (centered absolutely) */}
          <div className="absolute w-32 h-32 rounded-full overflow-hidden z-10"><img
  onClick={() => navigate("/product-detail", { state: food })}
  src={food.image}
  alt={food.name}
  className="cursor-pointer w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105 hover:brightness-110"
/>
 </div>

          {/* Rotating Dashed Border (in background) */}
          <div className="w-full h-full rounded-full border-2 border-dashed border-red-400 animate-rotate" />
      </div>
               <h3 className="text-lg font-bold text-gray-800">{food.name}</h3>
      <p className="text-gray-500">{food.description}</p>
      <p className="text-red-600 font-semibold text-lg mt-1">₹{food.price}</p>
     <button
  onClick={() =>
    addToCart({
      id: food.id, // Ensure `food.id` exists in your `food_list`
      name: food.name,
      price: food.price,
      image: food.image,
      rating: food.rating
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
    id: food.id,
    name: food.name,
    price: food.price,
    image: food.image,
    rating: food.rating
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


   

    
    
  