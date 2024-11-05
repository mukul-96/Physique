import TitleRed from "../images/who-we-are/title-bg.svg";
import Trainer3 from "../images/trainers/trainer1.png"; 
import TrainerBg from "../images/trainers/trainer-bg.png";
import Shape from "../images/trainers/shape.png";
import { useState } from "react";

interface Trainer {
  img?: string; 
  name: string;
  description?: string;
}

interface TrainersProps {
  trainers: Trainer[]; 
}

function Trainers({ trainers }: TrainersProps) {
  const [imgHover, setImgHover] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const hoverBox = () => {
    setImgHover(true);
  };

  const hoverBoxRemove = () => {
    setImgHover(false);
  };

  const trainersPerSlide = window.innerWidth < 640 ? 1 : 3; 
  const totalSlides = Math.ceil(trainers.length / trainersPerSlide);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  return (
    <div className="container mx-auto px-4 py-[12rem] relative">
      {/* Title div */}
      <div className="flex flex-col items-center text-center relative">
        <p className="text-white relative z-10 text-[16px] uppercase font-bold mb-10">
          gym trainers
        </p>
        <img src={TitleRed} alt="text_bg" className="w-[21rem] absolute -top-[6px]" />
        <h2 className="text-[2rem] md:text-[3.4rem] font-bold mb-4">Team Of Expert Coaches</h2>
        <p className="text-[#646464] font-medium text-[14px] md:text-[15px]">
          Expert team of coaches helps you succeed in any goal,
          <br /> personalized guidance and motivation provided!
        </p>
      </div>

      {/* Trainers Carousel */}
      <div className="flex justify-center gap-[2rem] md:gap-[5rem] mt-20 relative">
        <button
          onClick={handlePrevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full hover:bg-gray-300 focus:outline-none z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {trainers
          .slice(currentSlide * trainersPerSlide, (currentSlide + 1) * trainersPerSlide)
          .map((trainer, id) => (
            <div
              onMouseEnter={hoverBox}
              onMouseLeave={hoverBoxRemove}
              key={id}
              className="relative cursor-pointer w-[20rem] md:w-[18rem] lg:w-[35rem] flex flex-col select-none"
            >
              {/* trainer img */}
              <img
                src={trainer.img ? trainer.img : Trainer3}
                alt="trainer"
                style={{ transition: "all 0.3s" }}
                className={`w-[12rem] md:w-[14rem] lg:w-[16rem] z-10 relative grayscale mx-auto ${imgHover ? "hover:grayscale-0" : ""}`}
              />
              {/* trainer bg */}
              <img
                style={{ transition: "all 0.3s" }}
                src={TrainerBg}
                alt="trainer_background"
                className="absolute top-[4px] w-full scale-[1.3]"
              />
              {/* trainer description */}
              <div className="box-desc bg-white w-full flex justify-center flex-col items-center text-center h-40 shadow-lg z-20 rounded-[6px] px-[10px] py-[20px] absolute -bottom-[31px]">
                <img alt="shape" src={Shape} className="absolute -top-[25px] left-[50%] transform -translate-x-1/2" />
                <h3 className="font-bold text-[1.5rem] md:text-[2rem]">{trainer.name}</h3>
                <h5 className="font-semibold">{trainer.description}</h5>
              </div>
            </div>
          ))}

        <button
          onClick={handleNextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full hover:bg-gray-300 focus:outline-none z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Trainers;
