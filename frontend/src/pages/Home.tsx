import About from "../components/user/About/About";
import BmiCalc from "../components/user/BmiCalc";
import Blog from "../components/user/Blog/Blog";
import ChooseUs from "../components/user/ChooseUs";
import CtaBanner from "../components/user/CtaBanner";
import Footer from "../components/user/Footer";
import Navbar from "../components/user/Navbar";
import Hero from "../components/user/Hero";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface MyJwtPayload {
  id: string;
}
function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token") || localStorage.getItem("authorization");
    if (userToken) {
      setIsSignedIn(true);

      try {
        const decoded = jwtDecode<MyJwtPayload>(userToken)        
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      navigate(`/user/${userId}`);
    }
  }, [isSignedIn, navigate,userId]);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <ChooseUs />
      <BmiCalc />
      <Blog />
      <CtaBanner />
      <Footer />
    </>
  );
}

export default Home;
