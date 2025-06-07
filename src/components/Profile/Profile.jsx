import React, { useContext, useState, useEffect } from "react";
import { Pencil, PlusCircle } from "lucide-react";
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
  const { user } = useContext(AuthContext); // MUST be before using user anywhere!
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

  //Address section
  // Get logged-in user from context
  const loggedInUserEmail = user?.email || "";

  const defaultAddresses = {
    home: "",
    office: "",
    other: [],
  };

  // 2️⃣ Initialize addresses once based on loggedInUserEmail
  const [addresses, setAddresses] = useState(() => {
    if (!loggedInUserEmail) return defaultAddresses;

    const saved = localStorage.getItem("user_addresses");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed[loggedInUserEmail]) {
          return {
            home: parsed[loggedInUserEmail].home || "",
            office: parsed[loggedInUserEmail].office || "",
            other: Array.isArray(parsed[loggedInUserEmail].other)
              ? parsed[loggedInUserEmail].other
              : [],
          };
        }
      } catch {
        // ignore parse errors
      }
    }
    return defaultAddresses;
  });

  // 3️⃣ Reload addresses on user change (login/logout)
  useEffect(() => {
    if (!loggedInUserEmail) {
      // User logged out: reset addresses to default or empty
      setAddresses(defaultAddresses);
      return;
    }

    const saved = localStorage.getItem("user_addresses");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed[loggedInUserEmail]) {
          setAddresses({
            home: parsed[loggedInUserEmail].home || "",
            office: parsed[loggedInUserEmail].office || "",
            other: Array.isArray(parsed[loggedInUserEmail].other)
              ? parsed[loggedInUserEmail].other
              : [],
          });
          return;
        }
      } catch {
        // ignore
      }
    }
    // No saved data for user, reset to defaults
    setAddresses(defaultAddresses);
  }, [loggedInUserEmail]);

  // 4️⃣ Save addresses to localStorage whenever addresses or loggedInUserEmail change
  useEffect(() => {
    if (!loggedInUserEmail) return;

    const saved = localStorage.getItem("user_addresses");
    let parsed = {};
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch {
        parsed = {};
      }
    }
    parsed[loggedInUserEmail] = addresses;
    localStorage.setItem("user_addresses", JSON.stringify(parsed));
  }, [addresses, loggedInUserEmail]);

  // 5️⃣ Form and edit state
  const [editing, setEditing] = useState(null);
  const [formValue, setFormValue] = useState("");
  const [message, setMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const startEdit = (type) => {
    setEditing(type);
    if (type.startsWith("other-")) {
      const index = parseInt(type.split("-")[1], 10);
      setFormValue(addresses.other[index]);
    } else if (type === "other-new") {
      setFormValue("");
    } else {
      setFormValue(addresses[type]);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (editing === "home" || editing === "office") {
      setAddresses((prev) => ({ ...prev, [editing]: formValue }));
    } else if (editing === "other-new") {
      setAddresses((prev) => ({ ...prev, other: [...prev.other, formValue] }));
    } else if (editing.startsWith("other-")) {
      const index = parseInt(editing.split("-")[1], 10);
      setAddresses((prev) => {
        const updatedOther = [...prev.other];
        updatedOther[index] = formValue;
        return { ...prev, other: updatedOther };
      });
    }

    setEditing(null);
    setFormValue("");
  };

  const handleDelete = (type) => {
    if (type === "home" || type === "office") {
      setAddresses((prev) => ({ ...prev, [type]: "" }));
    } else if (type.startsWith("other-")) {
      const index = parseInt(type.split("-")[1], 10);
      setAddresses((prev) => {
        const updatedOther = [...prev.other];
        updatedOther.splice(index, 1);
        return { ...prev, other: updatedOther };
      });
    }

    setConfirmDelete(null);
    setMessage("Deleted successfully!");
    setTimeout(() => setMessage(""), 3000);
  };


  return (
   <div className="min-h-screen font-sans flex justify-center">
  <div className="w-full max-w-6xl px-4">
    {/* Top Banner with Background Image */}
    <div
      className="relative w-full h-60 bg-cover bg-center rounded-md shadow-md flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowEditModal(true)}
          className="cursor-pointer bg-white px-3 py-1 text-sm font-semibold rounded shadow hover:bg-gray-100"
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
    <div className="mt-10 ">
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg ml-5 font-semibold text-gray-800 mb-2">
            Contact Info
          </h3>
          <div className="text-gray-600 ml-5 space-y-1">
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
          </div>
        </div>

        {/* Address */}
       <div className="max-w-4xl mx-auto ml-0 p-6 ">
  <div className="text-lg font-semibold text-gray-800 mb-2">My addresses</div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* Home and Office Boxes */}
    {["home", "office"].map((type) => (
      <div key={type} className="border rounded-md shadow-md p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-between">
          {type.charAt(0).toUpperCase() + type.slice(1)}
          <div className="flex items-center gap-2">
            <button
  onClick={() => startEdit(type)}
  className="cursor-pointer text-sm text-white 
             bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 
             hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 
             shadow-md rounded px-3 py-1 flex items-center transition duration-300"
>
  <Pencil className="cursor-pointer w-4 h-4 mr-1" /> Edit
</button>

{confirmDelete === type ? (
  <div className="flex gap-2">
    <button
      onClick={() => {
        handleDelete(type);
        setConfirmDelete(null);
      }}
      className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded shadow transition"
    >
      Yes
    </button>
    <button
      onClick={() => setConfirmDelete(null)}
      className="text-sm text-gray-700 border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded transition"
    >
      No
    </button>
  </div>
) : (
  <button
    onClick={() => setConfirmDelete(type)}
    className="cursor-pointer text-sm text-white 
               bg-gradient-to-r from-red-500 via-red-600 to-red-700 
               hover:from-red-600 hover:via-red-700 hover:to-red-800 
               shadow-md rounded px-3 py-1 flex items-center transition duration-300"
  >
    Delete
  </button>
)}
{message && (
  <div className="fixed top-45 left-1/2 transform -translate-x-1/2  text-green-500 px-4 py-2 rounded shadow-md z-50">
    {message}
  </div>
)}
          </div>
        </h3>
        <p className="text-gray-600">
          {addresses[type] || `No ${type} address provided`}
        </p>
      </div>
    ))}

    {/* Other Addresses Boxes */}
    {addresses.other.map((addr, idx) => (
      <div
        key={idx}
        className="border rounded-md shadow-md p-4 bg-white"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-between">
          Other
          <div className="flex items-center gap-2">
            <button
              onClick={() => startEdit(`other-${idx}`)}
              className="cursor-pointer text-sm text-white 
             bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 
             hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 
             shadow-md rounded px-3 py-1 flex items-center transition duration-300"
            >
              <Pencil className="cursor-pointer w-4 h-4 mr-1" /> Edit
            </button>
           {confirmDelete === `other-${idx}` ? (
  <div className="flex gap-2">
    <button
      onClick={() => handleDelete(`other-${idx}`)}
      className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded shadow transition"
    >
      Yes
    </button>
    <button
      onClick={() => setConfirmDelete(null)}
      className="text-sm text-gray-700 border border-gray-300 hover:bg-gray-100 px-3 py-1 rounded transition"
    >
      No
    </button>
  </div>
) : (
  <button
    onClick={() => setConfirmDelete(`other-${idx}`)}
    className="cursor-pointer text-sm text-white 
      bg-gradient-to-r from-red-500 via-red-600 to-red-700 
      hover:from-red-600 hover:via-red-700 hover:to-red-800 
      shadow-md rounded px-3 py-1 flex items-center transition duration-300"
  >
    Delete
  </button>
)}

          </div>
        </h3>
        <p className="text-gray-600">{addr}</p>
      </div>
    ))}

    {/* Add Address Box */}
    {editing !== "other-new" && (
      <div
        onClick={() => startEdit("other-new")}
        className="cursor-pointer border rounded-md shadow-md p-4 bg-white flex flex-col items-center justify-center text-center text-gray-600 hover:bg-gray-50"
      >
        <div className="text-3xl text-red-500 mb-2">＋</div>
        <p className="cursor-pointer font-medium">Add address</p>
      </div>
    )}
  </div>

  {/* Address Form */}
  {editing && (
    <form onSubmit={submitForm} className="mt-6 max-w-lg">
      <label
        className="block mb-1 font-semibold text-gray-700"
        htmlFor="addressInput"
      >
        {editing.startsWith("other")
          ? "Other Address"
          : `${editing.charAt(0).toUpperCase() + editing.slice(1)} Address`}
      </label>
      <textarea
        id="addressInput"
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        rows={3}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Enter address"
        required
      ></textarea>

      <div className="mt-3 flex gap-3">
        <button
          type="submit"
          className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setFormValue("");
          }}
          className="cursor-pointer border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  )}
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



