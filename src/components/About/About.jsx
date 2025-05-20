import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  
   const navigate = useNavigate();

  return (
    <section className="bg-white text-gray-800 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-4">About Us</h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover the story behind our passion for authentic Indian flavors.
        </p>

        {/* Image and Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
  {/* Video */}
  <video
    src="https://videos.pexels.com/video-files/4253333/4253333-uhd_1440_2732_25fps.mp4" // Replace with your video URL
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-96 object-cover rounded-xl shadow-lg"
  />




          {/* Text Content */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-red-600">Our Journey</h3>
            <p className="text-gray-700 mb-6">
              At <span className="font-semibold text-red-600">Zomato</span>, we bring you the richness of Indian cuisine from every region—North to South, East to West. 
              We started our journey with one mission: to celebrate the flavors that define our culture.
            </p>
            <p className="text-gray-700 mb-6">
              Whether you're craving spicy biryani, buttery naan, or healthy vegetarian thalis, we deliver 
              freshly made dishes crafted with love by expert chefs. We believe food is not just to satisfy hunger—it’s an experience.
            </p>
            <button
      onClick={() => navigate('/menu')}
      className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
    >
      Explore Our Menu
    </button>
          </div>
        </div>

        {/* Our Values */}
        <div className="mt-20 grid md:grid-cols-3 gap-10 text-center">
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/2813/2813171.png" alt="Fresh" className="w-16 h-16 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Fresh Ingredients</h4>
            <p className="text-gray-600">We prioritize farm-fresh vegetables, hand-ground spices, and premium ingredients.</p>
          </div>

          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="Authentic" className="w-16 h-16 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Authentic Taste</h4>
            <p className="text-gray-600">Traditional recipes passed down through generations with a modern twist.</p>
          </div>

          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/1087/1087926.png" alt="Delivery" className="w-16 h-16 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Fast Delivery</h4>
            <p className="text-gray-600">Hot and delicious meals delivered to your door in under 30 minutes.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
