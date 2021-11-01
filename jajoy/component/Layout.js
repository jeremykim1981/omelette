import Footer from "./Footer";
import NavBar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
