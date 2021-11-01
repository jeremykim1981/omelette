import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="  bg-blueblog">
      <div className="max-w-screen-2xl mx-auto  flex flex-col  justify-between  min-h-screen relative ">
        <Navbar />
        <div className="pt-24 lg:pt-24 xl:pt-32">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
