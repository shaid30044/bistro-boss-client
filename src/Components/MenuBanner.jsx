import img from "../assets/menu/banner3.jpg";
import CoverPhoto from "./CoverPhoto";

const MenuBanner = () => {
  return (
    <div>
      <CoverPhoto
        img={img}
        title={"OUR MENU"}
        subtitle={"Would you like to try a dish?"}
        font={"cinzel"}
      />
    </div>
  );
};

export default MenuBanner;
