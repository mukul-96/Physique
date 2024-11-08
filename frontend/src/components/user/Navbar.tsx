import { useState, useEffect } from "react";
import Logo from "../../images/logo/logo.svg";
import { Link } from "react-router-dom";
import QrButton from "./QrButton"; 
import { useParams } from "react-router-dom";
import NavList from "./NavList";

function Navbar() {
  const [spin, setSpin] = useState(false);
  const [sticky, setSticky] = useState(false);
  const {id}=useParams();
 
  const [isSignedIn, setIsSignedIn] = useState(false); 

  useEffect(() => {
    const userToken = localStorage.getItem("token") ||localStorage.getItem  ("authorization");
    setIsSignedIn(!!userToken); 
  }, []);

  const joinSpin = () => {
    setSpin(true);
  };

  const stopSpin = () => {
    setSpin(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

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
        <Link to="/" className="navbar-logo">
          <img src={Logo} alt="logo_img" onClick={goTop} className="w-[170px] h-auto " />
        </Link>
        <div className="navlist-nav">
          <NavList />
        </div>
        {isSignedIn && (
  <Link
    onClick={goTop}
    to={`/user/${id}/profile`}
    className="rounded-full border-2 border-white flex justify-center w-[3.125em] h-[3.125em] items-center bg-red-600 relative group hover:bg-red-700"
  >
    <svg
      viewBox="0 0 24 24"
      fill="white"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"
      ></path>
    </svg>
    <span className=" flex justify-center items-center absolute bottom-[-2em] left-1/2 transform -translate-x-1/2 translate-y-full w-max  rounded text-white bg-gray-800 font-semibold  text-sm py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      Your<br/> Profile
    </span>
  </Link>
)}

<div className="w-[3.125em] h-[3.125em] group relative">
 
    <Link onClick={goTop} to={`/user/${id}/branches`}>
      <svg
        fill="#ffffff"
        viewBox="-0.23 0 16 16"
        id="branch-16px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Path_194"
          data-name="Path 194"
          d="M-12.5-96h-7A1.5,1.5,0,0,0-21-94.5v3a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5v-3a.5.5,0,0,1,.5-.5h7a.5.5,0,0,1,.5.5V-81h-2v-3.5a.5.5,0,0,0-.5-.5h-3a.5.5,0,0,0-.5.5V-81h-1.5a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5H-11V-94.5A1.5,1.5,0,0,0-12.5-96ZM-17-81v-3h2v3Zm0-10h-2v-2h2Zm4,0h-2v-2h2Zm-2,2h2v2h-2Zm-3.755,2H-17v-2h-2v1.526a4.023,4.023,0,0,0-.646-.88,4.042,4.042,0,0,0-5.708,0,4.042,4.042,0,0,0,0,5.708l2.5,2.5A.5.5,0,0,0-22.5-80a.5.5,0,0,0,.354-.146l2.5-2.5A4.041,4.041,0,0,0-18.755-87ZM-22.5-81.207l-2.146-2.147a3.037,3.037,0,0,1,0-4.292,3.024,3.024,0,0,1,2.146-.888,3.024,3.024,0,0,1,2.146.888,3.037,3.037,0,0,1,0,4.292ZM-21-85.5A1.5,1.5,0,0,1-22.5-84,1.5,1.5,0,0,1-24-85.5,1.5,1.5,0,0,1-22.5-87,1.5,1.5,0,0,1-21-85.5Z"
          transform="translate(26.534 96)"
        ></path>
      </svg>
      
      <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-max rounded text-white bg-gray-800 font-semibold text-sm py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Our<br /> Branches
      </span>
    </Link>
</div>

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
