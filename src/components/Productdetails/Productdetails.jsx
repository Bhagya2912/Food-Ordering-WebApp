import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // ✅ Cart context
import { food_list } from "../../assets/assets";
import { FaUtensils, FaMobileAlt, FaShippingFast, FaStar } from 'react-icons/fa';

const services = [
  {
    icon: <FaUtensils size={40} className="text-yellow-400" />,
    title: 'Delicious Meals',
    description: 'Fresh and tasty meals prepared by top chefs delivered to your doorstep.',
  },
  {
    icon: <FaMobileAlt size={40} className="text-yellow-400" />,
    title: 'Easy to Order',
    description: 'Order anytime, anywhere using our user-friendly app or website.',
  },
  {
    icon: <FaShippingFast size={40} className="text-yellow-400" />,
    title: 'Fast Delivery',
    description: 'We ensure your food arrives hot and fresh within 30 minutes.',
  },
  {
    icon: <FaStar size={40} className="text-yellow-400" />,
    title: 'Top Rated',
    description: 'Thousands of happy customers with 5-star reviews and counting.',
  },
];

const Productdetails = () => {
  const { state: product } = useLocation();
  const { addToCart} = useCart(); // ✅ Access addToCart
  const [quantity, setQuantity] = useState(1);
   const { wishlistItems,addToWishlist } = useCart();

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded-lg" />
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-500 mt-1">{product.calories} – {product.weight}</p>
          <p className="text-gray-700 mt-4">{product.description}</p>

          <div className="mt-6">
            <span className="text-xl font-semibold text-orange-600">₹{product.price}</span>
            

            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-200 px-3 py-1 rounded text-xl font-bold"
              >
                −
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-gray-200 px-3 py-1 rounded text-xl font-bold"
              >
                +
              </button>
            </div>

            <button
              className="cursor-pointer mt-5 mr-6 bg-emerald-600 text-white  py-1 px-5 rounded hover:bg-emerald-700  transition duration-300"
              onClick={() =>
                addToCart({ ...product, quantity })
              }
            >
             <i className="fa-solid fa-cart-plus"></i>  Add To Cart
            </button>
            <button
              className="cursor-pointer bg-white text-red-500 py-1 px-5 rounded-full border border-red-300 hover:bg-red-50  transition duration-300"
              onClick={() =>
                addToWishlist({ ...product, quantity })
              }
            >
             <i className="fa-solid fa-heart "></i>
            </button>
          </div>
          
        </div>
      </div>
      
    </div>
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-yellow-50 border border-yellow-100 p-6 rounded-xl shadow hover:shadow-lg text-center transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className='mb-5'>
        <h1 className="flex flex-wrap justify-center text-4xl font-bold text-gray-800 mb-8">Popular Food Items </h1>
  <div className="flex flex-wrap justify-center gap-6 px-4">
   
    {visibleItems.map((item, index) => (
      <div key={index} className="bg-white shadow-md rounded-xl w-64 p-5">
        <div className="relative h-50 mx-auto mb-4 flex  overflow-hidden group">
 <img
      onClick={() => navigate("/product-detail", { state: item })}
      src={item.image}
      alt={item.name}
      className="w-full h-full object-cover cursor-pointer "
    />

 <div className="absolute inset-0 bg-yellow-100/40 backdrop-blur-sm flex flex-col items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out pb-4 transform translate-y-10 group-hover:translate-y-0 ">
    <button
  onClick={(e) => {
    e.stopPropagation();
    console.log("Add to Wishlist:", item);
    addToWishlist({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      rating: item.rating,
    });
  }}
  className="text-white hover:text-black p-3 rounded-full transition duration-300"
  aria-label="Add to Wishlist"
>
  <i className="fa-solid fa-heart fa-2x"></i>
</button>

<button
  onClick={(e) => {
    e.stopPropagation();
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      rating: item.rating,
    });
  }}
  className="text-white hover:text-black p-3 rounded-full transition duration-300"
  aria-label="Add to Cart"
>
  <i className="fa-solid fa-cart-plus fa-2x"></i>
</button>

  </div>
</div>


        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
        <p className="text-gray-500">{item.description}</p>
        <p className="text-red-600 font-semibold text-lg mt-1">₹{item.price}</p>
      </div>
    ))}
  </div>
</section>

        
    </>
  );
};

export default Productdetails;

