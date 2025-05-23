import React,{useState,useEffect} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { assets, menu_list, food_list } from "../../assets/assets";
import { useCart } from '../../context/CartContext';
import { BsMenuButtonWideFill } from 'react-icons/bs';



function Home({ name, image, price, rating }) {

    const [favorites, setFavorites] = useState([]);
      const [current, setCurrent] = useState(0);
    const navigate=useNavigate();
    const { addToCart } = useCart();
    const { wishlistItems,addToWishlist } = useCart();

    


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

const toggleFavorite = (index) => {
    setFavorites((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };


const brands = [
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-logo%2C-hotel-logo-design-template-21c636096aeb4439217e7a2731d16f7d_screen.jpg?ts=1665470337',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjVVIf86eibvCRG6Szxa_8xXN-_GEz-9pm2Q&s',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/fast-food-restaurant-logo%2C-restaurant-logo-design-template-33255790cb8e1186b28609dd9afd4ee6_screen.jpg?ts=1668794604',
  'https://i.pinimg.com/736x/fd/09/2f/fd092f0e23328564b7fb3d7021d1108d.jpg',
   'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-logo%2C-hotel-logo-%289%29-design-template-a498a5179cf7277f9fe66fe93f0024a5_screen.jpg?ts=1693343026',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjOCiE7tnCO-zNaURgwve4BwteaWq1dZh0zsNJmiRqkmDBJffjD9ZKouBDtpgtC68FrU0&usqp=CAU',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxpCUHKXWUZ0393rBqMPuHjmdsVHwZEZZtE6nuyMF9ExNCMnbZ-V9irrBhWDGchN_BCr4&usqp=CAU',
];

  const allBrands = [...brands, ...brands]; 


  return (
    <div className="font-sans text-gray-800 mr-auto">
      {/* Hero Section */}
      <header className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center text-white bg-black/60 
       object-cover animate-[zoomInOut_10s_ease-in-out_infinite]" style={{ backgroundImage: `url('https://images.pexels.com/photos/1639556/pexels-photo-1639556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}>
        <div className="text-center">
          
          <section className="flex items-center justify-center ">
  <h1 className="flex items-center justify-center text-white text-5xl font-serif font-semibold drop-shadow-lg max-w-xl text-center px-4">
    Experience the Rich Flavors <br /> of Traditional Indian Cuisine
  </h1>
</section>

          <section className="max-w-4xl mx-auto px-6 py-12 text-center">
  <p className="text-gray-200 text-lg leading-relaxed font-serif">
    Discover the vibrant aromas and timeless recipes of India — a land where spices tell stories,
    and every meal is a celebration. From the creamy butter chicken of the North to the fiery
    curries of the South, our curated dishes invite you to savor the authentic tastes passed
    down through generations.
  </p>
</section>

        </div>
         <style>{`
        @keyframes zoomInOut {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
     <div className="flex gap-4">
 <Link
      to="/menu"
      className="bg-red-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-900 transition duration-300 inline-block text-center"
    >
      Order Now
    </Link>
    <Link
      to="/menu"
      className="bg-red-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-900 transition duration-300 inline-block text-center"
    >
      Explore More   <i class="fa-solid fa-arrow-right"></i>
    </Link>
 
</div>
      </header>
      

      

      

     {/* Skills / Ingredients Section */}
<section className="py-12 px-4 bg-white">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-semibold mb-8 text-center">Popular Indian Dishes</h2>

    {/* Dish Cards Grid */}
    <div className="grid md:grid-cols-2 gap-10 mb-10">
      {/* Paneer Butter Masala */}
      <div className="flex gap-6">
        <img className="w-40 h-40 object-cover rounded-lg" src="https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=600.jpg" alt="Paneer Butter Masala" />
        <div>
          <h3 className="text-xl font-bold">Paneer Butter Masala</h3>
          <p>A creamy, mildly spiced North Indian curry made with soft paneer cubes, tomatoes, cashews, and butter. A favorite in every Indian restaurant.</p>
        </div>
      </div>

      {/* Biryani */}
      <div className="flex gap-6">
        <img className="cursor-pointer w-40 h-40 object-cover rounded-lg" src="https://images.pexels.com/photos/14731625/pexels-photo-14731625.jpeg?auto=compress&cs=tinysrgb&w=600.jpg" alt="Biryani" />
        <div>
          <h3 className="text-xl font-bold">Hyderabadi Biryani</h3>
          <p>Hyderabadi Biryani is a fragrant rice dish layered with marinated meat, saffron, fried onions, and herbs. It’s known for its royal taste and aroma.</p>
        </div>
      </div>
    </div>

    {/* Masala Dosa */}
    <div className="flex gap-6">
      <img className="cursor-pointer w-40 h-40 object-cover rounded-lg" src="https://images.pexels.com/photos/12392915/pexels-photo-12392915.jpeg?auto=compress&cs=tinysrgb&w=600.jpg" alt="Masala Dosa" />
      <div>
        <h3 className="text-xl font-bold">Masala Dosa</h3>
        <p>Masala Dosa is a crispy South Indian crepe made from fermented rice and lentil batter, filled with spiced mashed potatoes and served with chutneys and sambar.</p>
      </div>
    </div>
  </div>
</section>


      {/* Gallery Section */}
      <section className="bg-gray-100 py-12 px-4 ">
        <h1 className='flex items-center justify-center text-black text-4xl font-bold mb-5'>Our Top Dishes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {["https://i.imgur.com/1Ss39Hq.jpg", "https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg"
          , "https://i.imgur.com/ZkDcLbW.jpg", "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg",
           "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg",
            "https://images.pexels.com/photos/28445591/pexels-photo-28445591/free-photo-of-crispy-cheese-corn-momos-with-tangy-sauce.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.jpg"]
            .map((src, i) => (
            <div key={i} className="cursor-pointer relative group">
              <img className="cursor-pointer w-full h-60 object-cover" src={src} alt="Food gallery" />
              
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition">
                  <h3 className="text-xl font-semibold mb-2">Delicious Dish</h3>
                  <button className="bg-white text-black px-4 py-2 rounded">Read more</button>
                </div>
              
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button onClick={() => navigate('/menu')}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full">View more</button>
        </div>
      </section>

     <section className="relative bg-gradient-to-r px-7 mt-10  " >
      
      <div className="relative bg-[url('https://png.pngtree.com/background/20210710/original/pngtree-black-meat-western-food-banner-background-picture-image_1013905.jpg')]  bg-cover bg-center px-2 py-9 overflow-hidden h-[400px] rounded-lg shadow-md" >
  <section>
    <h1 className='flex items-center justify-center text-white text-4xl font-bold'>Hot & Fresh – Just for You!</h1>
  </section>
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
  className="mt-5 cursor-pointer bg-emerald-600 text-white py-1 px-4 rounded hover:bg-emerald-700 transition duration-300"
>
  <i class="fa-solid fa-cart-plus"></i>
  Add
</button>
                {/* Favorite Button */}
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

  className=" cursor-pointer ml-20 bg-white text-red-500 px-3 py-1.5 rounded-full border border-red-300 hover:bg-red-50 transition duration-300 shadow-sm text-sm"
>
 <i class="fa-solid fa-heart"></i></button>
              </div>
            ))}
        </div>
      </div>
      </div>
    </section>

 <section className="py-12 px-4 bg-orange-50 mt-10">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-orange-600 mb-2">🍛 Today's Special</h2>
        <p className="text-gray-600">Hand-picked dishes curated by our chefs!</p>
        
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 max-w-7xl mx-auto">
        {food_list.slice(1, 11).map((item, index) => (
          <div
            key={index}
           className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
  onClick={() => navigate("/product-detail", { state: item })}
  src={item.image}
  alt={item.name}
  className="cursor-pointer w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105 hover:brightness-110"
/>


            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-orange-600 font-semibold">₹{item.price}</span>
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
  className=" cursor-pointer bg-emerald-600 text-white  py-1 px-5 rounded hover:bg-emerald-700  transition duration-300"
>
  <i class="fa-solid fa-cart-plus"></i>
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

  className=" cursor-pointer bg-white text-red-500 py-1 px-5 rounded-full border border-red-300 hover:bg-red-50  transition duration-300"
>
 <i class="fa-solid fa-heart"></i></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

<section>
 <div className="mt-10 bg-orange-200 py-10 px-4 mb-5">
      <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
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

         <div className='absolute right-10 bg-white w-30 mt-50'style={{
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
        <div className="overflow-hidden bg-[#f6f3ec] py-6 mb-5">
          <h1 className="text-3xl font-bold text-center text-black mb-8">Popular Brands & Restaurant</h1>
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
