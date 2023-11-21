import img from "../assets/contact/banner.jpg";
import CoverPhoto from "./CoverPhoto";

const ContactBanner = () => {
  return (
    <div>
      <CoverPhoto
        img={img}
        title={"CONTACT US"}
        subtitle={"Would you like to try a dish?"}
        font={"cinzel"}
      />
    </div>
  );
};

export default ContactBanner;
