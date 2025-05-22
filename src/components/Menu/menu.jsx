import React, { useEffect, useState } from "react";
import { food_list } from "../../assets/assets";
import { useCart } from "../../context/CartContext";


const Menu = () => {
  const [active, setActive] = useState(0);
   const { addToCart } = useCart();
   

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
  

  return (
    <>
      <section>
        <div className="relative w-full h-[570px] flex flex-col items-center justify-center overflow-hidden bg-cover bg-center text-white-500"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
        >
          <h2 className="text-4xl font-bold text-white mb-8 italic underline">Menu</h2>

          <div className="relative w-full max-w-6xl flex items-center justify-center h-[400px]">
            <button onClick={prev} className="absolute left-0 z-10 bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
              ‹
            </button>

            <div className="relative flex justify-center items-center w-full h-full">
              {food_list.slice(1, 10).map((item, index) => {
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
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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
  Add to Cart
</button>

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


   

    
    
  