import Link from "next/link";
import { useRouter } from "next/router";
import { checkParthName } from "../function/functions";

const Title = ({ name = "", img = "" }) => {
  const router = useRouter();
  // const routeAll = (name) => {
  //   router.push({
  //     pathname: "/blogs/",
  //     query: {
  //       name: name,
  //     },
  //   });
  // };
  return (
    <div className="   ">
      <div className="flex justify-between items-center ">
        <div className="flex items-center">
          <div className="text-xl md:text-2xl mb-8 text-gray-700  font-Times pt-10 mr-0 ">
            {name}
          </div>
          <div>
            <img className="h-8 w-auto " src={img} alt="" />
          </div>
        </div>
        <div className="flex  items-center md md:text-lg lg:text-lg text-gray-500 ">
          <Link href={`${checkParthName(name)}`}>
            <h2 className="  cursor-pointer font-Times">View All</h2>
          </Link>
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
      </div>
    </div>
  );
};
export default Title;
