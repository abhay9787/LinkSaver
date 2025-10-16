import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [signUpMode, setSignUpMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const slides = [
    { id: 1, text: "Create your own courses", img: "/img/image1.png" },
    { id: 2, text: "Customize as you like", img: "/img/image2.png" },
    { id: 3, text: "Invite students to your class", img: "/img/image3.png" },
  ];

  // Handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  // ✅ Signup handler (merged from your Register component)
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert("Account created successfully!");
      setSignUpMode(false); // switch back to login form
      setError("");
    } catch (err) {
      setError("Signup failed. Try again.");
    }
  };

  return (

    <main
      className={`w-full h-full flex items-center mt-16 justify-center overflow-hidden bg-[#111111] p-8 transition-all duration-700`}
    >
      {/* Container with conditional class replacing JS add/remove */}
      <div
        className={`relative w-full max-w-[1020px] h-[540px] bg-gray-200 rounded-[3.3rem] shadow-[0_60px_40px_-30px_rgba(0,0,0,0.27)] transition-all duration-700 ${signUpMode ? "right-panel-active" : ""
          }`}
      >
        <div className="absolute w-[calc(100%-4.1rem)] h-[calc(100%-4.1rem)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex">
          {/* Forms Section */}
          <div
            className={`absolute h-full w-[50%] flex transition-all duration-700 ease-in-out ${signUpMode ? "left-[55%] " : "left-0"
              }`}
          >
            {/* Sign In Form */}
            {!signUpMode && (
              <form
                onSubmit={handleLogin}
                className="w-full flex flex-col justify-center mr-5 items-center transition-all duration-700 ease-in-out"
              >
                <div className="flex items-center gap-1 justify-center mb-2">
                  <div className="flex text-2xl items-center mb-2">🔗</div>
                  <h4 className="text-lg text-2xl font-semibold -mt-1 text-[#151111]">LinkSaver</h4>
                </div>

                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-semibold text-[#151111]">Welcome Back</h2>
                  <h6 className="text-gray-500 text-sm inline">Not registered yet? </h6>
                  <button
                    type="button"
                    onClick={() => setSignUpMode(true)}
                    className="text-[#151111] hover:text-[#8371fd] text-sm font-medium"
                  >
                    Sign up
                  </button>
                </div>

                <div className="w-3/4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-xl text-black border border-gray-300 w-full px-4 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-gray-800 shadow-sm transition"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="rounded-xl text-black border border-gray-300 w-full px-4 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-gray-800 shadow-sm transition"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold shadow hover:bg-gray-800 transition duration-300 ease-in-out hover:scale-105 focus:ring-2 focus:ring-gray-300"
                  >
                    Login
                  </button>
                  {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                </div>
              </form>
            )}

            {/* Sign Up Form */}
            {signUpMode && (
              <form
                onSubmit={handleSignup}
                className="w-full flex flex-col justify-center mr-4 items-center transition-all duration-700 ease-in-out"
              >
                 <div className="flex items-center gap-1 justify-center mb-2">
                  <div className="flex text-2xl items-center mb-2">🔗</div>
                  <h4 className="text-lg text-2xl font-semibold -mt-1 text-[#151111]">LinkSaver</h4>
                </div>

                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-semibold text-[#151111]">Get Started</h2>
                  <h6 className="text-gray-500 text-sm inline">Already have an account? </h6>
                  <button
                    type="button"
                    onClick={() => setSignUpMode(false)}
                    className="text-[#151111] text-bold hover:text-[#8371fd] text-sm font-medium"
                  >
                    Sign in
                  </button>
                </div>

                <div className="w-3/4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="rounded-xl text-black border border-gray-300 w-full px-4 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm transition"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-xl text-black border border-gray-300 w-full px-4 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm transition"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="rounded-xl text-black border border-gray-300 w-full px-4 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm transition"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold shadow hover:bg-gray-800 transition duration-300 ease-in-out hover:scale-105 focus:ring-2 focus:ring-gray-300"
                  >
                    Sign Up
                  </button>
                  {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                </div>
              </form>
            )}
          </div>

          {/* Greeting Text Section */}
          <div
            className={`absolute h-full w-[50%] bg-gradient-to-r from-[#e5e5ea] to-orange hover:text-white-900 rounded-[2rem] flex flex-col justify-center items-center px-10 text-center transition-all duration-700 ease-in-out ${signUpMode ? "left-0 bg-gradient-to-r from-orange to-[#e5e5ea]" : "left-[45%] bg-gradient-to-r from-[#e5e5ea] to-orange"
              }`}
          >
            <div className="transition-all duration-700">
              <h2 className="text-2xl font-semibold text-[#151111] mb-4">
                {signUpMode ? "Hello, Friend!":"Welcome Back!"} 
              </h2>
              <p className="text-[#333] max-w-[300px] text-sm leading-relaxed">
                Join thousands of users who organize their online world with ease.
                Sign up now to simplify your browsing life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}