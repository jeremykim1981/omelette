import { BlogSession } from "../../component/BlogSession";
import withAuth from "../../hoc/withAuth";

const Blog = () => {
  return (
    <div className="max-w-screen-2xl mx-auto bg-white pb-20">
      <div className="mx-4 md:mx-8 lg:mx-16 grid grid-cols-1 gap-4 md:gap-10  ">
        <BlogSession name="BEAUTY" mode="BEAUTY" count="8" />
        <BlogSession name="FASHION" mode="FASHION" count="8" />
        <BlogSession name="CAFE" mode="CAFE" count="8" />
        <BlogSession name="TRAVEL" mode="TRAVEL" count="8" />
        <BlogSession name="WITCHCRAFT" mode="WITCHCRAFT" count="8" />
        <BlogSession name="OTHER" mode="OTHER" count="8" />
      </div>
    </div>
  );
};
export default Blog;
