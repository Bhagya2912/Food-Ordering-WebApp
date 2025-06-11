import React, { useState, useMemo,useEffect,useRef } from "react";
import { assets, menu_list, food_list } from "../../assets/assets";

const restaurant_list = [
  {
    id: "r1",
    name: "Spicy Grill",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092", // Unsplash link
    video:"https://media.istockphoto.com/id/1336488333/video/panning-shot-of-restaurant-interior-with-set-tables.mp4?s=mp4-640x640-is&k=20&c=_MH6T1EFrvy0z8za1LLb20wiggmgp3GvF2b0BjwgnXk=",
    priceLevel: 2,
    offer: "20% OFF on all orders above ₹299!",
    description: "Famous for its authentic North Indian tandoori items served fresh and spicy.",
    imageGallery: [
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      "https://cdn.choosechicago.com/uploads/2024/08/BEEF-LIBERTY-PDR-2-1800x1200.jpg",
    "https://media.cntravellerme.com/photos/67e14200aa5e6764c0380c29/16:9/w_2560%2Cc_limit/Juns-interior.jpg",  // placeholder for turn0image3
    "https://www.theworlds50best.com/discovery/filestore/jpg/juns-dubai%20(1).jpg",  // placeholder for turn0image4
    ], // import some images
    price:"700₹ for 4", 
    address:"Shivaji Nagar,Pune",
    type:"chinese-North",
    offers: [
    "20% OFF on orders above ₹199",
    "Buy 1 Get 1 Free on selected items",
    "Free delivery for first-time users",
    "Extra 10% OFF with UPI"
  ]
  },
  {
    id: "r2",
    name: "Green Bowl",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    video:"https://media.istockphoto.com/id/1773844152/video/interior-empty-modern-loft-office-open-space-modern-office-footage-modern-open-concept-lobby.mp4?s=mp4-640x640-is&k=20&c=_8CLoYsndlElqMN49oeggh7FaVF52QpYmUeZ8ei6ljQ=",
    priceLevel: 1,
    offer: "20% OFF on all orders above ₹299!",
    description: "Famous for its authentic North Indian tandoori items served fresh and spicy.",
    imageGallery: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      "https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIBRlGYpMOzpprRGt7AA3PNdfvE3RTO8SBeCfF3-BIAGiefc2-97mzIK1MC1P0Pkh8DuU&usqp=CAU",  // placeholder for turn0image3
    "https://www.marriott.com/content/dam/marriott-renditions/EWRES/ewres-urbane-restaurant-lounge-1611-hor-pano.jpg",  // placeholder for turn0image4
    ], // import some images
     price:"1000₹ for 8", 
    address:"Hadapsar,Pune",
    type:"chinese-North",
    offers: [
    "20% OFF on orders above ₹199",
    "Buy 1 Get 1 Free on selected items",
    "Free delivery for first-time users",
    "Extra 10% OFF with UPI"
  ]
  },
  {
    id: "r3",
    name: "Ocean Dine",
    image: "https://images.unsplash.com/photo-1559333084-20aa9d5d6b8b",
    video:"https://media.istockphoto.com/id/2160230665/video/modern-empty-cafe-interior-with-coffee-maker-bakery-products-and-navy-blue-brick-wall.mp4?s=mp4-640x640-is&k=20&c=hjoy1APs34Nl5jur7c7xapPpTfiVItJgSB5dPnv5ZvA=",
    priceLevel: 3,
    offer: "20% OFF on all orders above ₹299!",
    description: "Famous for its authentic North Indian tandoori items served fresh and spicy.",
    imageGallery: [
      "https://assets.architecturaldigest.in/photos/64f84cc61d4896b633fba77a/master/w_1600%2Cc_limit/The%2520art%2520deco%2520inspired%2520de%25CC%2581cor%2520of%2520CIRQA%25201960%2520.jpg",
      "https://resizer.otstatic.com/v2/photos/wide-xlarge/1/25633589.jpg",
    "https://images.otstatic.com/prod/26442030/3/medium.jpg",  // placeholder for turn0image3
    "https://images.hellomagazine.com/horizon/original_aspect_ratio/fba69555ca49-dinner-z.jpg",  // placeholder for turn0image4
    ], // import some images
    address:"Patil nagar Bavdhan Pune",
    type:"Indian-Thali",
     price:"500₹ for 2", 
     offers: [
    "20% OFF on orders above ₹199",
    "Buy 1 Get 1 Free on selected items",
    "Free delivery for first-time users",
    "Extra 10% OFF with UPI"
  ]
  },
  {
    id: "r4",
    name: "Tandoori House",
    image: "https://images.unsplash.com/photo-1621986851379-41c147b0a74c",
    video:"https://media.istockphoto.com/id/1703894260/video/pub-interior-with-bar-counter-and-tables-at-night.mp4?s=mp4-640x640-is&k=20&c=de6OtcPL1p1fEokJMOKVozfg-8pZQ3zFLF_wrG6Abh0=",
    priceLevel: 2,
    offer: "20% OFF on all orders above ₹299!",
    description: "Famous for its authentic North Indian tandoori items served fresh and spicy.",
    imageGallery: [
      "https://cdn.sanity.io/images/9p1heoig/production/9760dbc5d4ca7761f122b2695d5b5f5c15fa4d0f-5873x3915.jpg",
      "https://images.unsplash.com/photo-1682778418768-16081e4470a1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
    "https://img.lovepik.com/photo/48025/8254.jpg_wh860.jpg",  // placeholder for turn0image3
    "https://img.lovepik.com/photo/48025/8249.jpg_wh860.jpg",  // placeholder for turn0image4
    ], // import some images
     price:"700₹ for 3", 
    address:"Warje Pune",
    type:"Tandoor-Dish",
    offers: [
    "20% OFF on orders above ₹199",
    "Buy 1 Get 1 Free on selected items",
    "Free delivery for first-time users",
    "Extra 10% OFF with UPI"
  ]
  },
];

