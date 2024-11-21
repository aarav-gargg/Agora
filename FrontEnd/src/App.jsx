import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CiMenuFries } from "react-icons/ci";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { SiAgora } from "react-icons/si";

function AppLayout() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1024);
  const location = useLocation();

  // Function to check screen width and update state
  const handleResize = () => setIsMobileView(window.innerWidth <= 1024);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hideNavbar = ["/login", "/signup"].some((path) =>
    location.pathname.includes(path)
  );

  const closeNavbar = () => setIsNavbarOpen(false);

  if (hideNavbar) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#1e415c] to-[#0B0C10] text-white">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {(isMobileView || isNavbarOpen) && (
        <div className="flex lg:hidden justify-between items-center bg-gradient-to-r from-[#1e415c] to-[#0B0C10] text-white p-4">
          <h1 className="font-extrabold text-2xl flex items-center">
            <SiAgora className="mr-2" /> Agora
          </h1>
          <button
            className="text-3xl focus:outline-none"
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            aria-label="Toggle navigation menu"
          >
            <CiMenuFries />
          </button>
        </div>
      )}
      {isNavbarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeNavbar}
        ></div>
      )}
      <div
        className={`fixed lg:static top-0 left-0 w-2/3 lg:w-3/12 bg-gradient-to-r from-[#1a3143] to-[#0B0C10] text-white min-h-screen z-50 transition-transform duration-300 ease-in-out ${
          isNavbarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <Navbar />
      </div>
      <div
        className={`flex-1 bg-gradient-to-r from-[#1e415c] to-[#0B0C10] text-white min-h-screen ${
          isNavbarOpen ? "overflow-hidden" : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
