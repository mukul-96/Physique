import TitleRed from "../images/who-we-are/title-bg.svg";
import Trainer3 from "../images/trainers/trainer1.png"; // Import Trainer3 image
import TrainerBg from "../images/trainers/trainer-bg.png";
import Shape from "../images/trainers/shape.png";
import { useState } from "react";

// Define a TypeScript interface for Trainer
interface Trainer {
  img?: string; // Optional image path
  name: string;
  description?: string;
}

// Define props interface for Trainers component
interface TrainersProps {
  trainers: Trainer[]; // Array of Trainer objects
}

function Trainers({ trainers }: TrainersProps) {
  const [imgHover, setImgHover] = useState(false);

  const hoverBox = () => {
    setImgHover(true);
  };

  const hoverBoxRemove = () => {
    setImgHover(false);
  };

  return (
    <div className="container mx-auto px-4 py-[12rem]">
      {/* Title div */}
      <div className="flex flex-col items-center text-center relative">
        <p className="text-white relative z-10 text-[16px] uppercase font-bold mb-10">
          gym trainers
        </p>
        <img src={TitleRed} alt="text_bg" className="w-[21rem] absolute -top-[6px]" />
        <h2 className="text-[3.4rem] font-bold mb-4">Team Of Expert Coaches</h2>
        <p className="text-[#646464] font-medium text-[15px]">
          Expert team of coaches helps you succeed in any goal,
          <br /> personalized guidance and motivation provided!
        </p>
      </div>

      {/* Trainers div */}
      <div className="flex flex-wrap justify-center gap-[5rem] mt-20">
        {trainers.map((trainer, id) => (
          <div
            onMouseEnter={hoverBox}
            onMouseLeave={hoverBoxRemove}
            key={id}
            className="relative cursor-pointer w-[35rem] sm:w-[18rem] xs:w-full flex flex-col select-none"
          >
            {/* trainer img */}
            <img
              src={trainer.img ? trainer.img : Trainer3}
              alt="trainer"
              style={{ transition: "all 0.3s" }}
              className={`w-[16rem] z-10 relative grayscale mx-auto ${imgHover ? "hover:grayscale-0" : ""}`}
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
              <img alt="shape" src={Shape} className="absolute -top-[25px] left-[60px]" />
              <h3 className="font-bold text-[2rem] ">{trainer.name}</h3>
              <h5 className="font-semibold">{trainer.description}</h5>
            </div>
          </div>      
        ))}
      </div>
    </div>
  );
}

export default Trainers;