export default function Offer() {
  const [priceAsc, setPriceAsc] = useState(true);
  const [vegOnly, setVegOnly] = useState(false);

   const [selectedRestaurant, setSelectedRestaurant] = useState(null);

   const videoList = [
  "https://v1.pinimg.com/videos/iht/720p/63/f4/48/63f448af408a47e80cc32e50f997b18a.mp4",
  "https://v1.pinimg.com/videos/mc/720p/a4/44/af/a444af7b1f8747fd47b985e6ced587dc.mp4",
  "https://v1.pinimg.com/videos/mc/720p/65/ab/54/65ab54a613d1ee4da37b9377bef641eb.mp4",
  "https://v1.pinimg.com/videos/mc/720p/c0/27/96/c027969ccbe7fdd4be978f8dd368188b.mp4",
];


  const filteredFoods = useMemo(() => {
    return food_list
      .filter((item) => (vegOnly ? item.type === "veg" : true))
      .sort((a, b) => (priceAsc ? a.price - b.price : b.price - a.price));
  }, [priceAsc, vegOnly]);

  const sortedRestaurants = useMemo(() => {
    return [...restaurant_list].sort((a, b) =>
      priceAsc ? a.priceLevel - b.priceLevel : b.priceLevel - a.priceLevel
    );
  }, [priceAsc]);
  
  const [visibleCount, setVisibleCount] = useState(4);




  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videoList.length);
    }, 5000); // Change video every 5 seconds
    return () => clearInterval(timer);
  }, []);

    const [current, setCurrent] = useState(0);
  const videoRef = useRef(null);

  // When video ends, go to next
  const handleVideoEnd = () => {
    setCurrent((prev) => (prev + 1) % videoList.length);
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Section 1 - Hero */}
 <section className="relative w-full h-[450px] bg-white overflow-hidden flex justify-center items-center">
      {/* Video */}
      <video
        key={videoList[current]} // force reload
        ref={videoRef}
        className="w-full h-full object-contain z-10 transition-all duration-700 ease-in-out"
        src={videoList[current]}
        autoPlay
        muted
        loop={false} // loop should be false so it ends and changes
        playsInline
        onEnded={handleVideoEnd}
      />

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {videoList.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full ${
              index === current ? "bg-black scale-110" : "bg-white"
            } transition-transform duration-300`}
          />
        ))}
      </div>
    </section>

<style>
  {`
    @keyframes glow {
    0% { box-shadow: 0 0 10px rgba(255,255,255,0.2); }
    50% { box-shadow: 0 0 20px rgba(255,255,255,0.4); }
    100% { box-shadow: 0 0 10px rgba(255,255,255,0.2); }
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  `}
</style>




      {/* Section 2 - Food Offers */}
      <section className="py-10 px-6">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-2xl font-semibold text-orange-600">Food Offers</h3>
    <div className="flex gap-4">
      <button
        onClick={() => setPriceAsc(!priceAsc)}
        className="bg-orange-100 text-orange-600 px-3 py-1 rounded font-medium text-sm"
      >
        Price: {priceAsc ? "Low to High" : "High to Low"}
      </button>
      <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={vegOnly}
      onChange={() => setVegOnly(!vegOnly)}
      className="sr-only peer"
    />
    <div
      className={`w-14 h-8 rounded-full transition-colors duration-300 ${
        vegOnly ? "bg-green-400" : "bg-red-500"
      }`}
    ></div>
    <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-lg transition-transform duration-300 peer-checked:translate-x-6">
      {vegOnly ? "🥦" : "🍗"}
    </div>
  </label>
    </div>
  </div>

  {/* Food Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredFoods
      .filter((item) => item.offer) // ✅ Only show items with offer
      .slice(0, visibleCount)       // ✅ Show only limited items
      .map((item) => (
        <div
          key={item.id}
          className="rounded-xl overflow-hidden shadow hover:shadow-md transition"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4 space-y-1">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">{item.name}</h4>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-orange-600 font-semibold">₹{item.price}</p>
            <p
              className={`text-xs font-medium ${
                item.type === "veg" ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.type ? item.type.toUpperCase() : "UNKNOWN"}
            </p>
            <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">
                {item.offer}
              </span>
          </div>
        </div>
      ))}
  </div>

  {/* Show More Button */}
  {visibleCount <
    filteredFoods.filter((item) => item.offer).length && (
    <div className="text-center mt-6">
      <button
        onClick={() => setVisibleCount((prev) => prev + 4)}
        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
      >
        Show More
      </button>
    </div>
  )}
