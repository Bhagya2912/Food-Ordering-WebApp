import React, { useEffect, useState } from "react";

const foodItems = [
  {
    name: "Classic Burger",
    category: "Burger",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&auto=format&fit=crop",
    description: "Juicy grilled beef with lettuce and tomato",
    price: "$8.99"
  },
  {
    name: "Cheesy Pizza",
    category: "Pizza",
    img: "https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Loaded with mozzarella cheese and toppings",
    price: "$10.50"
  },
  {
    name: "Fresh Salad",
    category: "Salad",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=60",
    description: "A healthy mix of greens and veggies",
    price: "$6.25"
  },
  {
    name: "Spaghetti Pasta",
    category: "Pasta",
    img: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Classic Italian pasta with tomato sauce",
    price: "$9.75"
  },
  {
    name: "Taco Fiesta",
    category: "Taco",
    img: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=900&auto=format&fit=crop",
    description: "Spicy beef tacos with salsa",
    price: "$7.50"
  }
];

const Menu = () => {
  const [active, setActive] = useState(0);

  const prev = () => {
    setActive((prev) => (prev === 0 ? foodItems.length - 1 : prev - 1));
  };

  const next = () => {
    setActive((prev) => (prev === foodItems.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % foodItems.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
 const [startIndex, setStartIndex] = useState(0);

 

  // Get 3 items in a looped manner
  const visibleItems = [
    foodItems[startIndex % foodItems.length],
    foodItems[(startIndex + 1) % foodItems.length],
    foodItems[(startIndex + 2) % foodItems.length],
    foodItems[(startIndex + 3) % foodItems.length],
  ];
  return (
    <>
      <section>
        <div className="relative w-full h-[570px] flex flex-col items-center justify-center overflow-hidden bg-cover bg-center text-white-500"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')" }}
        >
          <h2 className="text-4xl font-bold text-white mb-8 italic underline">Menu</h2>

          <div className="relative w-full max-w-6xl flex items-center justify-center h-[400px]">
            <button onClick={prev} className="absolute left-0 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
              ‹
            </button>

            <div className="relative flex justify-center items-center w-full h-full">
              {foodItems.map((item, index) => {
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
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                );
              })}
            </div>

            <button onClick={next} className="absolute right-0 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
              ›
            </button>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-2xl font-semibold text-white">{foodItems[active].name}</h3>
            <p className="text-sm uppercase text-white tracking-wide">{foodItems[active].category}</p>
          </div>
        </div>
      </section>

      <div className="bg-[#f9f6ef] py-10 text-center">
        <h2 className="text-orange-500 font-semibold text-sm">🍽️ BEST FOOD MENU🍽️</h2>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Popular Food Items </h1>

        <div className="flex flex-wrap justify-center gap-6 px-4">
  {visibleItems.map((item, index) => (
    <div key={index} className="bg-white shadow-md rounded-xl w-64 p-5">
      
       {/* Container for image and rotating border */}
        <div className="relative w-36 h-36 mx-auto mb-4 flex items-center justify-center">
          
          {/* Static Image (centered absolutely) */}
          <div className="absolute w-32 h-32 rounded-full overflow-hidden z-10">
            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
          </div>

          {/* Rotating Dashed Border (in background) */}
          <div className="w-full h-full rounded-full border-2 border-dashed border-red-400 animate-rotate" />
      </div>
               <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
      <p className="text-gray-500">{item.description}</p>
      <p className="text-red-600 font-semibold text-lg mt-1">{item.price}</p>
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
    </>
  );
};

export default Menu;


   

    
    
  