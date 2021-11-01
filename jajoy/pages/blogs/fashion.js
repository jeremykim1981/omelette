import BlogHeader from "../../component/BlogHeader";
import { BlogSession } from "../../component/BlogSession";

const BlogFashion = () => {
  return (
    <div className="py-20 px-4 md:px-8 lg:px-16 ">
      <div className="pb-10">
        <BlogHeader name="FASHION" />
      </div>
      <BlogSession mode="FASHION" />
    </div>
  );
};
export default BlogFashion;