</section>


      {/* Section 3 - Restaurants */}
      <section className="py-10 px-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-orange-600">Restaurants Offer</h3>
        <button
        onClick={() => setPriceAsc(!priceAsc)}
        className="bg-orange-100 text-orange-600 px-3 py-1 rounded font-medium text-sm"
      >
        Price: {priceAsc ? "high to low" : "low to high"}
      </button>
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedRestaurants.map((r) => (
          <div
            key={r.id}
            className="rounded-xl overflow-hidden shadow hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedRestaurant(r)}
          >
            <div className="relative w-full h-40">
            {/* Image or Video */}
             {r.offer && (
    <span className="absolute top-2 right-2 bg-emerald-600 text-white font-medium
      sm:text-xs md:text-sm 
       sm:px-3 md:px-4 
      py-1 rounded-md shadow-md whitespace-nowrap z-10"
    >
      {r.offer}
    </span>
  )}
            {r.video ? (
              <video
                src={r.video}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-40 object-cover"
              />
              
            ) : (
              <img src={r.image} alt={r.name} className="w-full h-40 object-cover" />
            )}
             <div className="absolute  bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
            <div className="absolute inset-0 mt-33">
    <h2 className="text-white text-lg sm:text-xl font-semibold ml-3">{r.name}</h2>
  </div>
</div>

            {/* Info */}
            <div className="p-4">
              {/* <h4 className="font-semibold">{r.name}</h4> */}
              <div className="flex">
               <p className="text-[12px] font-bold">{r.type}</p>
               <p className="text-[12px] ml-32 font-bold">{r.price}</p>
               </div>
               <p className="text-[12px]">{r.address}</p>
              
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedRestaurant && (
       <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-5 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-gray-500 text-xl"
              onClick={() => setSelectedRestaurant(null)}
            >
              &times;
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-orange-600 mb-2">
              {selectedRestaurant.name}
            </h2>
            <p className="text-sm text-gray-700 mb-4">{selectedRestaurant.description}</p>
             <p className="text-sm text-grey-900 font-bold mb-4">Location: {selectedRestaurant.address}</p>
          <div className="p-4 max-w-md mx-auto">
      <h2 className="text-[18px] mb-5 font-bold text-green-600">Special Offers</h2>
      <div className="grid grid-cols-2 gap-4">
        {selectedRestaurant.offers.slice(0, 4).map((offers, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-sm p-4 rounded-lg text-center text-sm font-medium text-gray-700"
          >
            {offers}
          </div>
        ))}
      </div>
    </div>
            {/* Gallery */}
            <h1 className=" text-black text-[18px] mb-5">Pictures</h1>
            <div className="grid grid-cols-4 gap-2">
              {selectedRestaurant.imageGallery?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="rounded-md object-cover h-24 w-full"
                />
              ))}
            </div>
          <div className="mt-6 text-center text-lg font-semibold text-green-800 animate-pulse">
  Visit Once!
</div>

          </div>
        </div>
      )}
    </section>
    </div>
  );
}
