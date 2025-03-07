import { Outlet } from "react-router-dom";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <Outlet />
      </div>
      <Cart />
      <Footer />
    </>
  );
};

export default Layout;
