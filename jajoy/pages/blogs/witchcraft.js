import BlogHeader from "../../component/BlogHeader";
import { BlogSession } from "../../component/BlogSession";
import withAuth from "../../hoc/withAuth";

const BlogWitchcraft = () => {
  return (
    <div className="py-20 px-4 md:px-8 lg:px-16 ">
    <div className="pb-10">
      <BlogHeader name="WITCHCRAFT" /></div>
      <BlogSession mode="WITCHCRAFT" />
    </div>
  );
};
export default BlogWitchcraft;
