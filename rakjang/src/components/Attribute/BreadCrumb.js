import Link from "next/link";

const Breadcrumb = ({ first, secound }) => {
  return (
    <div className=" flex justify-start items-center space-x-2">
      <Link href="/">
        <div className="text-textgray cursor-pointer">Home</div>
      </Link>
      <svg
        className="w-4 h-4 text-textdarkgreen"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
      {secound ? (
        <Link href={`/${first}`}>
          <div className=" text-textgray cursor-pointer">{first}</div>
        </Link>
      ) : (
        <div className=" text-textdarkgreen">{first}</div>
      )}
      {secound && (
        <div className="flex justify-start items-center space-x-2">
          <svg
            className="w-4 h-4 text-textdarkgreen my-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <div className=" text-textdarkgreen">{secound}</div>
        </div>
      )}
    </div>
  );
};
export default Breadcrumb;
