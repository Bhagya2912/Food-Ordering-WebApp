import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useCart } from '../../context/CartContext'; // <--- ADDED/MODIFIED: Import useCart


const Checkout = () => {
  // <--- MODIFIED: Destructure cartItems, placeOrder, and clearCart from the CartContext
  const { cartItems, placeOrder, clearCart } = useCart();

 const [addresses, setAddresses] = useState(() => {
  try {
    const stored = JSON.parse(localStorage.getItem('addresses'));
    return Array.isArray(stored) ? stored : [];
  } catch (e) {
    return [];
  }
});

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [payment, setPayment] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showAddressAlert, setShowAddressAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  const [addressForm, setAddressForm] = useState({ name: '', mobile: '', address: '', city: '' });
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const cardOptions = [
    { type: 'visa', image: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' },
    { type: 'mastercard', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
    { type: 'amex', image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg' },
  ];

  // QR codes for UPI payments, dynamically generated based on totalAmount
  // IMPORTANT: Replace 'your-upi-id@phonepe' and 'your-upi-id@okhdfcbank' with actual UPI IDs
  const qrCodes = {
    phonepe: `upi://pay?pa=your-upi-id@phonepe&pn=YourMerchantName&am=${totalAmount}&cu=INR`,
    gpay: `upi://pay?pa=your-upi-id@okhdfcbank&pn=YourMerchantName&am=${totalAmount}&cu=INR`,
  };

  // Effect to populate address form when editing an existing address
  useEffect(() => {
    if (editData) setAddressForm(editData);
  }, [editData]);

  // Effect to calculate total amount whenever cartItems change
  useEffect(() => {
    if (cartItems.length === 0) {
      setTotalAmount(0);
      return;
    }
    const total = cartItems.reduce((sum, item) => {
      // Ensure item.price and item.quantity are numbers before calculation
      const price = typeof item.price === 'number' ? item.price : 0;
      const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
      if (price <= 0) {
        console.error('Invalid price for item:', item);
        return sum;
      }
      return sum + (price * quantity); // Multiply by quantity
    }, 0);
    setTotalAmount(total);
  }, [cartItems]);

  // Handler for changes in the address form inputs
  const handleAddressChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  // Handler for submitting the address form (add or update)
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (editingIndex !== null) {
      // Update existing address
      updated = [...addresses];
      updated[editingIndex] = addressForm;
    } else {
      // Add new address
      updated = [...addresses, addressForm];
    }
    setAddresses(updated);
    localStorage.setItem('addresses', JSON.stringify(updated)); // Persist to local storage
    setAddressForm({ name: '', mobile: '', address: '', city: '' }); // Reset form
    setEditingIndex(null); // Exit editing mode
    setEditData(null);
  };

  // Opens the payment modal after validating address and cart
  const openPaymentModal = () => {
    if (selectedAddress === null) {
      setShowAddressAlert(true); // Show alert if no address is selected
      return;
    }
    if (cartItems.length === 0 || totalAmount <= 0) {
      alert('Cart is empty or total amount is invalid. Please add items to your cart.');
      return;
    }
    setShowPaymentModal(true);
  };

  // Closes the payment modal and resets payment-related states
  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPayment('');
    setMobile('');
    setOtp('');
    setShowOtpInput(false);
    setSelectedCard('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
  };

  // Handles change in payment method selection
  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
    // Reset relevant states when payment method changes
    setMobile('');
    setOtp('');
    setShowOtpInput(false);
    setSelectedCard('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
  };

  // Handles selection of a card type
  const handleCardSelection = (cardType) => {
    setSelectedCard(cardType);
  };

  // Validates credit card details based on selected card type
  const validateCardDetails = () => {
    const cardNumberRegex = selectedCard === 'amex' ? /^\d{15}$/ : /^\d{16}$/;
    if (!cardNumberRegex.test(cardNumber.replace(/\s/g, ''))) {
      alert(`Please enter a valid ${selectedCard === 'amex' ? '15-digit' : '16-digit'} card number.`);
      return false;
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiryDate)) {
      alert('Please enter a valid expiration date in MM/YY format.');
      return false;
    }
    const [month, year] = expiryDate.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      alert('Expiration date cannot be in the past.');
      return false;
    }

    const cvvRegex = selectedCard === 'amex' ? /^\d{4}$/ : /^\d{3}$/;
    if (!cvvRegex.test(cvv)) {
      alert(`Please enter a valid ${selectedCard === 'amex' ? '4-digit' : '3-digit'} CVV.`);
      return false;
    }

    return true;
  };

  // Handles the final "Place Order" action
  const handlePlaceOrder = () => {
    if (!payment) {
      alert('Please select a payment method.');
      return;
    }

    if (payment === 'card' && !selectedCard) {
      alert('Please select a card type.');
      return;
    }

    if (payment === 'card' && !validateCardDetails()) {
      return;
    }

    if (payment === 'cod' && mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (totalAmount <= 0) {
      alert('Cart is empty or total amount is invalid. Please add items to your cart.');
      return;
    }

    // If payment is COD, show OTP input; otherwise, proceed to place order
    if (payment === 'cod') {
      setShowOtpInput(true);
    } else {
      // For card, PhonePe, GPay, directly place the order
      placeOrder(); // <--- MODIFIED: Call the placeOrder function from CartContext
      setConfirmedTotal(totalAmount);
      setShowSuccessAlert(true);
      closePaymentModal();
    }
  };

  // Handles OTP submission for COD
  const handleOtpSubmit = () => {
    if (otp === '1234') { // Simple OTP validation (for demonstration)
      if (totalAmount <= 0) {
        alert('Cart is empty or total amount is invalid. Please add items to your cart.');
        return;
      }
      placeOrder(); // <--- MODIFIED: Call the placeOrder function from CartContext
      setConfirmedTotal(totalAmount);
      setShowSuccessAlert(true);
      closePaymentModal();
    } else {
      alert('Invalid OTP, please try again.');
    }
  };

  // Closes the address alert modal
  const closeAddressAlert = () => {
    setShowAddressAlert(false);
  };

  // Closes the success alert modal and resets confirmed total
  const closeSuccessAlert = () => {
    setShowSuccessAlert(false);
    setConfirmedTotal(0);
  };

  return (
    <>
      {/* Header with background image */}
      <div className="h-50 " style={{ backgroundImage: "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
        <h1 className=" flex justify-center pt-15 text-black text-5xl font-bold italic underline"  >CheckOut</h1>
      </div>

      {/* Main content grid for delivery address and order summary */}
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 min-h-screen bg-gray-50 ">

        {/* Left Side - Delivery Address Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Delivery Address</h2>
          {addresses.length === 0 && (
            <p className="text-gray-500 mb-4">No saved addresses. Please add one below.</p>
          )}
          {/* Display existing addresses */}
          {addresses.map((addr, index) => (
            <div
              key={index}
              onClick={() => setSelectedAddress(index)}
              className={`border p-4 mb-3 rounded cursor-pointer transition-shadow
              ${selectedAddress === index ? 'bg-white border-blue-500 shadow-md' : 'bg-white hover:shadow-lg'}`}
            >
              <p className="font-semibold text-lg">
                {addr.name} <span className="text-sm text-gray-600">({addr.mobile})</span>
              </p>
              <p className="text-gray-700">{addr.address}, {addr.city}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent selecting address when clicking edit
                  setEditingIndex(index);
                  setEditData(addr);
                }}
                className="text-blue-600 hover:underline mt-2 text-sm"
              >
                Edit
              </button>
            </div>
          ))}
          {/* Form to add or edit address */}
          <form onSubmit={handleAddressSubmit} className="mt-6 space-y-4 bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {editingIndex !== null ? 'Edit Address' : 'Add New Address'}
            </h3>
            {['name', 'mobile', 'address', 'city'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={addressForm[field]}
                onChange={handleAddressChange}
                required
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
            <button
              type="submit"
              className="bg-orange-600  text-white font-semibold rounded px-5 py-2 mt-2 transition-colors w-full"
            >
              {editingIndex !== null ? 'Update Address' : 'Add Address'}
            </button>
          </form>
        </div>

        {/* Right Side - Cart Summary Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
          <div className="bg-white rounded shadow-md p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {cartItems.length === 0 && <p className="text-gray-500">Your cart is empty.</p>}
            {/* Display cart items */}
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-3">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || 'https://placehold.co/64x64/E0E0E0/333333?text=No+Image'} // Fallback image
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-full"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/64x64/E0E0E0/333333?text=No+Image'; // Fallback on error
                    }}
                  />
                  <p className="font-medium text-gray-800">{item.name} x {item.quantity}</p> {/* Show quantity */}
                </div>
                <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            {cartItems.length > 0 && (
              <p className="text-right font-extrabold text-xl mt-4">Total: ₹{totalAmount.toFixed(2)}</p>
            )}
          </div>
          {/* Proceed to Payment button */}
          <button
            onClick={openPaymentModal}
            className={`mt-8 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded w-full transition-colors
            ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={cartItems.length === 0}
          >
            Proceed to Payment
          </button>
        </div>

        {/* Custom Address Alert Pop-up */}
        {showAddressAlert && (
          <>
            <div
              onClick={closeAddressAlert}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            ></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 max-w-sm w-full p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Address Required</h3>
              <p className="text-gray-600">Please select a delivery address to proceed.</p>
              <button
                onClick={closeAddressAlert}
                className="bg-orange-600  text-white font-semibold py-2 px-4 rounded w-full transition-colors"
              >
                OK
              </button>
            </div>
          </>
        )}

        {/* Custom Success Alert Pop-up */}
        {showSuccessAlert && (
          <>
            <div
              onClick={closeSuccessAlert}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            ></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 max-w-sm w-full p-6 space-y-4">
              <h3 className="text-lg font-semibold text-green-600">Order Placed!</h3>
              <p className="text-gray-600">
                {confirmedTotal > 0
                  ? `You have paid ₹${confirmedTotal.toFixed(2)} for your order!`
                  : 'Order placed, but total amount is invalid (₹0.00). Please ensure your cart has items before placing an order.'}
              </p>
              <button
                onClick={closeSuccessAlert}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full transition-colors"
              >
                OK
              </button>
            </div>
          </>
        )}

        {/* Payment Modal */}
        {showPaymentModal && (
          <>
            <div
              onClick={closePaymentModal}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            ></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 max-w-md w-full p-6 space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Select Payment Method</h3>
              <div className="space-y-3">
                {['cod', 'card', 'phonepe', 'gpay'].map((opt) => {
                  let label;
                  if (opt === 'cod') label = 'Cash On Delivery';
                  else if (opt === 'card') label = 'Card Payment';
                  else if (opt === 'phonepe') label = 'PhonePe';
                  else if (opt === 'gpay') label = 'Google Pay';
                  return (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="payment"
                        value={opt}
                        checked={payment === opt}
                        onChange={handlePaymentChange}
                        className="w-5 h-5 accent-orange-600"
                      />
                      <span className="text-lg font-medium">{label}</span>
                    </label>
                  );
                })}
              </div>
              {payment === 'card' && (
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-700">Select Card Type</h4>
                  <div className="flex gap-4">
                    {cardOptions.map((card) => (
                      <label
                        key={card.type}
                        className={`flex items-center gap-2 p-2 border rounded cursor-pointer transition-colors ${
                          selectedCard === card.type ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="cardType"
                          value={card.type}
                          checked={selectedCard === card.type}
                          onChange={() => handleCardSelection(card.type)}
                          className="w-4 h-4 accent-orange-600"
                        />
                        <img src={card.image} alt={card.type} className="w-5 h-8 object-contain" />
                        <span className="capitalize">{card.type}</span>
                      </label>
                    ))}
                  </div>
                  {selectedCard && (
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-gray-700">Enter Card Details</h4>
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, selectedCard === 'amex' ? 15 : 16);
                          setCardNumber(val.replace(/(\d{4})(?=\d)/g, '$1 '));
                        }}
                        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                      <div className="flex gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                            if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
                            setExpiryDate(val);
                          }}
                          className="border border-gray-300 rounded px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={cvv}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, selectedCard === 'amex' ? 4 : 3);
                            setCvv(val);
                          }}
                          className="border border-gray-300 rounded px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {(payment === 'phonepe' || payment === 'gpay') && (
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Scan the QR code to pay ₹{totalAmount.toFixed(2)}:</p>
                  <QRCodeCanvas
                    value={payment === 'phonepe' ? qrCodes.phonepe : qrCodes.gpay}
                    size={160}
                    className="mx-auto"
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                  />
                </div>
              )}
              {payment === 'cod' && (
                <input
                  type="text"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setMobile(val);
                  }}
                  className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              )}
              {showOtpInput && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP (1234)"
                    value={otp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setOtp(val);
                    }}
                    className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    onClick={handleOtpSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded w-full mt-2 transition-colors"
                  >
                    Submit OTP
                  </button>
                </>
              )}
              {!showOtpInput && (
                <div className="flex justify-between gap-4">
                  <button
                    onClick={closePaymentModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Checkout;