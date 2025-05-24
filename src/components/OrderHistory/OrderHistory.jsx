import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const OrderHistory = () => {
  const { orderHistory } = useCart();

  return (
    <>
    <div className="h-50" style={{ backgroundImage: "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
      <h1 className="flex justify-center pt-15 text-4xl font-bold text-Black mb-6 underline" >Your Order History</h1>
    </div>
    <div className="min-h-screen bg-gray-100 p-4" >
      <div className="max-w-4xl mx-auto">
      
        {orderHistory.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">No orders yet. Start shopping now!</p>
            <Link
              to="/order" // Assuming '/order' is your shopping page, adjust if needed
              className="inline-block text-white bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-lg"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orderHistory.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Order #{order.id}
                  </h2>
                  <span className="text-gray-600">{order.date}</span>
                </div>
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between text-gray-700 border-b pb-2 last:border-b-0 last:pb-0" // Added styling for separation
                    >
                      <div className="flex items-center gap-3 "> {/* Added div for image and name */}
                        <img
                          src={item.image || 'https://via.placeholder.com/60'} // <--- ADDED: Product image
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-full" // Basic styling for the image
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/60'; // Fallback for broken images
                          }}
                        />
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                      </div>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span> {/* Assuming Indian Rupees (₹) based on previous code */}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-right">
                  <p className="text-lg font-semibold text-gray-800">
                    Total: ₹{order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link
          to="/"
          className="mt-6 inline-block text-white bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
    </>
  );
};

export default OrderHistory;