import React,{useState,useEffect} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { assets, menu_list, food_list } from "../../assets/assets";
import { useCart } from '../../context/CartContext';
import { BsMenuButtonWideFill } from 'react-icons/bs';



function Home({ name, image, price, rating }) {

const [successMessage, setSuccessMessage] = useState("");

    const [favorites, setFavorites] = useState([]);
      const [current, setCurrent] = useState(0);
   
    const { addToCart } = useCart();
    const { wishlistItems,addToWishlist,removeFromWishlist } = useCart();

    const [user, setUser] = useState(null);

    const navigate = useNavigate();
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Or get from context



    new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR'
}).format(199); // outputs: ₹199.00

const testimonials = [
  {
    name: 'Riya Sharma',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    feedback:
      'Absolutely love this app! Ordering food has never been this easy. The delivery was super fast!',
  },
  {
    name: 'Amit Verma',
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
    feedback:
      'Great variety of restaurants and very user-friendly interface. Highly recommend to all foodies!',
  },
  {
    name: 'Sneha Patel',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    feedback:
      'I’ve used many food delivery apps, but this one stands out. Everything is smooth and reliable.',
  },
];

const [timeLeft, setTimeLeft] = useState(43200); // 12 hours in seconds

useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
  }, 1000);
  return () => clearInterval(interval);
}, []);

const formatTime = (seconds) => {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};


