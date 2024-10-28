import React, { useState } from "react";
import { TestimonialCard } from "./TestimonialCard";

interface Feedback {
  content: string;
  
}

interface TestimonialSectionProps {
  reviews: Feedback[]; 
}

function ShapeOne() {
  return (
    <svg
      className="absolute bottom-0 left-0 -z-[1]"
      width="404"
      height="572"
      viewBox="0 0 404 572"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="118"
        cy="286"
        r="265.5"
        stroke="#4175DF"
        strokeOpacity="0.2"
        strokeWidth="41"
      />
    </svg>
  );
}

function ShapeTwo() {
  return (
    <svg
      className="absolute top-0 right-0 -z-[1]"
      width="269"
      height="479"
      viewBox="0 0 269 479"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="239.5"
        cy="239.5"
        r="239.5"
        fill="#4175DF"
        fillOpacity="0.3"
      />
    </svg>
  );
}

export const Testimonial: React.FC<TestimonialSectionProps> = ({
  reviews,
}) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: number) => setIndex(selectedIndex);

  return (
    <section className="ezy__testimonial23 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white relative z-[1] ">
      <ShapeOne />
      <ShapeTwo />

      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-12 gap-6 items-center justify-between mb-6 md:mb-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <h2 className="text-[32px] font-bold leading-normal">
              What Our Client Say.
            </h2>
          </div>
         
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-3 gap-6">
            {reviews.map((testimonial, i) => (
              <div className="col-span-3 lg:col-span-1" key={i}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 m-0 mt-12">
            {reviews.map((_, i) => (
              <button
                className={`w-2 h-2 rounded-full ${
                  index === i
                    ? "scale-125 bg-blue-600"
                    : " bg-gray-400 dark:bg-slate-800"
                } `}
                key={i}
                onClick={() => handleSelect(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
