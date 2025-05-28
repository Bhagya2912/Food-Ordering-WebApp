import React from 'react';

// Floating Offer Data
const offers = [
  {
    id: 1,
    title: '50% OFF on First Order',
    code: 'WELCOME50',
    description: 'Valid for new users only. Min order ₹149.',
    expiry: 'Valid till May 31, 2025',
    badge: 'NEW',
  },
  {
    id: 2,
    title: 'Flat ₹100 OFF on Pizzas',
    code: 'PIZZA100',
    description: 'On orders above ₹499 from select outlets.',
    expiry: 'Expires June 15, 2025',
    badge: 'HOT',
  },
  {
    id: 3,
    title: '20% Cashback via UPI',
    code: 'UPI20',
    description: 'Get 20% cashback when you pay via UPI.',
    expiry: 'Offer valid every Friday',
    badge: 'LIMITED',
  },
  {
    id: 4,
    title: 'Buy 1 Get 1 Free - Burgers',
    code: 'BURGERB1G1',
    description: 'Applicable on select combos only.',
    expiry: 'Limited time offer',
    badge: 'BOGO',
  },
];

const Offer = () => {
  return (
    <>
      <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-100">
        {/* Floating Images */}
        <img
          src="https://t4.ftcdn.net/jpg/01/69/56/95/360_F_169569546_zaLG8x4tyIu3SDn1jYWXThVpMjCEbn8Q.jpg"
          alt="burger"
          className="absolute left-40 top-96 w-40 animate-float z-0 opacity-60"
        />
        <img
          src="https://t3.ftcdn.net/jpg/08/87/17/64/360_F_887176456_8NA2EjZRl7sZJDivLwaWSSQLIGewatWV.jpg"
          alt="momo"
          className="absolute right-10 top-10 w-44 animate-float-slow z-0 opacity-70"
        />
        <img
          src="https://thumbs.dreamstime.com/b/fresh-hot-pizza-melting-cheese-white-background-one-separating-piece-369270920.jpg"
          alt="pizza"
          className="absolute right-10 top-96 w-36 rotate-6 animate-float z-0 opacity-60"
        />
        <img
          src="https://png.pngtree.com/png-clipart/20240911/original/pngtree-thali-isolated-on-transparent-background-png-image_15988978.png"
          alt="thali"
          className="absolute left-40 top-10 w-36 rotate-6 animate-float z-0 opacity-60"
        />

        {/* Floating Animation Styles */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-slow {
            animation: float 10s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin 20s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>

        {/* Hero Section */}
        <section className="relative z-10 py-20 mt-20 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 leading-tight drop-shadow-md">
            🍽️ Exclusive Food Offers
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Grab delicious deals before they expire
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white/60 backdrop-blur-lg rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-semibold  text-gray-800">Free Delivery</h2>
              <p className="text-gray-600">Get free delivery on orders above ₹200. Save more when you order in bulk.</p>
            </div>
          </div>

          
        </section>

        

        {/* Offer Cards */}
        <section className="relative z-0 mt-1 max-w-6xl mx-auto px-6 pb-20 space-y-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white/70 backdrop-blur-lg border border-red-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-red-600">{offer.title}</h3>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">{offer.badge}</span>
                </div>
                <p className="text-sm mt-2 text-gray-700">{offer.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono text-sm tracking-wide">
                    Code: {offer.code}
                  </span>
                  <button className="text-sm text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-all">
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">{offer.expiry}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Offer;


