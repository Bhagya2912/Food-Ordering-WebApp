// Login.js (Updated)
import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const from = location.state?.from || "/home";

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      login(user);
      setMessage("Login successful!");
      setMessageType("success");
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } else {
      setMessage("Invalid email or password.");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src="https://blog.foodhub.com/wp-content/uploads/2023/12/Foodhub-Tryfh.png"
            alt="Food"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-6 md:p-10">
          <h2 className="text-xl font-normal">
            <span className="border-b-4 border-orange-500 pb-1 mr-1">Welcome</span> to Moodie Foodie
          </h2>
          <p className="text-orange-600 font-semibold mt-3 mb-6">LOGIN</p>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="relative">
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-12 py-3 rounded-full border border-gray-300"
                required
              />
              <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 text-lg">
                <i className="fa-solid fa-user"></i>
              </span>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-12 py-3 rounded-full border border-gray-300 pr-12"
                required
              />
              <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 text-lg">
                <i className="fa-solid fa-lock"></i>
              </span>
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer"
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white font-semibold py-3 rounded hover:bg-orange-600 transition"
            >
              Login
            </button>
          </form>

          {message && (
            <div className="fixed bottom-5 right-5 z-50">
              <div
                className={`px-6 py-3 rounded-md shadow-md text-white font-medium transition-all duration-300 ${
                  messageType === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {message}
              </div>
            </div>
          )}

          <p className="text-center text-sm text-gray-400 mt-3">Forgot password?</p>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="flex justify-center gap-6 mb-4 text-2xl">
            <a href="https://www.facebook.com/login" target="_blank" rel="noopener noreferrer" className="text-blue-600">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://accounts.google.com/signin" target="_blank" rel="noopener noreferrer" className="text-red-600">
              <i className="fa-brands fa-google"></i>
            </a>
          </div>

          <p className="text-center text-sm text-gray-600">
            Create your{" "}
            <Link to="/signup" className="text-orange-500 font-semibold underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
