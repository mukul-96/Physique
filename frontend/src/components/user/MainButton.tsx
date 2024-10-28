import { Link } from "react-router-dom";

interface MainButtonProps {
  color?: string;
  bg?: string;
  cN?: string;
  arrowColor?: string;
  hover?: string;
  text: string;
  goTo: string;
}

function MainButton({ color, bg, cN, arrowColor, hover, text, goTo }: MainButtonProps) {
  const goTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <Link
      onClick={goTop}
      to={goTo}
      className={`text-[15px] ${color} ${bg} ${cN} text-center pt-[18px] font-[600] w-[200px] h-[55px] uppercase hero-cta relative ml-2 ${hover}`}
    >
      {text} &nbsp;
      <i className={`fa-solid fa-arrow-right text-[#FF0336] ${arrowColor}`}></i>
    </Link>
  );
}

export default MainButton;
