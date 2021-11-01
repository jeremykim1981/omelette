import Link from "next/link"
import { useRouter } from "next/router";

// AWS
import { S3Image } from "aws-amplify-react";
import { getPathUrl } from "../../function/functions";

const BlogCard = ({ img = "", title = "", date = "", text = "", _id }) => {
  const router = useRouter();

  const onRouteBlogDetail = () => {
    router.push(`/Blog/${_id}`);
  };

  return (
    <div
      onClick={onRouteBlogDetail}
      className=" bg-bgblog rounded-lg flex shadow-md  h-60    "
    >
      <div className="w-1/3 h-60">
        <img
          className="rounded-lg object-cover object-center  rounded-r-none h-60"
          src={getPathUrl(img)}
        />
      </div>
      <div className="w-2/3 h-60 p-4 flex justify-between  flex-col">
        <div className="text-2xl mb-1 text-textdarkgreen ">{title}</div>
        <div className="text-sm font-light text-textgray mb-4 line-clamp-4  ">
          {text}
        </div>

        <div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-textgray  font-light">{date}</div>
            <div className=" bg-textdarkgreen text-sm px-2 py-1 text-white rounded-3xl">
              Read More
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
