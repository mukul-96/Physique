import { useState } from "react";

interface AccordionProps {
  header: React.ReactNode;
  body: React.ReactNode;
}

const Accordion = ({ header, body }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="mt-1 border rounded shadow"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="w-full py-2 px-4 bg-white hover:bg-green-50 rounded-t flex items-center justify-between"
      >
        <span className="flex flex-row items-center gap-4 w-full h-full">{header}</span>
        <span
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'} p-2`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50">
          {body}
        </div>
      )}
    </div>
  );
};

export default Accordion;
