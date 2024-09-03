import Navbar from "../../pages/shared/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../pages/shared/footer/Footer";

const Mainlayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Mainlayout;
