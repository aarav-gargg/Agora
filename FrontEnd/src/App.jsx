import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CiMenuFries } from "react-icons/ci";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { SiAgora } from "react-icons/si";
import { useDispatch } from "react-redux";
import { authActions } from './store/auth.js';
import CreateBlog from "./components/CreateBlog.jsx";
import EditBlog from "./components/EditBlog.jsx";
import YourBlogs from "./components/YourBlogs.jsx";
import Blogs from "./components/Blogs.jsx";
import BlogById from "./components/BlogById.jsx";
import axios from 'axios'
import About from "./components/About.jsx";


function AppLayout() {
  // Initialize state based on window size
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const location = useLocation();

  const handleResize = () => {
    const isMobile = window.innerWidth < 1024;
    setIsMobileView(isMobile);

    if (!isMobile) {
      setIsNavbarOpen(false);
    }
  };

 
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
    <div className="flex min-h-screen">
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-r from-[#1a3143] to-[#0B0C10] text-white z-50 transition-transform duration-300 ease-in-out ${
          isMobileView ? "w-2/3" : "w-1/4" 
        } ${
          isMobileView && !isNavbarOpen ? "-translate-x-full" : "translate-x-0"
        } lg:translate-x-0`}
      >
        <Navbar />
      </div>

      {isMobileView && isNavbarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeNavbar}
        ></div>
      )}

      <div
        className={`flex-1 ml-0 lg:ml-[25%] bg-gradient-to-r from-[#1e415c] to-[#0B0C10] text-white overflow-y-auto`}
      >
        {isMobileView && (
          <div className="fixed top-0 left-0 w-full z-40 bg-gradient-to-r from-[#1e415c] to-[#0B0C10] text-white p-4 flex justify-between items-center">
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
        <Outlet />
      </div>
    </div>
  );
}



function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(authActions.logout());
        return;
      }

      const response = await axios.post("https://agora-1-dafa.onrender.com/user/verify", {token});

      if (response.status === 200) {
        dispatch(authActions.login());
        return;
      } else if(response.status == 401 || response.status == 400){
        dispatch(authActions.logout());
        localStorage.removeItem("id");
        localStorage.removeItem("token")
        alert("session expired");
        navigate("/login")
      }
      else{
        dispatch(authActions.logout());
        localStorage.removeItem("id");
        localStorage.removeItem("token")
      }
    } catch (error) {
      dispatch(authActions.logout());
      localStorage.removeItem("id");
      localStorage.removeItem("token")
      console.error("Token verification failed:", error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      verifyToken();
    }
    else{

    }
  }, [verifyToken]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog" element={<EditBlog />} />
        <Route path="/:userId/blogs" element={<YourBlogs />} />
        <Route path="/view-blogs" element={<Blogs />} />
        <Route path="/:id/blog" element={<BlogById />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
