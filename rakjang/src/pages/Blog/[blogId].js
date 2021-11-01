import ImageGallery from "react-image-gallery";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { format } from "date-fns";

// API
import { fetchBlogById, updateView } from "../../api/blog";

// AWS
import { S3Image } from "aws-amplify-react";

// UTILS
import { renderHtml } from "../../utils/rendenHtml";
import { useState, useEffect } from "react";
import SocialShare from "../../components/Attribute/SocialShare";
import Breadcrumb from "../../components/Attribute/BreadCrumb";
import { getPathUrl } from "../../function/functions";

const images = [
  {
    original: "../mock/mock1.jpg",
    thumbnail: "../mock/mock1.jpg",
  },
  {
    original: "../mock/mock2.jpg",
    thumbnail: "../mock/mock2.jpg",
  },
  {
    original: "../mock/mock3.jpg",
    thumbnail: "../mock/mock3.jpg",
  },
  {
    original: "../mock/mock4.jpg",
    thumbnail: "../mock/mock4.jpg",
  },
];

const BlogDetail = ({ blog, error }) => {
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    setCurrentUrl(window?.location?.href);
  }, []);
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 py-10">
      <div className="flex justify-start items-center mt-4">
        <Breadcrumb first={"Blog"} secound={blog?.title} />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10">
        <div className="text-3xl text-center md:text-left  textlinear font-bold ">
          {blog.title}
        </div>
        <div className="text-textgray flex justify-center  items-center  mt-4 md:mt-0">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <div className="ml-2">{blog.views}</div>
          <SocialShare shareUrl={currentUrl} />
        </div>
      </div>
      <div className="flex justify-between  items-center text-textgray font-light mt-2">
        <div>{format(new Date(blog.createdAt), "dd-MM-yyyy")}</div>
        <div>Mr. Rakjang Farm</div>
      </div>
      <div className="mt-10 text-textgraysec space-y-6">
        <div>
          <img className="md:w-2/3 mx-auto" src={getPathUrl(blog.image)} />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: renderHtml(blog.content),
          }}
        />
        {/* <div className="text-xl">Cannabis indica</div>
        <div className="md:w-2/3 text-center mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          dapibus sagittis nisl, interdum lacinia nunc placerat sed. Phasellus
          at luctus nisl. Maecenas eros eros, ullamcorper vitae lacinia blandit,
          efficitur vel eros. Nulla eget ipsum nec enim cursus interdum nec
          tempus risus. Praesent lobortis urna sit amet erat volutpat, et
          lacinia lacus pulvinar.
        </div>
        <div>
          <img className="md:w-1/3 mx-auto " src="/blog/2.jpg" />
        </div>
        <div className="md:w-2/3 text-center mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          dapibus sagittis nisl, interdum lacinia nunc placerat sed. Phasellus
          at luctus nisl. Maecenas eros eros, ullamcorper vitae lacinia blandit,
          efficitur vel eros. Nulla eget ipsum nec enim cursus interdum nec
          tempus risus. Praesent lobortis urna sit amet erat volutpat, et
          lacinia lacus pulvinar.
        </div>
        <div>
          <img className="md:w-1/3 mx-auto " src="/blog/blog1.png" />
        </div>
        <div className="md:w-2/3 text-center mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          dapibus sagittis nisl, interdum lacinia nunc placerat sed. Phasellus
          at luctus nisl. Maecenas eros eros, ullamcorper vitae lacinia blandit,
          efficitur vel eros. Nulla eget ipsum nec enim cursus interdum nec
          tempus risus. Praesent lobortis urna sit amet erat volutpat, et
          lacinia lacus pulvinar.
        </div> */}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { blogId } = context.query;

  try {
    const { blog } = await fetchBlogById(blogId)();
    await updateView(blogId);
    return { props: { blog, error: null } };
  } catch (error) {
    return { props: { blog, error: { message: "Bad Request" } } };
  }
}

export default BlogDetail;
