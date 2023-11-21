import img from "../assets/shop/banner2.jpg";
import CoverPhoto from "./CoverPhoto";

const ShopBanner = () => {
  return (
    <div>
      <CoverPhoto
        img={img}
        title={"OUR SHOP"}
        subtitle={"Would you like to try a dish?"}
        font={"cinzel"}
      />
    </div>
  );
};

export default ShopBanner;
