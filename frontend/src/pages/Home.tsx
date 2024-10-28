import About from "../components/user/About/About";
import BmiCalc from "../components/user/BmiCalc";
import Blog from "../components/user/Blog/Blog";
import ChooseUs from "../components/user/ChooseUs";
import CtaBanner from "../components/user/CtaBanner";
import Footer from "../components/user/Footer";
import Navbar from "../components/user/Navbar";
import Hero from "../components/user/Hero";

function Home() {
  return (
    <>
    <Navbar/>
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