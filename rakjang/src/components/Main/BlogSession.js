import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import { format } from "date-fns";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

// AWS
import { S3Image } from "aws-amplify-react";

// API
import { fetchBlogs } from "../../api/blog";
import { getPathUrl } from "../../function/functions";

const BlogCard = ({ img = "", title = "", date = "", text = "", _id }) => {
  const router = useRouter();

  const onRouteBlogDetail = () => {
    router.push(`/Blog/${_id}`);
  };

  return (
    <div
      onClick={onRouteBlogDetail}
      className="bg-greenblog rounded-lg cursor-pointer w-80  overflow-hidden  flex-shrink-0  "
    >
      <img
        className=" h-40 object-cover xl:mx-auto w-full"
        src={getPathUrl(img)}
      />
      <div className="p-4 bg-bg-blog rounded-t-none  ">
        <div className="text-xl mb-1">{title}</div>
        <div className="text-xs text-textdarkgray mb-2">{date}</div>
        <div className="text-sm text-textdarkgray mb-4 line-clamp-2  ">
          {text}
        </div>
        <div className=" bg-bgbuttongreen text-white py-1 px-4 rounded-3xl text-sm  flex justify-center items-center cursor-pointer w-5/12 ">
          Read More...
        </div>
      </div>
    </div>
  );
};

const BlogSession = () => {
  const { data, isLoading, error } = useQuery("blogs", fetchBlogs());

  return (
    <div>
      <div className=" bg-white px-4 md:px-8 lg:px-16 pb-10">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold md:text-2xl mb-8  textlinear   pt-10 mr-0 ">
            Blog
          </div>

          <Link href="/Blog">
            <div className="flex  items-center font-light   text-textgray ">
              <h2
                className="  cursor-pointer hover:underline "
                // onClick={() => routeAll(name)}
              >
                View All
              </h2>

              <svg
                className="h-4 w-4 ml-2"
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
        <div className=" ">
          {isLoading ? (
            <div>
              {new Array(4).fill(null).map((_, index) => {
                return (
                  <div
                    key={index}
                    className=" flex-shrink-0 w-full h-full rounded-lg overflow-hidden"
                  >
                    <div className="bg-greenblog rounded-lg h-full  ">
                      <Skeleton width={"100%"} className="h-48" />
                      <div className="flex overflow-x-scroll  space-x-4 pb-6">
                        <Skeleton width={"40%"} height={20} />
                        <Skeleton width={"60%"} height={20} />
                        <Skeleton width={"100%"} height={20} />
                        <Skeleton width={"100%"} height={20} />
                        <Skeleton width={"35%"} height={20} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className=" flex overflow-x-scroll  space-x-4 pb-6 ">
              {data?.blogs?.slice(0, 4)?.map((blog, index) => {
                return (
                  <div key={index} className=" flex-shrink-0   ">
                    <BlogCard
                      key={index}
                      _id={blog?._id}
                      img={blog?.image}
                      title={blog?.title}
                      date={format(new Date(blog?.createdAt), "dd-MM-yyyy")}
                      text={blog?.description}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BlogSession;
