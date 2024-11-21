import React, { useEffect, useState } from "react";
import { SiAgora } from "react-icons/si";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from '../store/auth.js';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${userId}`);
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

  const handleLogOut = () =>{
    dispatch(authActions.logout)
    localStorage.removeItem("id");
    localStorage.removeItem("token")
    window.location.reload();
  }

  return (
    <div className="flex flex-col p-4 justify-center items-center text-[#3bf8eb] mb-2">
      <div className="flex items-center gap-2">
        <SiAgora className="text-6xl" />
        <div className="flex flex-col text-center">
          <h1 className="text-3xl font-sans">AGORA</h1>
          <h2 className="text-lg font-mono text-[#C5C6C7]">Your Voice, Amplified.</h2>
        </div>
      </div>
      <hr className="w-2/3 border-t-2 border-[#3bf8eb] my-4" />
      {isLoggedIn && userDetails ? (
        <div className="flex flex-row justify-center items-center gap-3">
          <div className="text-4xl">
            <FaCircleUser />
          </div>
          <div className="flex flex-col text-white">
            <h1 className="text-xl font-mono font-bold">{userDetails.name}</h1>
            <h2 className="text-sm font-mono text-[#C5C6C7] md:text-sm">
              {userDetails.email}
            </h2>
          </div>
        </div>
      ) : (
        <div className="my-2 p-3">
          <Link to={"/login"}>
          <button className="bg-zinc-800 border-2 p-4 rounded-xl hover:bg-zinc-900 transition-transform hover:translate-x-1 hover:translate-y-1 duration-200">
             Login/SignUp
          </button>
          </Link>
        </div>
      )}

      <div className="min-h-1/2">

      </div>



      {isLoggedIn && userDetails && <div className="transition-transform hover:translate-x-1 hover:translate-y-1 duration-200 cursor-pointer text-4xl" onClick={handleLogOut}>
          LogOut
      </div>}
    </div>
  );
};

export default Navbar;