import { Helmet } from "react-helmet-async";
import About from "../Components/About";
import Call from "../Components/Call";
import Check from "../Components/Check";
import FoodSlider from "../Components/FoodSlider";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import PopularMenu from "../Components/PopularMenu";
import Recommends from "../Components/Recommends";
import Slider from "../Components/Slider";
import Testimonials from "../Components/Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss</title>
      </Helmet>

      <div className="fixed z-50 w-full">
        <Navbar />
      </div>
      <Slider />
      <FoodSlider />
      <About />
      <PopularMenu />
      <Call />
      <Recommends />
      <Check />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
