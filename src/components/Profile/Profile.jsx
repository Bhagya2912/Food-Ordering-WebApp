import React, { useContext, useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

// Helper function to convert file to base64 string
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { orderHistory } = useCart();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl font-semibold">
        User not found. Please log in.
      </div>
    );
  }

  const userOrders = orderHistory.filter((order) => order.userId === user.id);

  // Editable profile & background images state
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") ||
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdfge.de%2Fblank-profile-picture-973460_640%2F&psig=AOvVaw0fwDGI0CnyAxmP2BNJJXGx&ust=1749032664826000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLjzvMeE1Y0DFQAAAAAdAAAAABAL"
  );
  const [backgroundImage, setBackgroundImage] = useState(
    localStorage.getItem("backgroundImage") ||
      "https://source.unsplash.com/1600x400/?food"
  );

  // Save changes to localStorage to persist
  useEffect(() => {
    localStorage.setItem("profileImage", profileImage);
    localStorage.setItem("backgroundImage", backgroundImage);
  }, [profileImage, backgroundImage]);

  return (
   <div className="min-h-screen bg-gray-100 font-sans flex justify-center">
  <div className="w-full max-w-6xl px-4">
    {/* Top Banner with Background Image */}
    <div
      className="relative w-full h-60 bg-cover bg-center rounded-md shadow-md flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-white px-3 py-1 text-sm font-semibold rounded shadow hover:bg-gray-100"
        >
          Edit Profile
        </button>
      </div>
      <div className="text-center">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mx-auto"
        />
        <h2 className="text-white text-2xl font-semibold mt-4 drop-shadow">
          {user.name}
        </h2>
      </div>
    </div>

    {/* Info Card */}
    <div className="mt-10">
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Contact Info
          </h3>
          <div className="text-gray-600 space-y-1">
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-between">
            Address
            <button className="text-sm text-orange-500 hover:underline flex items-center">
              <Pencil className="w-4 h-4 mr-1" /> Edit
            </button>
          </h3>
          <p className="text-gray-600">{user.address || "No address provided"}</p>
        </div>
      </div>

      {/* Orders */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">My Orders</h3>

        {userOrders.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-md text-gray-500 italic">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
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
                      className="flex items-center justify-between text-gray-700 border-b pb-2 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image || "https://via.placeholder.com/60"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-full"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/60";
                          }}
                        />
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                      </div>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-800">
                    Total: ₹{order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Edit Profile Modal */}
    {showEditModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl w-96">
          <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

          {/* Profile Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const base64 = await toBase64(file);
                  setProfileImage(base64);
                }
              }}
              className="w-full"
            />
            <img
              src={profileImage}
              alt="Profile Preview"
              className="mt-2 w-24 h-24 rounded-full object-cover border"
            />
          </div>

          {/* Background Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const base64 = await toBase64(file);
                  setBackgroundImage(base64);
                }
              }}
              className="w-full"
            />
            <img
              src={backgroundImage}
              alt="Background Preview"
              className="mt-2 w-full h-32 object-cover rounded"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

  );
};

export default Profile;



