import { useState, useEffect } from "react";
import Logo from "../../images/logo/logo.svg";
import { Link } from "react-router-dom";
import QrButton from "./QrButton"; // Import the QRScanner component
import NavList from "./NavList";

function Navbar() {
  const [spin, setSpin] = useState(false);
  const [sticky, setSticky] = useState(false);
 
  const [isSignedIn, setIsSignedIn] = useState(false); 

  useEffect(() => {
    // Check if user token is stored in localStorage
    const userToken = localStorage.getItem("token") ||localStorage.getItem  ("authorization");
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

 

  return (
    <>
      <nav
        className={`user-navbar max-h-24 flex flex-row bg-black items-center justify-between py-8 px-12  fixed top-0 left-0 right-0 w-full z-50 ${
          sticky ? "shadow-xl !bg-black" : ""
        }`}
      >
        <Link to="/">
          <img src={Logo} alt="logo_img" onClick={goTop} className="w-[170px] h-auto " />
        </Link>
        <div className="navlist-nav">
          <NavList />
        </div>
        {isSignedIn && (
  <div>
    <button className="text-white navlist-profile">Profile</button>
  </div>
)}
         <div className="border-[rgb(255,255,255,0.3)]  border-solid border-2 p-2 rounded-md ">
            {isSignedIn ? (
              <QrButton />
            ) : (
              <Link
                onClick={goTop}
                to={"/signin"}
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
      </nav>
    </>
  );
}

export default Navbar;
