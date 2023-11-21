import { Helmet } from "react-helmet-async";
import Navbar from "../Components/Navbar";
import ShopBanner from "../Components/ShopBanner";
import Footer from "../Components/Footer";
import ShopItems from "../Components/ShopItems";

const OurShop = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Our Shop</title>
      </Helmet>

      <div className="fixed z-50 w-full">
        <Navbar />
      </div>
      <ShopBanner />
      <ShopItems />
      <Footer />
    </div>
  );
};

export default OurShop;
