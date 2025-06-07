import React, { useEffect, useRef, useState } from "react";
import { food_list, menu_list } from "../../assets/assets";
import { useCart } from "../../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";


const Menu = () => {
  const [active, setActive] = useState(0);
  const { addToCart, wishlistItems, addToWishlist,removeFromWishlist } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const scrollRef = useRef(null);
  const [selectedMeal, setSelectedMeal] = useState("All");
  const [foodTypeFilter, setFoodTypeFilter] = useState("All");
  const [priceSort, setPriceSort] = useState("");

useEffect(() => {
  if (location.state?.meal) {
    setSelectedMeal(location.state.meal);
    window.history.replaceState({}, document.title); // Optional: prevents state from staying on refresh
  }
}, [location.state]);

  // Apply filters and sorting
  let filteredList = [...food_list];

  // 1. Filter by Meal
 if (selectedMeal !== "All") {
  filteredList = filteredList.filter(
    (item) =>
      item.category.toLowerCase() === selectedMeal.toLowerCase()
  );
} else {
  // For 'All' tab, just include all Breakfast/Lunch/Dinner items in original order
  filteredList = filteredList.filter((item) =>
    ["breakfast", "lunch", "dinner"].includes(item.category.toLowerCase())
  );
}

const [isVeg, setIsVeg] = useState(true); // true = Veg, false = Non-Veg

const filteredItems = food_list.filter((item) => {
  const categoryMatch =
    selectedCategory === "All Menu" || item.category === selectedCategory;

  const typeMatch = isVeg 
    ? item.type?.toLowerCase() === "veg" 
    : item.type?.toLowerCase() === "non-veg";

  return categoryMatch && typeMatch;
});

filteredList = filteredList.filter((item) => {
  const type = item.type?.toLowerCase() || "";
  return isVeg ? type === "veg" : type === "non-veg";
});

 useEffect(() => {
    if (location.state?.meal) {
      setSelectedMeal(location.state.meal);

      // Optional: clean up history state so it's not reused on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);


  // 3. Sort by Price
  if (priceSort === "low-high") {
    filteredList.sort((a, b) => a.price - b.price);
  } else if (priceSort === "high-low") {
    filteredList.sort((a, b) => b.price - a.price);
  }


  // For "Popular Food Items" section scrollingfilteredFood
  const [startIndex, setStartIndex] = useState(0);

  // For Restaurants menu selection
  const [selectedId, setSelectedId] = useState(null);

  // Randomly pick 5 best seller foods once on mount
  const [randomFiveFoods, setRandomFiveFoods] = useState([]);

  useEffect(() => {
    const shuffled = [...food_list].sort(() => 0.5 - Math.random());
    setRandomFiveFoods(shuffled.slice(0, 5));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % randomFiveFoods.length);
    }, 2000); // Scroll every 2 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [randomFiveFoods.length]);

  // Carousel next/prev handlers for best sellers
  const next = () => {
    setActive((prev) => (prev + 1) % randomFiveFoods.length);
  };

  const prev = () => {
    setActive((prev) => (prev - 1 + randomFiveFoods.length) % randomFiveFoods.length);
  };

  // Scroll category menu left/right
 

const scrollLeft = () => {
  scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
};

const scrollRight = () => {
  scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
};


  // Visible foods in "Popular Food Items" carousel (4 items)
  const visiblefoods = [
    food_list[startIndex % food_list.length],
    food_list[(startIndex + 1) % food_list.length],
    food_list[(startIndex + 2) % food_list.length],
    food_list[(startIndex + 3) % food_list.length],
  ];

  // Hardcoded restaurants data
  const restaurants = [
    {
      id: 1,
      name: "The Spice House",
      image:
        "https://b.zmtcdn.com/data/pictures/chains/0/18564420/313c34595541181e6132f9476b209e62_featured_v2.jpg",
      rating: 4.5,
      menuImage:
        "https://5.imimg.com/data5/SELLER/Default/2023/12/369633483/SE/ST/QF/87459547/paper-restaurant-menu-card-printing-service.jpeg",
      description:
        "The Spice House is a popular restaurant with multiple locations across India, including Jp Nagar in Bangalore, Shastri Nagar in Kullu, and various locations in Pune. Authentic Indian dishes made with traditional spices and rich flavors.",
    },
    {
      id: 2,
      name: "Ocean's Delight",
      image:
        "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg",
      rating: 4.8,
      menuImage:
        "https://5.imimg.com/data5/SELLER/Default/2022/4/PU/EJ/GK/4196722/restaurant-menu-card.png",
      description:
        "Located in the vibrant heart of mandaveli, Ocean Delight is a cherished culinary haven where tradition meets innovation. Known for its commitment to quality ingredients, delightful flavors, and exceptional service, Ocean Delight invites you to savor a dining experience like no other. Seafood specialties straight from the ocean to your plate.",
    },
    {
      id: 3,
      name: "Green Garden",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      rating: 4.3,
      menuImage:
        "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1708445866/catalog/1544703271697907712/jocfw2dk1kreyyfcqvdt.webp",
      description:
        "Green Garden Restaurant is a popular dining option in Pune, particularly in the Koregaon Bhima area. It offers a variety of cuisines, including North Indian, Chinese, Mughlai, and seafood. The restaurant is known for its family-friendly atmosphere, tasty food, and efficient service. Fresh and organic vegetarian meals inspired by nature.",
    },
    {
      id: 4,
      name: "Bella Italia",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/b3/78/fa/tamra-restaurant.jpg?w=600&h=-1&s=1",
      rating: 4.7,
      menuImage:
        "https://i.pinimg.com/736x/61/80/22/61802232d7486341974b13a5a40f63da.jpg",
      description:
        "Bella Italia Resto is an Italian restaurant in Blue Ridge Chowk, Pimpri-Chinchwad. It offers a cozy and refined dining atmosphere with a focus on authentic Italian cuisine. Their menu features pasta dishes, pizzas, and other Italian specialties, with a focus on quality ingredients and traditional recipes. Classic Italian cuisine with hand-tossed pizzas and homemade pasta.",
    },
     {
      id: 5,
      name: "The Spice House",
      image:
        "https://www.ohotelsindia.com/pune/images/be725ee1419605d73674fa364406505a.jpg",
      rating: 4.5,
      menuImage:
        "https://5.imimg.com/data5/SELLER/Default/2024/10/461196822/SG/LN/CJ/127313610/menu-card-designing-service.jpg",
      description:
        "The Spice House is a popular restaurant with multiple locations across India, including Jp Nagar in Bangalore, Shastri Nagar in Kullu, and various locations in Pune. Authentic Indian dishes made with traditional spices and rich flavors.",
    },
    {
      id: 6,
      name: "Ocean's Delight",
      image:
        "https://b.zmtcdn.com/data/pictures/2/21121262/d11208b16bc0ab32feb5ecc68631515c.png?fit=around|960:500&crop=960:500;*,*",
      rating: 4.8,
      menuImage:
        "https://files.printo.in/site/20220422_114323502048_61000f_DL-Trifold.jpg",
      description:
        "Located in the vibrant heart of mandaveli, Ocean Delight is a cherished culinary haven where tradition meets innovation. Known for its commitment to quality ingredients, delightful flavors, and exceptional service, Ocean Delight invites you to savor a dining experience like no other. Seafood specialties straight from the ocean to your plate.",
    },
    {
      id: 7,
      name: "Green Garden",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/ac/0c/1b/aasmana.jpg",
      rating: 4.3,
      menuImage:
        "https://files.printo.in/site/20220422_114323502048_61000f_DL-Trifold.jpg",
      description:
        "Green Garden Restaurant is a popular dining option in Pune, particularly in the Koregaon Bhima area. It offers a variety of cuisines, including North Indian, Chinese, Mughlai, and seafood. The restaurant is known for its family-friendly atmosphere, tasty food, and efficient service. Fresh and organic vegetarian meals inspired by nature.",
    },
    {
      id: 8,
      name: "Bella Italia",
      image:
        "https://cache.marriott.com/content/dam/marriott-renditions/PNQRZ/pnqrz-ukiyo-1992-hor-wide.jpg",
      rating: 4.7,
      menuImage:
        "https://files.printo.in/site/20220422_114317620624_ab7f6e_A3-laminated.jpg",
      description:
        "Bella Italia Resto is an Italian restaurant in Blue Ridge Chowk, Pimpri-Chinchwad. It offers a cozy and refined dining atmosphere with a focus on authentic Italian cuisine. Their menu features pasta dishes, pizzas, and other Italian specialties, with a focus on quality ingredients and traditional recipes. Classic Italian cuisine with hand-tossed pizzas and homemade pasta.",
    },
  ];
 

  const [showAll, setShowAll] = useState(false);

  const selectedRestaurant = restaurants.find((r) => r.id === selectedId);

  // Split the list into two parts: first 4 and the rest
  const firstFour = restaurants.slice(0, 4);
  const remaining = restaurants.slice(4);
 

  return (
    <>
      {/* Carousel Section */}
      <section
        className="relative w-full h-[570px] flex flex-col items-center justify-center overflow-hidden bg-cover bg-center text-black"
       
      >
        <h2 className="text-4xl font-bold mb-10 mt-8 italic underline tracking-wide">
          Best Seller Food Items
        </h2>
        <div className="relative w-full max-w-6xl flex items-center justify-center h-[400px] px-6">
          <button
            onClick={prev}
            className="absolute left-0 z-10 bg-black text-white p-3 rounded-full shadow-lg hover:bg-black"
          >
            ‹
          </button>
          <div className="relative flex justify-center items-center w-full h-full">
            <div
              className="absolute flex gap-6 animate-scroll whitespace-nowrap"
              style={{ animationDuration: "30s" }}
            ></div>
            {randomFiveFoods.map((food, index) => {
              const offset = index - active;
              const isActive = index === active;
              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-500 ease-in-out rounded-xl overflow-hidden shadow-2xl transform ${
                    isActive ? "scale-110 z-30" : "scale-75 z-10 blur-sm opacity-200"
                  }`}
                  style={{
                    transform: `translateX(${offset * 240}px)`,
                    width: "280px",
                    height: "360px",
                  }}
                  onClick={() => setActive(index)}
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={next}
            className="absolute right-0 z-10 bg-black text-white p-3 rounded-full shadow-lg hover:bg-black"

          >
            ›
          </button>
        </div>

        {/* Info below the carousel */}
        {randomFiveFoods[active] && (
          <div className="mt-8 text-center px-4">
            <h3 className="text-2xl font-bold text-black">
              {randomFiveFoods[active].name}
            </h3>
            <p className="text-sm uppercase font-semibold text-black tracking-widest mt-1">
              {randomFiveFoods[active].category}
            </p>
          </div>
        )}
      </section>

      <section className="py-8 bg-white px-12">
  {/* 🔸 Custom Animation & Scroll Buttons */}
  <style>{`
    .fade-up-button {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.5s ease-out;
    }

    .group:hover .fade-up-button {
      opacity: 1;
      transform: translateY(0);
    }

    .scroll-btn {
      width: 38px;
      height: 38px;
      background-color: #f3f4f6; /* gray-100 */
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease;
    }

    .scroll-btn:hover {
      background-color: #fed7aa; /* orange-100 */
    }
  `}</style>

  <h2 className="text-4xl font-bold text-center text-black mb-6 mt-10">Our Food Menu</h2>

  {/* Buttons + Scrollable Menu */}
  <div className="relative">
    {/* Top-right Scroll Buttons */}
    <div className="flex justify-end space-x-3 mb-3">
      <button onClick={scrollLeft} className="scroll-btn">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <button onClick={scrollRight} className="scroll-btn">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>

    {/* Scrollable Menu */}
    <div
      ref={scrollRef}
      className="flex overflow-x-auto space-x-7 scrollbar-hide scroll-smooth px-2"
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
          <h3 className="text-sm font-medium text-gray-700 mt-2">{food.menu_name}</h3>
        </div>
      ))}
    </div>
  </div>

  {/* Selected Category Foods */}
  {selectedCategory && (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {food_list
        .filter((food) => food.category === selectedCategory)
        .map((food, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col group"
          >
            <div className="relative w-full h-48 rounded-md overflow-hidden">
              <img
                onClick={() => navigate("/product-detail", { state: food })}
                src={food.image}
                alt={food.name}
                className="cursor-pointer w-full h-full object-cover hover:scale-105 transition duration-300"
              />

              <div className="absolute bottom-2 left-0 right-0 flex justify-between px-3 fade-up-button pointer-events-none">
                <button
                  onClick={() => addToCart(food)}
                  className="bg-emerald-600 text-white text-sm px-4 py-1 rounded hover:bg-emerald-700 pointer-events-auto"
                >
                  <i className="fa-solid fa-cart-plus"></i> Add
                </button>
               
 <button
  onClick={() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const alreadyInWishlist = wishlistItems.some((i) => i.id === food.id);
      if (alreadyInWishlist) {
        removeFromWishlist(food.id);
      } else {
        addToWishlist({
          id: food.id,
          name: food.name,
          price:food.price,
          image: food.image,
          rating: food.rating,
        });
      }
    }
  }}
  className="cursor-pointer w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transition duration-300 hover:bg-red-50 border border-red-300 pointer-events-auto"
>
  <i
    className={`fa-solid fa-heart ${
      wishlistItems.some((i) => i.id === food.id)
        ? "text-red-600"
        : "text-gray-400"
    }`}
  ></i>
</button>


              </div>
            </div>

            <h4 className="text-lg font-semibold mt-2">{food.name}</h4>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm text-gray-500 capitalize">{food.category}</p>
              <p className="text-sm font-bold text-orange-600">₹{food.price}</p>
            </div>
          </div>
        ))}
    </div>
  )}
</section>


{/* 🌟 All Foods by Meal Category with Filters */}
<section className="bg-white py-12 px-6">
  {/* 🔸 Custom Animation */}
  <style>{`
    .fade-up-button {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.5s ease-out;
    }

    .group:hover .fade-up-button {
      opacity: 1;
      transform: translateY(0);
    }
  `}</style>

  {/* Header + Filters */}
<div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 px-4 md:px-0">
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
    All-Day Dining: Breakfast to Dinner
  </h2>

  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
   <div className="text-center mb-4">
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={isVeg}
      onChange={() => setIsVeg(!isVeg)}
      className="sr-only peer"
    />
    <div
      className={`w-14 h-8 rounded-full peer transition-all duration-300 ${
        isVeg ? "bg-green-400" : "bg-red-500"
      }`}
    ></div>
    <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-lg transition-all duration-300 peer-checked:translate-x-6">
      {isVeg ? "🥦" : "🍗"}
    </div>
  </label>
</div>



    <select
      className="border border-gray-300 px-3 py-2 rounded w-full sm:w-auto"
      value={priceSort}
      onChange={(e) => setPriceSort(e.target.value)}
    >
      <option value="">Sort by Price</option>
      <option value="low-high">Low to High</option>
      <option value="high-low">High to Low</option>
    </select>
  </div>
</div>


  {/* Meal Tabs */}
  <div className="flex justify-center gap-8 mb-8">
    {["All", "Breakfast", "Lunch", "Dinner"].map((meal) => (
      <button
        key={meal}
        onClick={() => setSelectedMeal(meal)}
        className={`cursor-pointer text-lg font-medium pb-1 border-b-2 transition-all duration-300 ${
          selectedMeal === meal
            ? "border-orange-700 text-orange-600"
            : "border-transparent text-gray-700 hover:text-orange-500 hover:border-orange-300"
        }`}
      >
        {meal}
      </button>
    ))}
  </div>

  {/* Filtered Food Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredList.map((food, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow-md p-4 flex flex-col group"
      >
        <img
          onClick={() => navigate("/product-detail", { state: food })}
          src={food.image}
          alt={food.name}
          className="cursor-pointer w-full h-48 object-cover hover:scale-105 transition duration-300"
        />
        <h4 className="text-lg font-semibold mt-2">{food.name}</h4>
        <p className="text-sm text-gray-500 capitalize">{food.category}</p>
        <p className="text-orange-600 font-bold">₹{food.price}</p>
        <p className="text-sm text-gray-600 mt-2">{food.description}</p>

        {/* Buttons with Animation */}
        <div className="flex justify-between mt-3 fade-up-button">
          <button
            onClick={() => addToCart(food)}
            className="cursor-pointer bg-emerald-600 text-white py-1 px-5 rounded hover:bg-emerald-700"
          >
            <i className="fa-solid fa-cart-plus"></i> Add
          </button>
          <button
  onClick={() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const alreadyInWishlist = wishlistItems.some((i) => i.id === food.id);
      if (alreadyInWishlist) {
        removeFromWishlist(food.id);
      } else {
        addToWishlist({
          id: food.id,
          name: food.name,
          price:food.price,
          image: food.image,
          rating: food.rating,
        });
      }
    }
  }}
  className="cursor-pointer w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transition duration-300 hover:bg-red-50 border border-red-300 pointer-events-auto"
>
  <i
    className={`fa-solid fa-heart ${
      wishlistItems.some((i) => i.id === food.id)
        ? "text-red-600"
        : "text-gray-400"
    }`}
  ></i>
</button>


        </div>
      </div>
    ))}
  </div>
</section>

    
  {/* 🔸 Custom Animation */}
  <style>{`
    .fade-up-button {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.5s ease-out;
    }

    .group:hover .fade-up-button {
      opacity: 1;
      transform: translateY(0);
    }
  `}</style>

  <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Popular Restaurants Menu
      </h2>

      {/* Grid of Restaurants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {firstFour.map((restaurant) => (
          <div
            key={restaurant.id}
            className="cursor-pointer rounded-lg shadow-lg overflow-hidden hover:shadow-2xl bg-white transition-shadow duration-300"
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
                <span className="text-gray-600 font-medium">
                  {restaurant.rating.toFixed(1)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {!showAll && (
        <div className=" mt-6">
          <button
  onClick={() => setShowAll(true)}
  className="cursor-pointer px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition 
             w-full sm:w-auto mx-auto block"
>
  Show More Restaurant
</button>

        </div>
      )}

      {/* Remaining Restaurants */}
      {showAll && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {remaining.map((restaurant) => (
            <div
              key={restaurant.id}
              className="cursor-pointer rounded-lg shadow-lg overflow-hidden hover:shadow-2xl bg-white transition-shadow duration-300"
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
                  <span className="text-gray-600 font-medium">
                    {restaurant.rating.toFixed(1)}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Restaurant Detail Section */}
      {selectedRestaurant && (
        <div className="group max-w-3xl mx-auto mt-16 bg-white rounded-xl shadow-xl p-6 border text-center transition-all duration-500">
          <h3 className="text-2xl font-bold mb-4">{selectedRestaurant.name} Menu</h3>
          <img
            src={selectedRestaurant.menuImage}
            alt={`${selectedRestaurant.name} Menu`}
            className="w-full h-96 object-cover rounded mb-4"
          />
          <h3 className="text-2xl font-bold mb-4">{selectedRestaurant.name} Information...</h3>
          <p className="text-gray-700 text-base font-medium">{selectedRestaurant.description}</p>

          {/* Close button */}
          <button
            onClick={() => setSelectedId(null)}
            className="cursor-pointer mt-6 px-4 py-2 bg-orange-600 text-white rounded hover:bg-red-600 fade-up-button"
          >
            Close
          </button>
        </div>
      )}
    </section>


      {/* Popular Foods Section */}
      <div className="bg-white py-10 text-center">
        <h2 className="text-orange-500 font-semibold text-sm">🍽️ BEST FOOD MENU🍽️</h2>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Popular Food Items</h1>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {visiblefoods.map((food, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md w-64 p-5 hover:shadow-2xl"
            >
              <div className="relative w-36 h-36 mx-auto mb-4 flex items-center justify-center">
                <div className="absolute w-32 h-32 mt-2 rounded-full overflow-hidden z-10">
                  <img
                    onClick={() => navigate("/product-detail", { state: food })}
                    src={food.image}
                    alt={food.name}
                    className="cursor-pointer w-full h-48 object-cover hover:scale-105 transition"
                  />
                </div>
                <div className="w-full h-full rounded-full border-2 border-dashed border-red-400 animate-rotate"></div>
              </div>
              <h3 className="text-lg font-bold text-gray-800">{food.name}</h3>
              <p className="text-gray-500">{food.description}</p>
              <p className="text-red-600 font-semibold text-lg mt-1">₹{food.price}</p>
              <div className="flex items-center gap-22">
              <button
                onClick={() => addToCart(food)}
                className="bg-emerald-600 text-white py-1 px-4 rounded hover:bg-red-700 mt-2"
              >
                <i className="fa-solid fa-cart-plus"></i> Add
              </button>
  
             <button
  onClick={() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const alreadyInWishlist = wishlistItems.some((i) => i.id === food.id);
      if (alreadyInWishlist) {
        removeFromWishlist(food.id);
      } else {
        addToWishlist({
          id: food.id,
          name: food.name,
          price:food.price,
          image: food.image,
          rating: food.rating,
        });
      }
    }
  }}
  className="cursor-pointer w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md transition duration-300 hover:bg-red-50 border border-red-300 pointer-events-auto"
>
  <i
    className={`fa-solid fa-heart ${
      wishlistItems.some((i) => i.id === food.id)
        ? "text-red-600"
        : "text-gray-400"
    }`}
  ></i>
</button>
</div>


            </div>
          ))}
        </div>

        <style>
          {`
          @keyframes spin { 
            to { transform: rotate(360deg); } 
          }
          .animate-rotate { 
            animation: spin 1s linear infinite; 
          }
          .scrollbar-hide::-webkit-scrollbar { 
            display: none; 
          }
          .scrollbar-hide { 
            -ms-overflow-style: none; 
            scrollbar-width: none;
            scroll-behavior: smooth;
          }
          .fade-up-button {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.5s ease-out;
          }
          .group:hover .fade-up-button {
            opacity: 1;
            transform: translateY(0);
          }
        `}
        </style>
      </div>
    </>
  );
};

export default Menu;
