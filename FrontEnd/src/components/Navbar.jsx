import React, { useEffect, useState } from "react";
import { SiAgora } from "react-icons/si";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth.js";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://agora-1-dafa.onrender.com/user/${userId}`);
        if (response.status === 200) {
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error("Error during fetching user details:", error);
        if (error.response) {
          alert(error.response.data.message || "An error occurred during fetching.");
        } else if (error.request) {
          alert("No response from server. Please try again later.");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  useEffect(() => {
    if (isLoggedIn) {
      const storedId = localStorage.getItem("id");
      setUserId(storedId);
    } else {
      setUserId(null);
      setUserDetails(null);
    }
  }, [isLoggedIn]);

  const handleLogOut = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/")
  };

  const handleProtectedRoute = (route) => {
    if (isLoggedIn) {
      navigate(route);
    } else {
      alert("You must log in to access this page.");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col p-6 justify-center items-center text-[#3bf8eb] bg-gradient-to-b from-[#1e1e2f] to-[#111121] shadow-lg min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <SiAgora className="text-7xl text-[#3bf8eb]" />
        <div className="flex flex-col text-center">
          <Link to={"/"}>
          <h1 className="text-4xl font-bold font-sans text-white">AGORA</h1>
          <h2 className="text-lg font-mono text-[#C5C6C7]">
            Your Voice, Amplified.
          </h2>
          </Link>
        </div>
      </div>

      <hr className="w-3/4 border-t-2 border-[#3bf8eb] my-4" />

      {isLoggedIn && userDetails ? (
        <div className="flex flex-row justify-center items-center gap-4 my-4">
          <FaCircleUser className="text-5xl text-white" />
          <div className="flex flex-col text-white">
            <h1 className="text-xl font-bold font-mono">{userDetails.name}</h1>
            <h2 className="text-sm font-mono text-[#C5C6C7]">
              {userDetails.email}
            </h2>
          </div>
        </div>
      ) : (
        <div className="my-4">
          <Link to={"/login"}>
            <button className="bg-[#3bf8eb] text-black text-lg font-bold px-6 py-3 rounded-full shadow-lg hover:bg-[#2be7d9] transition-transform hover:scale-105">
              Login/SignUp
            </button>
          </Link>
        </div>
      )}

      <div className="my-4 w-full flex flex-col items-center space-y-6">

      <Link to={"/"} className="text-xl text-[#2ecc71] font-semibold transition-all ease-in-out duration-300 hover:translate-x-1 hover:translate-y-1 hover:text-[#00b894] cursor-pointer">
          Home
        </Link>
        <div
          onClick={() => handleProtectedRoute(`/${userId}/blogs`)}
          className="text-xl text-[#2ecc71] font-semibold transition-all ease-in-out duration-300 hover:translate-x-1 hover:translate-y-1 hover:text-[#00b894] cursor-pointer"
        >
          Your Blogs
        </div>
        <div
          onClick={() => handleProtectedRoute("/create-blog")}
          className="text-xl text-[#2ecc71] font-semibold transition-all ease-in-out duration-300 hover:translate-x-1 hover:translate-y-1 hover:text-[#00b894] cursor-pointer"
        >
          Create Blog
        </div>
        <Link to={"/about"} className="text-xl text-[#2ecc71] font-semibold transition-all ease-in-out duration-300 hover:translate-x-1 hover:translate-y-1 hover:text-[#00b894] cursor-pointer">
          About
        </Link>
        <Link to={"/view-blogs"} className="text-xl text-[#2ecc71] font-semibold transition-all ease-in-out duration-300 hover:translate-x-1 hover:translate-y-1 hover:text-[#00b894] cursor-pointer">
          View Blogs
        </Link>
      </div>

      {isLoggedIn && userDetails && (
        <div className="absolute bottom-3 flex justify-center w-full">
          <button
            onClick={handleLogOut}
            className="bg-[#3498db] text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-200"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
