import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaInfoCircle } from "react-icons/fa";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import ThemeToggle from "../components/common/ThemeToggle";

const Homepage = () => {
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuth = () => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
          const user = JSON.parse(userInfo);
          if (user && user.token && user._id) {
            navigate("/chats", { replace: true });
            return;
          } else {
            localStorage.removeItem("userInfo");
          }
        }
      } catch (error) {
        console.error("Error parsing user info:", error);
        localStorage.removeItem("userInfo");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAuth();
  }, [navigate]);

  const handleAboutClick = () => {
    window.open(
      "https://drive.google.com/file/d/1Oo0YFwvREpHYtWBDrDpY1uWQlT6-gVcg/view?usp=sharing",
      "_blank"
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-white to-purple-300 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300 font-medium">Initializing Zingle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-indigo-400 via-white to-purple-300 dark:from-gray-900 dark:to-gray-900 relative transition-all">
      {/* Header Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <button
          onClick={handleAboutClick}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md transition-all duration-300 text-sm"
        >
          <FaInfoCircle className="w-4 h-4" />
          About
        </button>
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white drop-shadow-xl">
          Zingle
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-md mx-auto font-medium">
          Instant messaging. Zero friction. Total connection.
        </p>
      </div>

      {/* Glass Auth Card */}
      <div className="w-full max-w-lg bg-white/60 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-8 transition-all duration-300">
        {/* Toggle Tabs */}
        <div className="flex bg-gray-200 dark:bg-gray-700 rounded-full p-1 mb-8 shadow-inner">
          <button
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
              tab === 0
                ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-300 shadow"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setTab(0)}
          >
            <div className="flex items-center justify-center gap-2">
              <FaSignInAlt />
              Login
            </div>
          </button>
          <button
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
              tab === 1
                ? "bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-300 shadow"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setTab(1)}
          >
            <div className="flex items-center justify-center gap-2">
              <FaUserPlus />
              Sign Up
            </div>
          </button>
        </div>

        {/* Form Display */}
        <div className="mt-2 animate-fade-in">
          {tab === 0 ? <Login /> : <Signup />}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-sm text-gray-600 dark:text-gray-400 text-center">
        <p>
          ✨ Built with passion by <span className="font-semibold">Rinku Sisodiya</span>
        </p>
      </footer>
    </div>
  );
};

export default Homepage;
