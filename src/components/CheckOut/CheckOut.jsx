import { useState } from 'react';
import { Mail, Phone, MapPin, Edit2, Save, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const [address, setAddress] = useState("8502 Preston Rd. Inglewood, Maine 98380");
  const [email, setEmail] = useState("sara.cruz@example.com");
  const [phone, setPhone] = useState("(229) 555-0109");
  const [editingField, setEditingField] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('mastercard');

  const handleEdit = (field) => setEditingField(field);
  const handleSave = () => setEditingField(null);

  const PaymentOption = ({ id, img, label }) => (
    <button
      onClick={() => setPaymentMethod(id)}
      className={`p-3 rounded-xl border-2 flex items-center justify-center w-20 h-14 transition ${
        paymentMethod === id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <img src={img} alt={label} className="h-6" />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md space-y-8">
      <h1 className="text-2xl font-bold text-center">Checkout</h1>

      {/* Shipping Address */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Shipping To</h2>
        <div className="flex items-start justify-between bg-gray-50 p-4 rounded-lg border">
          <div className="flex gap-3">
            <MapPin className="text-blue-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              {editingField === 'address' ? (
                <textarea
                  className="w-full mt-1 p-2 border rounded"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              ) : (
                <p className="text-base">{address}</p>
              )}
            </div>
          </div>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => (editingField === 'address' ? handleSave() : handleEdit('address'))}
          >
            {editingField === 'address' ? <Save size={18} /> : <Edit2 size={18} />}
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Email */}
        <div className="flex items-start justify-between bg-gray-50 p-4 rounded-lg border">
          <div className="flex gap-3">
            <Mail className="text-blue-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              {editingField === 'email' ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                />
              ) : (
                <p className="text-base">{email}</p>
              )}
            </div>
          </div>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => (editingField === 'email' ? handleSave() : handleEdit('email'))}
          >
            {editingField === 'email' ? <Save size={18} /> : <Edit2 size={18} />}
          </button>
        </div>

        {/* Phone */}
        <div className="flex items-start justify-between bg-gray-50 p-4 rounded-lg border">
          <div className="flex gap-3">
            <Phone className="text-blue-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Mobile</p>
              {editingField === 'phone' ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 p-2 border rounded w-full"
                />
              ) : (
                <p className="text-base">{phone}</p>
              )}
            </div>
          </div>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => (editingField === 'phone' ? handleSave() : handleEdit('phone'))}
          >
            {editingField === 'phone' ? <Save size={18} /> : <Edit2 size={18} />}
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <PaymentOption id="mastercard" label="Mastercard" img="https://img.icons8.com/color/48/mastercard-logo.png" />
          <PaymentOption id="stripe" label="Stripe" img="https://img.icons8.com/color/48/stripe.png" />
          <PaymentOption id="paypal" label="PayPal" img="https://img.icons8.com/color/48/paypal.png" />
          <PaymentOption id="add" label="Add" img="https://img.icons8.com/ios-filled/50/plus-math.png" />
        </div>
        <label className="mt-4 inline-flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-blue-500" />
          Cash On Delivery
        </label>
      </div>

      {/* Summary */}
      <div className="flex justify-between items-center text-lg font-semibold border-t pt-4">
        <span>Estimated Total:</span>
        <span>$60.50</span>
      </div>

      {/* Button */}
      <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base font-semibold transition">
        Make Payment
      </button>
    </div>
  );
}


