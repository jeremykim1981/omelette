import BlogHeader from "../../component/BlogHeader";
import { BlogSession } from "../../component/BlogSession";
import withAuth from "../../hoc/withAuth";

const BlogTravel = () => {
  return (
    <div className="py-20 px-4 md:px-8 lg:px-16 ">
     <div className="pb-10">
      <BlogHeader name="TRAVEL" /> </div>
      <BlogSession mode="TRAVEL" />
    </div>
  );
};
export default BlogTravel;
