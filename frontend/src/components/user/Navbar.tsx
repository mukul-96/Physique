import { useState, useEffect } from "react";
import Logo from "../../images/logo/logo.svg";
import NavList from "./NavList";
import { Link } from "react-router-dom";
import QrButton from "./QrButton"; // Import the QRScanner component

function Navbar() {
  const [spin, setSpin] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [sidebar, setSideBar] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); // Track user signed-in status

  useEffect(() => {
    // Check if user token is stored in localStorage
    const userToken = localStorage.getItem("token");
    setIsSignedIn(!!userToken); // Set isSignedIn to true if token exists
  }, []);

  const joinSpin = () => {
    setSpin(true);
  };

  const stopSpin = () => {
    setSpin(false);
  };

  // sticky navbar - bg black
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  // logo
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // sidebar
  const sideBar = () => {
    setSideBar(!sidebar);
  };

  // hamburger menu
  const hamburgerMenu = () => {
    setHamburger(!hamburger);
  };

  return (
    <>
      <nav
        className={`flex flex-row bg-transparent items-center justify-between py-8 px-12  fixed top-0 left-0 right-0 w-full z-50 ${
          sticky ? "shadow-xl !bg-black" : ""
        }`}
      >
        <Link to="/">
          <img src={Logo} alt="logo_img" onClick={goTop} className="w-full h-auto" />
        </Link>
        <div className="navlist-nav">
          <NavList />
        </div>
        <div className="flex items-center gap-10">
          <div className="flex gap-10">
            {/* mobile menu -------------- */}
            {/* hamburger menu */}
            {/* sidebar */}
            {/* hamburger */}
            <i
              onClick={hamburgerMenu}
              className="fa-bars fa-solid hidden text-white text-4xl cursor-pointer hover:text-[#FF0336] ease-in duration-200"
            ></i>
            {/* account */}
            <Link onClick={goTop} to="/signup" title="signup_button">
              <i className="fa-regular fa-user  text-white text-4xl cursor-pointer hover:text-[#FF0336] ease-in duration-200"></i>
            </Link>
            {/* sidebar */}
            <i
              onClick={sideBar}
              className="fa-regular fa-chart-bar text-white text-4xl cursor-pointer hover:text-[#FF0336] ease-in duration-200"
            ></i>
          </div>
          {/* Conditional rendering based on user sign-in status */}
          <div className="border-[rgb(255,255,255,0.3)] border-solid border-2 p-2 rounded-md min620:hidden">
            {isSignedIn ? (
              <QrButton /> // Show QRScanner component if signed in
            ) : (
              <Link
                onClick={goTop}
                to={"/contact"}
                onMouseEnter={joinSpin}
                onMouseLeave={stopSpin}
                className="flex items-center "
              >
                <i
                  className={`fa-solid fa-plus bg-[#FF0336] text-white text-2xl py-3 px-4 rounded-md ${
                    spin ? "nav-btn-hover" : ""
                  }`}
                ></i>
                <h3 className="text-white text-[14px] font-bold uppercase ml-4 mr-8 tracking-wider">
                  join now
                </h3>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
