import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen mt-5 mb-5 bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Left Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src="https://images.pexels.com/photos/750073/pexels-photo-750073.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Food"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 p-6 md:p-10">
          <h2 className="text-xl font-normal">
            <span className="border-b-4 border-orange-500 pb-1 mr-1">Welcome</span> to Moodie Foodie
          </h2>

          <p className="text-orange-600 font-semibold mt-3 mb-6">LOGIN</p>

          <form className="space-y-5">
            <input
              type="email"
              placeholder="Email ID"
              className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full hover:bg-orange-600 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-3">Forgot password?</p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-6 mb-4 text-2xl">
            <a
              href="https://www.facebook.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:scale-110 transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://accounts.google.com/signin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:scale-110 transition"
            >
              <i className="fab fa-google-plus-g"></i>
            </a>
          </div>

          <p className="text-center text-sm text-gray-600">
            Create your{' '}
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
