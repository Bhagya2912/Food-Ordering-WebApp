import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

function Wishlist() {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
    <div className="relative w-full h-96"
      >
        
        <div
  className="absolute inset-0 bg-black bg-opacity-100 flex items-center justify-center bg-no-repeat bg-cover bg-center"
  style={{
    backgroundImage: "url('https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
  }}
>
  <h1 className="text-black text-5xl font-bold italic underline">Always Favourite</h1>
</div>
      </div>
    <div className="max-w-5xl mx-auto px-4 py-10">
     

      {!wishlistItems || wishlistItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-lg mb-4">Your wishlist is empty.</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="space-y-4 ">
          {wishlistItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white rounded-xl shadow-md overflow-hidden p-4 hover:shadow-xl transition duration-300 "
            >
              {/* Product image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-full object-cover mr-4 "
              />

              {/* Product details */}
              <div className="flex-1 ">
                <h3 className="text-lg font-semibold text-gray-800 ">{item.name}</h3>
                <p className="text-sm text-gray-500">Fresh {item.name.toLowerCase()}</p>
              </div>

              {/* Price */}
              <div className="text-yellow-600 font-bold text-lg mr-6">
                ₹{item.price}
              </div>

              {/* Add to cart button */}
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
   <i class="fa-solid fa-cart-plus"></i>{'  '} 
  Add
 
</button>

              {/* Delete icon */}
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="text-red-500 hover:text-red-700 ml-5 text-xl"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default Wishlist;




