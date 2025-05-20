import React from 'react';


const Contact = () => {
  return (
   <div className="font-sans text-gray-800">

      {/* Hero Section */}
      <div className="relative w-full h-96"
      >
        
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')" }}>
          <h1 className="text-white text-5xl font-bold italic"  >Contact Us</h1>
        </div>
      </div>

      {/* Questions Form */}
      <section className="text-center py-12 px-4">
        <h2 className="text-2xl font-semibold mb-6">HAVE ANY QUESTIONS</h2>
        <p className="mb-6 max-w-xl mx-auto text-gray-600">
          Want to share ideas or ask your inquiries? Use the form below or email us directly at
          <span className="text-green-600 font-medium"> contact@moodiefoodie.com</span>
        </p>
        <form className="max-w-lg mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <textarea
            rows="4"
            placeholder="Message"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            SUBMIT
          </button>
        </form>
      </section>

      {/* Opening Hours */}
      <section className="bg-green-50 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">WE ARE OPEN</h2>
        <p className="max-w-xl mx-auto text-gray-600">
          We bring you the flavor of the week. Below are our hours of operation:
        </p>
        <div className="mt-6 space-y-1 text-gray-700">
          <p>Monday–Friday: 8:00am – 11:00pm</p>
          <p>Saturday: 8:00am – 11:00pm</p>
          <p>Sunday: 7:00am - 11:00pm</p>
        </div>
      </section>

      {/* Contact & Newsletter */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Info */}
          <div>
            <h3 className=" text-xl font-semibold mb-4">CONTACTS</h3>
            <img
              src="/public/contact.png" // Replace with your image
              alt="Contact Visual"
              className="w-40 h-40 rounded-full object-cover shadow"
            />
            <p className="text-gray-600 mb-2">
              Use our contact form or email us for information or suggestions.
            </p>
            <p className="text-gray-600 mb-2" >
              Feel free to get in touch with us at any point.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">SIGN UP FOR THE NEWSLETTER</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to get our latest food updates.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
    
  );
};

export default Contact;
