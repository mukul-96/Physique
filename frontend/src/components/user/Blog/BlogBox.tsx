import { Link } from "react-router-dom";

// Define prop types for the BlogBox component
interface BlogBoxProps {
  date: string;
  title: string;
  description: string;
}

function BlogBox({ date, title, description }: BlogBoxProps) {
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  return (
    <>
      <div className="w-[370px] min540:w-[100%] shadow-xl flex flex-col px-[30px] py-[50px]">
        {/* date */}
        <p className="text-[15px] font-bold text-[#323232] border-[#323232] border-solid rounded-full border-[1px] w-fit px-5 py-2 mb-6">
          {date}
        </p>
        {/* title */}
        <h3 className="text-[22px] font-bold py-5">{title}</h3>
        {/* desc */}
        <p className="text-[15px] text-[#646464] font-medium">{description}</p>
        {/* blog cta */}
        <Link
          to="/blog"
          onClick={goTop}
          className="text-[15px] uppercase font-bold mt-10 w-[160px] h-[50px] bg-[#FF0336] text-white text-center pt-[14px]"
        >
          Read more &nbsp; <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </>
  );
}

export default BlogBox;
