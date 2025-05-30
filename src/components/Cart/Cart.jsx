import React, { useContext } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useContext(AuthContext); // get logged-in user
  const navigate = useNavigate();

  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 10.0; // example coupon discount
  const Shipping = 50;
  const total = Shipping + subTotal - discount;

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-80">
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          }}
        >
          <h1 className="text-black text-5xl font-bold italic underline">Your Cart</h1>
        </div>
      </div>

      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="mt-5 md:col-span-2 bg-white p-6 rounded-lg shadow-md ">
            <div className="grid grid-cols-5 text-left font-bold text-gray-700 border-b pb-4 mb-4 ">
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Subtotal</p>
              <p className="absolute right-145">Remove</p>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-5 items-center text-sm border-b py-4">
                <div className="flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover " />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <span className="text-xs text-gray-500">{item.weight || '500 g'}</span>
                  </div>
                </div>

                <p>₹{item.price.toFixed(2)}</p>

                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 bg-gray-200 rounded">
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 bg-gray-200 rounded">
                    +
                  </button>
                </div>

                <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xl">
                  ×
                </button>
              </div>
            ))}

            <div className="mt-6 flex justify-between items-center">
              <div className="flex gap-2">
                <input type="text" placeholder="Coupon Code" className="border px-3 py-2 rounded text-sm w-40" />
                <button className="bg-green-600 text-white px-4 py-2 rounded text-sm">Apply Coupon</button>
              </div>
              <button onClick={clearCart} className="text-green-600 text-sm underline">
                Clear Food Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-5 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{cartItems.reduce((acc, i) => acc + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span>₹{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{Shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Coupon Discount</span>
                <span>−₹{discount.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

