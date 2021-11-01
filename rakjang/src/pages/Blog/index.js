import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import { format } from "date-fns";
import { useRouter } from "next/router";
import Link from "next/link";

// AWS
import { S3Image } from "aws-amplify-react";
import { Storage } from "aws-amplify";

// API
import { fetchBlogs } from "../../api/blog";
import BlogCard from "../../components/Card/BlogCard";
import Breadcrumb from "../../components/Attribute/BreadCrumb";

const Blog = () => {
  const { data, isLoading, error } = useQuery("blogs", fetchBlogs());

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10">
      <Breadcrumb first={"Blog"} />
      <div className="flex justify-center items-center flex-col">
        <div className="text-3xl text-center  text-textdarkgreen font-bold">
          Welcome to Rakjang farm{" "}
        </div>
        <div className="xl:w-2/3 text-center mt-4 text-textgray">
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit..."
          <div>
            "There is no one who loves pain itself, who seeks after it and wants
            to have it, simply because it is pain..."
          </div>
        </div>
        <div className="grid grid-cols-1  gap-10 mt-10  ">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data?.blogs?.map((blog, index) => (
              <BlogCard
                key={blog._id}
                _id={blog._id}
                img={blog.image}
                title={blog.title}
                date={format(new Date(blog.createdAt), "dd-MM-yyyy")}
                text={blog.description}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Blog;
