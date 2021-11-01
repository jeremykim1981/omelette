import BlogHeader from "../../component/BlogHeader";
import { BlogSession } from "../../component/BlogSession";

const BlogOther = () => {
  return (
    <div className="py-20 px-4 md:px-8 lg:px-16 ">
      <div className="pb-10">
        <BlogHeader name="OTHER" />
      </div>
      <BlogSession mode="OTHER" />
    </div>
  );
};
export default BlogOther;
