interface TestimonialCardProps {
  testimonial: {
    // img: string;
    // name: string;
    content: string;
  };
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
}) => {
  return (
    <div className="bg-white dark:bg-[#0b1727] shadow-2xl h-full p-6 xl:p-10">
      <div className="flex items-center mb-6">
        <div className="mr-3">
          <img
            src={"https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg"}
            // alt={testimonial.name}
            className="max-w-full h-auto rounded-full border"
            width="65"
          />
        </div>
        <div>
          <h4 className="text-xl font-medium">{"MUKUL"}</h4>
        </div>
      </div>
      <p className="opacity-75 mb-2">{testimonial.content}</p>
    </div>
  );
};