const toggleFavorite = (index) => {
    setFavorites((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    foodItem: "",
    rating: "5",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  setSuccessMessage("✅ Thank you for your feedback!");

  // Optionally reset form
  setFormData({
    name: "",
    email: "",
    foodItem: "",
    rating: "5",
    comments: "",
  });

  // Clear message after 3 seconds
  setTimeout(() => {
    setSuccessMessage("");
  }, 3000);
};

const [selectedDish, setSelectedDish] = useState(null);
const [showModal, setShowModal] = useState(false);

const brands = [
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-logo%2C-hotel-logo-design-template-21c636096aeb4439217e7a2731d16f7d_screen.jpg?ts=1665470337',
  'https://img.freepik.com/premium-vector/online-food-order-logo-icon_61778-45.jpg',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fast-food-restaurant-logo%2C-restaurant-logo-design-template-33255790cb8e1186b28609dd9afd4ee6_screen.jpg?ts=1668794604',
  'https://images-platform.99static.com//Ba6VdSQsbU4OpiyQEzLi7yHy9KQ=/440x521:1494x1575/fit-in/500x500/99designs-contests-attachments/127/127439/attachment_127439993',
   'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-logo%2C-hotel-logo-%289%29-design-template-a498a5179cf7277f9fe66fe93f0024a5_screen.jpg?ts=1693343026',
   'https://previews.123rf.com/images/miracel123/miracel1231801/miracel123180100795/94312687-food-delivery-logo.jpg',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxpCUHKXWUZ0393rBqMPuHjmdsVHwZEZZtE6nuyMF9ExNCMnbZ-V9irrBhWDGchN_BCr4&usqp=CAU',
];

  const allBrands = [...brands, ...brands]; 


  return (
   <div className="font-sans text-gray-800 mr-auto">
  {/* Hero Section */}
  <header className="relative h-screen flex flex-col justify-center items-center text-white overflow-hidden">
    {/* Animated Background Layer */}
    <div
      className="absolute inset-0 bg-cover bg-center header-bg-zoom"
      style={{
        backgroundImage: `url('https://cdn.pixabay.com/photo/2023/05/29/17/01/hamburger-8026582_1280.jpg')`,
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30"></div>
    </div>

    {/* Foreground Content */}
    <div className="text-center relative z-10">
      {/* Heading Section */}
<section className="flex items-center justify-center px-4 py-6 sm:py-8">
  <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl font-serif font-semibold drop-shadow-lg max-w-md sm:max-w-xl text-center leading-snug sm:leading-normal">
    Experience the Rich Flavors  of Traditional Indian Cuisine
  </h1>
</section>

{/* Paragraph Section */}
<section className="max-w-md sm:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 text-center">
  <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed font-serif">
    Discover the vibrant aromas and timeless recipes of India — a land where spices tell stories,
    and every meal is a celebration. From the creamy butter chicken of the North to the fiery
    curries of the South, our curated dishes invite you to savor the authentic tastes passed
    down through generations.
  </p>
</section>



        
        <style>
    {`
      @keyframes zoomInOut {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }

      .header-bg-zoom {
        animation: zoomInOut 10s ease-in-out infinite;
      }
    `}
  </style>

 


         
   <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
  <Link
    to="/menu"
    className="bg-orange-700 text-white px-6 py-2 rounded shadow-md transition duration-300 text-center sm:w-auto"
  >
    Order Now
  </Link>
  <Link
    to="/menu"
    className="bg-orange-700 text-white px-6 py-2 rounded  shadow-md transition duration-300 text-center  sm:w-auto"
  >
    Explore More <i className="fa-solid fa-arrow-right ml-2"></i>
  </Link>
</div>
</div>
      </header>
      

      

      

     {/* Skills / Ingredients Section */}
<section className="py-12 px-4 bg-white ">
  <div className="max-w-6xl mx-auto lg:px-6 py-2.5">
    <h2 className="text-4xl font-bold text-red-600  mb-8 text-center">Popular  Dishes</h2>

    {/* Dish Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Paneer Butter Masala */}
     {/* Paneer Butter Masala */}
  <div className="flex flex-col md:flex-row gap-6">
     <div className="relative w-full sm:max-w-md mx-auto h-40">
      <img className="w-full h-full object-cover rounded-lg cursor-pointer"
        src="https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=600.jpg"
        alt="Paneer Butter Masala"
      />
    <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition duration-300 rounded">
  <span className="text-sm font-medium mb-2">Delicious Dish</span>
    <button
  className="cursor-pointer bg-white text-black px-2 py-1 text-sm rounded"
  onClick={() =>
    setSelectedDish({
      name: "Paneer Butter Masala",
      image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=600.jpg",
      description:
        "A creamy, mildly spiced North Indian curry made with soft paneer cubes, tomatoes, cashews, and butter. A favorite in every Indian restaurant.",
    }) || setShowModal(true)
  }
>
  Read more
</button>
</div>
    </div>
    <div>
      <h3 className="text-xl font-bold">Paneer Butter Masala</h3>
      <p>A creamy, mildly spiced North Indian curry made with soft paneer cubes, tomatoes, cashews, and butter. A favorite in every Indian restaurant.</p>
    </div>
  </div>

  {/* Hyderabadi Biryani */}
  <div className="flex flex-col md:flex-row gap-6">
     <div className="relative w-full sm:max-w-md mx-auto h-40">
      <img className="w-full h-full object-cover rounded-lg cursor-pointer"
        src="https://images.pexels.com/photos/14731625/pexels-photo-14731625.jpeg?auto=compress&cs=tinysrgb&w=600.jpg"
        alt="Biryani"
      />
       <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition duration-300 rounded">
  <span className="text-sm font-medium mb-2">Delicious Dish</span>
  <button
  className="cursor-pointer bg-white text-black px-2 py-1 text-sm rounded"
  onClick={() =>
    setSelectedDish({
      name: "Hyderabadi Biryani",
      image: "https://images.pexels.com/photos/14731625/pexels-photo-14731625.jpeg?auto=compress&cs=tinysrgb&w=600.jpg",
      description:
        "Hyderabadi Biryani is a fragrant rice dish layered with marinated meat, saffron, fried onions, and herbs. It’s known for its royal taste and aroma.",
    }) || setShowModal(true)
  }
>
  Read more
</button>
</div>
    </div>
    <div>
      <h3 className="text-xl font-bold">Hyderabadi Biryani</h3>
      <p>Hyderabadi Biryani is a fragrant rice dish layered with marinated meat, saffron, fried onions, and herbs. It’s known for its royal taste and aroma.</p>
    </div>
  </div>

  {/* Masala Dosa */}
 <div className="flex flex-col md:flex-row gap-6">
     <div className="relative w-full sm:max-w-md mx-auto h-40">
      <img className="w-full h-full object-cover rounded-lg cursor-pointer"
        src="https://images.pexels.com/photos/12392915/pexels-photo-12392915.jpeg?auto=compress&cs=tinysrgb&w=600.jpg"
        alt="Masala Dosa"
      />
       <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition duration-300 rounded">
  <span className="text-sm font-medium mb-2">Delicious Dish</span>
  <button
  className="cursor-pointer bg-white text-black px-2 py-1 text-sm rounded"
  onClick={() =>
    setSelectedDish({
      name: "Masala Dosa",
      image: "https://images.pexels.com/photos/12392915/pexels-photo-12392915.jpeg?auto=compress&cs=tinysrgb&w=600.jpg",
      description:
        "Masala Dosa is a crispy South Indian crepe made from fermented rice and lentil batter, filled with spiced mashed potatoes and served with chutneys and sambar.",
    }) || setShowModal(true)
  }
>
  Read more
</button>
</div>
    </div>
    <div>
      <h3 className="text-xl font-bold">Masala Dosa</h3>
      <p>Masala Dosa is a crispy South Indian crepe made from fermented rice and lentil batter, filled with spiced mashed potatoes and served with chutneys and sambar.</p>
    </div>
  </div>

 {/* Noodles */}
<div className="flex flex-col md:flex-row gap-6">
  <div className="relative w-full sm:max-w-md mx-auto h-40">
    <img
      className="w-full h-full object-cover rounded-lg cursor-pointer"
      src="https://i.imgur.com/1Ss39Hq.jpg"
      alt="Noodles"
    />
    <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition duration-300 rounded">
      <span className="text-sm font-medium mb-2">Delicious Dish</span>
      <button
  className="cursor-pointer bg-white text-black px-2 py-1 text-sm rounded"
  onClick={() =>
    setSelectedDish({
      name: "Noodles",
      image: "https://i.imgur.com/1Ss39Hq.jpg",
      description:
        "Noodles are a versatile and beloved dish, often served with vegetables, sauces, and proteins. This version features a tangy and spicy flavor profile perfect for any craving.",
    }) || setShowModal(true)
  }
>
  Read more
</button>
    </div>
  </div>
  <div>
    <h3 className="text-xl font-bold">Noodles</h3>
    <p>Noodles are a versatile and beloved dish, often served with vegetables, sauces, and proteins. This version features a tangy and spicy flavor profile perfect for any craving.</p>
  </div>
</div>



  {/* Uttapam */}
 <div className="flex flex-col md:flex-row gap-6">
    <div className="relative w-full sm:max-w-md mx-auto h-40">
      <img className="w-full h-full object-cover rounded-lg cursor-pointer"
        src="https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg"
        alt="Uttapam"
      />
       <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition duration-300 rounded">
  <span className="text-sm font-medium mb-2">Delicious Dish</span>
  <button
  className="cursor-pointer bg-white text-black px-2 py-1 text-sm rounded"
  onClick={() =>
    setSelectedDish({
      name: "Uttapam",
      image: "https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg",
      description:
        "A soft and thick South Indian pancake made from fermented rice and urad dal batter, topped with chopped onions, tomatoes, green chilies, and coriander.",
    }) || setShowModal(true)
  }
>
  Read more
</button>
</div>
    </div>
    <div>
      <h3 className="text-xl font-bold">Uttapam</h3>
      <p>A soft and thick South Indian pancake made from fermented rice and urad dal batter, topped with chopped onions, tomatoes, green chilies, and coriander.</p>
    </div>
  </div>

  {/* Sushi */}
  <div className="flex flex-col md:flex-row gap-6">
    <div className="relative w-full sm:max-w-md mx-auto h-40">
      <img className="w-full h-full object-cover rounded-lg cursor-pointer"
        src="https://i.imgur.com/ZkDcLbW.jpg"
        alt="Sushi"
      />
       <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition duration-300 rounded">
  <span className="text-sm font-medium mb-2">Delicious Dish</span>
   <button
  className="cursor-pointer bg-white text-black px-2 py-1 text-sm rounded"
  onClick={() =>
    setSelectedDish({
      name: "Sushi",
      image: "https://i.imgur.com/ZkDcLbW.jpg",
      description:
        "A traditional Japanese dish made with vinegared rice, seafood or vegetables, and wrapped in seaweed. Often served with wasabi, soy sauce, and pickled ginger.",
    }) || setShowModal(true)
  }
>
  Read more
</button>
</div>
    </div>
    <div>
      <h3 className="text-xl font-bold">Sushi</h3>
      <p>A traditional Japanese dish made with vinegared rice, seafood or vegetables, and wrapped in seaweed. Often served with wasabi, soy sauce, and pickled ginger.</p>
    </div>
  </div>

  {/* Pasta */}
 <div className="flex flex-col md:flex-row gap-6">
     <div className="relative w-full sm:max-w-md mx-auto h-40">
      <img className="w-full h-full object-cover rounded-lg cursor-pointer"
        src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg"
        alt="Pasta"
      />
      <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition duration-300 rounded">
  <span className="text-sm font-medium mb-2">Delicious Dish</span>
 <button
  className="cursor-pointer bg-white text-black px-2 py-1 text-sm rounded"
  onClick={() =>
    setSelectedDish({
      name: "Pasta",
      image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg",
      description:
        "A classic Italian dish made from durum wheat, typically tossed in sauces like tomato, Alfredo, or pesto. Served with herbs and grated cheese.",
    }) || setShowModal(true)
  }
>
  Read more
</button>
</div>
    </div>
    <div>
      <h3 className="text-xl font-bold">Pasta</h3>
      <p>A classic Italian dish made from durum wheat, typically tossed in sauces like tomato, Alfredo, or pesto. Served with herbs and grated cheese.</p>
    </div>
  </div>

  {/* Burger */}
  <div className="flex flex-col md:flex-row gap-6">
    <div className="relative w-full sm:max-w-md mx-auto h-40">
      <img className="w-full h-full object-cover rounded-lg cursor-pointer"
        src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg"
        alt="Burger"
      />
       <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition duration-300 rounded">
  <span className="text-sm font-medium mb-2">Delicious Dish</span>
 <button
  className="cursor-pointer bg-white text-black px-2 py-1 text-sm rounded"
  onClick={() =>
    setSelectedDish({
      name: "Burger",
      image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg",
      description:
        "A popular American-style sandwich consisting of a grilled meat or veggie patty, fresh lettuce, tomato, cheese, and sauces, all stacked between two buns.",
    }) || setShowModal(true)
  }
>
  Read more
</button>
</div>
    </div>
    <div>
      <h3 className="text-xl font-bold">Burger</h3>
      <p>A popular American-style sandwich consisting of a grilled meat or veggie patty, fresh lettuce, tomato, cheese, and sauces, all stacked between two buns.</p>
    </div>
  </div>

  {/* Fried Momos */}
  <div className="flex flex-col md:flex-row gap-6">
    <div className="relative w-full sm:max-w-md mx-auto h-40">
      <img className="w-full h-full object-cover rounded-lg cursor-pointer"
        src="https://images.pexels.com/photos/28445591/pexels-photo-28445591/free-photo-of-crispy-cheese-corn-momos-with-tangy-sauce.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg"
        alt="Fried Momos"
      />
        <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition duration-300 rounded">
  <span className="text-sm font-medium mb-2">Delicious Dish</span>
 <button
  className="cursor-pointer bg-white text-black px-2 py-1 text-sm rounded"
  onClick={() =>
    setSelectedDish({
      name: "Fried Momos",
      image: "https://images.pexels.com/photos/28445591/pexels-photo-28445591/free-photo-of-crispy-cheese-corn-momos-with-tangy-sauce.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg",
      description:
        "Crispy pan-fried dumplings filled with a delicious mixture of vegetables or minced meat, seasoned with spices. Served hot with spicy red chutney.",
    }) || setShowModal(true)
  }
>
  Read more
</button>
</div>
    </div>
    <div>
      <h3 className="text-xl font-bold">Fried Momos</h3>
      <p>Crispy pan-fried dumplings filled with a delicious mixture of vegetables or minced meat, seasoned with spices. Served hot with spicy red chutney.</p>
    </div>
  </div>

  {/* Chicken */}
 <div className="flex flex-col md:flex-row gap-6">
     <div className="relative w-full sm:max-w-md mx-auto h-40">
      <img className="w-full h-full object-cover rounded-lg cursor-pointer"
        src="https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Chicken"
      />
       <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition duration-300 rounded">
  <span className="text-sm font-medium mb-2">Delicious Dish</span>
  <button
  className="cursor-pointer bg-white text-black px-2 py-1 text-sm rounded"
  onClick={() =>
    setSelectedDish({
      name: "Chicken",
      image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600",
      description:
        "Tender pieces of chicken cooked in aromatic Indian spices, either grilled, fried, or in curry form. Rich in flavor and served with naan or rice.",
    }) || setShowModal(true)
  }
>
  Read more
</button>
</div>
    </div>
    <div>
      <h3 className="text-xl font-bold">Chicken</h3>
      <p>Tender pieces of chicken cooked in aromatic Indian spices, either grilled, fried, or in curry form. Rich in flavor and served with naan or rice.</p>
    </div>
  </div>
  </div>
      <div className="text-center mt-6">
          <button onClick={() => navigate('/menu')}
          className="bg-orange-600 hover:bg-orange-700 text-white justify-center mt-5 px-6 py-2 rounded">View more</button>
        </div>
  </div>
  {showModal && selectedDish && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
      >
        &times;
      </button>
      <img
        src={selectedDish.image}
        alt={selectedDish.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold text-orange-600 mb-2">
        {selectedDish.name}
      </h2>
      <p className="text-gray-700">{selectedDish.description}</p>
    </div>
  </div>
)}

</section>
    
 <section className="relative py-12 px-4 mt-0">
 <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-20">
  <div className="bg-orange-600 text-white text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
    ⏰ Offer ends in {formatTime(timeLeft)}
  </div>
</div>

      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold text-red-600 mb-2">🍛 Today's Special</h2>
        <p className="text-gray-600">Hand-picked dishes curated by our chefs!</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 max-w-7xl mx-auto">
        {food_list.slice(1, 11).map((item, index) => (
          <div
  key={index}
  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300"
>
  {/* 🏷️ Add relative wrapper to position the tag */}
  <div className="relative">
    {item.offer && (
      <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow z-10">
        {item.offer}
      </div>
    )}

    <img
      onClick={() => navigate("/product-detail", { state: item })}
      src={item.image}
      alt={item.name}
      className="cursor-pointer w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105 hover:brightness-110"
    />
  </div>

  <div className="p-4">
    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
    <p className="text-sm text-gray-600">{item.description}</p>
    <div className="flex justify-between items-center mt-4">
      <span className="text-orange-600 font-semibold">₹{item.price}</span>
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
        className="cursor-pointer bg-emerald-600 text-white py-1 px-5 rounded hover:bg-emerald-700 transition duration-300"
      >
        <i className="fa-solid fa-cart-plus"></i> Add
      </button>
     <button
  onClick={() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const alreadyInWishlist = wishlistItems.some((i) => i.id === item.id);
      if (alreadyInWishlist) {
        removeFromWishlist(item.id);
      } else {
        addToWishlist({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          rating: item.rating,
        });
      }
    }
  }}
  className="
    cursor-pointer 
    w-10 h-10 
    rounded-full 
    bg-white 
    flex items-center justify-center 
    shadow-md 
    transition duration-300 
    hover:bg-red-50
    border border-red-300
    pointer-events-auto
  "
>
  <i
    className={`fa-solid fa-heart ${
      wishlistItems.some((i) => i.id === item.id)
        ? "text-red-600"
        : "text-gray-400"
    }`}
  ></i>
</button>

    </div>
  </div>
</div>

          
        ))}
      </div>
    </section>

     <section className="relative bg-gradient-to-r px-7 mt-0  " >
      
      <div className="relative   bg-white bg-center px-2 py-9 overflow-hidden h-[400px] rounded-lg shadow-md" >
  
    <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mt-5 sm:mt-8 md:mt-5 text-center px-4'>Healthy Food Just For You!</h1>
  
      <div className="absolute top-24 left-0 w-full h-full overflow-hidden">
        <div className="flex animate-scroll gap-8 w-max">
          {Array(2)
            .fill(food_list.slice(0, 5))
            .flat()
            .map((item, index) => (
              <div
                key={index}
                className="relative bg-white bg-opacity-90 rounded-xl shadow-lg p-4 w-60 shrink-0"
              >
                <img
  onClick={() => navigate("/product-detail", { state: item })}
  src={item.image}
  alt={item.name}
  className="cursor-pointer w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105 hover:brightness-110"
/>

                
                <div className="flex items-center gap-20">
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
    className="cursor-pointer bg-emerald-600 text-white py-1 px-4 rounded hover:bg-emerald-700 transition duration-300"
  >
    <i className="fa-solid fa-cart-plus"></i>{'  '}
    Add
  </button>

  <button
    onClick={() => {
      if (!isLoggedIn) {
        navigate("/login");
      } else {
        const alreadyInWishlist = wishlistItems.some((i) => i.id === item.id);
        if (alreadyInWishlist) {
          removeFromWishlist(item.id);
        } else {
          addToWishlist({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            rating: item.rating,
          });
        }
      }
    }}
    className="cursor-pointer w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transition duration-300"
  >
    <i
      className={`fa-solid fa-heart ${
        wishlistItems.some((i) => i.id === item.id)
          ? "text-red-600"
          : "text-gray-400"
      }`}
    ></i>
  </button>
</div>


              </div>
            ))}
        </div>
      </div>
      </div>
    </section>

    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mt-6 sm:mt-8 md:mt-10 text-center px-4">
  Food Item Feedback Form
</h1>

    <section className="relative min-h-[600px] flex items-center justify-center px-6 py-16 overflow-hidden font-sans">
      
      {/* Split Background */}
      <div className="absolute inset-0 flex z-0">
        <div
          className="flex-1 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80')",
          }}
        />
        <div
          className="flex-1 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80')",
          }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Form container */}
      <form
        onSubmit={handleSubmit}
        className="relative z-20 max-w-md w-full bg-white bg-opacity-95 rounded-xl p-8 shadow-xl"
      >
        <h2 className="text-center text-2xl font-bold mb-8 text-gray-800">
          Food Item Feedback
        </h2>

        <label className="block mb-5 text-gray-700">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block mb-5 text-gray-700">
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block mb-5 text-gray-700">
          Food Item
          <input
            type="text"
            name="foodItem"
            value={formData.foodItem}
            onChange={handleChange}
            required
            placeholder="Name of the food item"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block mb-5 text-gray-700">
          Rating
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="2">5 -Delicious </option>
            <option value="5">4 - Excellent</option>
            <option value="4">3 - Very Good</option>
            <option value="3">2 - Good</option>
            <option value="1">1 - Poor</option>
          </select>
        </label>

        <label className="block mb-8 text-gray-700">
          Comments
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows={4}
            placeholder="Share your thoughts..."
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
         {successMessage && (
    <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded text-center text-sm font-medium">
      {successMessage}
    </div>
  )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Submit Feedback
        </button>
      </form>
    </section>

<section>
 <div className="mt-10  py-10 px-4 mb-5">
      <h2 className="text-4xl font-bold text-center text-red-600 mb-8">
        ❤️ What Our Customers Say
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {testimonials.map((person, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition transform duration-300"
          >
            <img
              src={person.image}
              alt={person.name}
              className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-orange-300"
            />
            <h3 className="text-lg font-semibold text-gray-800">{person.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{person.feedback}</p>
          </div>
        ))}

         <div className='absolute rounded-full right-10 bg-white w-30 mt-50'style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}><i class="fa-solid fa-arrow-right"></i></div>
      </div>
       
    </div>
  
</section>

       <section>
        <div className="overflow-hidden  py-6 mb-5">
          <h1 className="text-4xl font-bold text-center text-red-600 mb-8">Popular Brands & Restaurant</h1>
      <div className="flex animate-scroll whitespace-nowrap">
        {allBrands.map((brand, index) => (
          <img
            key={index}
            src={brand}
            alt={`brand-${index}`}
            className="h-24 mx-8 opacity-70 hover:opacity-200 transition-opacity duration-300"
          />
        ))}
      </div>
    </div>
 
       </section>

  

     
    </div>
  );
};
export default Home
