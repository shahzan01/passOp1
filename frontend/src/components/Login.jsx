import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connection } from "mongoose";
import { PUBLIC_API_URL } from "../../config";
import { guestCredentials } from "../../config";

const UserAuth = () => {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [message, setMessage] = useState(""); // Feedback message
  const navigate = useNavigate(); // For navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
      try {
        const response = await axios.post(
          `${PUBLIC_API_URL}/api/user/signup`,
          formData
        );
        setLoading(false);
        console.log(response.data);
        setMessage("Signed up successfully! Please login.");
        setFormData({ email: "", password: "" });
        setIsSignUp(false);
      } catch (error) {
        setLoading(false);
        console.error("Signup Error:", error);
        setMessage(error.response?.data?.error || "Signup failed. Try again.");
      }
    } else {
      try {
        const response = await axios.post(
          `${PUBLIC_API_URL}/api/user/login`,
          formData
        );
        setLoading(false);
        const token = response.data.token;
        if (!token) {
          console.error("Signup Error:");
          setMessage("Signup failed. Try again.");
        }
        // Store token in localStorage and set it as a default header
        else {
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          console.log("Logged in");
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        setLoading(false);
        console.error("Login Error:", error);
        setMessage(error.response?.data?.error || "Login failed. Try again.");
      }
    }
  };

  const handleGuestLogin = async () => {
    setFormData(guestCredentials);

    // try {
    //   const response = await axios.post(
    //     `${PUBLIC_API_URL}/api/user/login`,
    //     guestCredentials
    //   );

    //   const token = response.data.token;
    //   if (!token) {
    //     console.error("Signup Error:");
    //     setMessage("Signup failed. Try again.");
    //   }
    //   // Store token in localStorage and set it as a default header
    //   else {
    //     localStorage.setItem("token", token);
    //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    //     navigate("/dashboard");
    //   }
    // } catch (error) {
    //   console.error("Login Error:", error);
    //   setMessage(error.response?.data?.error || "Login failed. Try again.");
    // }
  };

  return loading ? (
    <div className=" w-full h-screen flex  justify-center  items-center">
      {" "}
      <div className=" flex flex-col items-center justify-center">
        <div className="spinner  "></div>
        <div className="    align-middle items-center text-center  py-2 my-2 font-bold text-2xl">
          Loading..
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(142,242,20,.2)_100%)]">
        <div className="max-w-md w-full p-6 bg-white border border-gray-300 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-6">
            {isSignUp ? "Sign Up" : "Login"}
          </h2>
          {message && <p className="mb-4 text-red-500">{message}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? (
                  <img
                    width={26}
                    className="p-1"
                    src="../icons/eye.png"
                    alt="eye"
                  />
                ) : (
                  <img
                    width={26}
                    className="p-1"
                    src="../icons/hidden.png"
                    alt="hidden eye"
                  />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
          <button
            onClick={handleGuestLogin}
            className="p-3 mt-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Guest Login
          </button>
          <p className="mt-6">
            {isSignUp ? "Already have an account?" : "New user?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setMessage("");
              }}
              className="text-blue-600 underline hover:text-blue-800 transition"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserAuth;
