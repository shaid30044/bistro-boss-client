import { Helmet } from "react-helmet-async";
import Footer from "../Components/Footer";
import MenuBanner from "../Components/MenuBanner";
import Navbar from "../Components/Navbar";
import Offer from "../Components/Offer";
import Desserts from "../Components/Desserts";
import Pizzas from "../Components/Pizzas";
import Salads from "../Components/Salads";
import Soups from "../Components/Soups";

const OurMenu = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Our Menu</title>
      </Helmet>

      <div className="fixed z-50 w-full">
        <Navbar />
      </div>
      <MenuBanner />
      <Offer />
      <Desserts />
      <Pizzas />
      <Salads />
      <Soups />
      <Footer />
    </div>
  );
};

export default OurMenu;
