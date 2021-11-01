import Link from "next/link";

const Header = ({ title, herf }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-xl md:text-3xl mb-8 textlinear  font-semibold  pt-10 mr-0 ">
        {title}
      </div>
      <Link href={herf}>
        <div className="flex  items-center md md:text-lg lg:text-lg  text-textlightgray ">
          <h2 className="  cursor-pointer font-semibold hover:underline">View All</h2>

          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
};
export default Header;
