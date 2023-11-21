import SectionTitle from "./SectionTitle";
import MenuItems from "./MenuItems";
import Button from "./Button";

const PopularMenu = () => {
  return (
    <div className="font-inter px-4 md:px-10 lg:px-60 py-20">
      <SectionTitle subtitle={"---Check it out---"} title={"FROM OUR MENU"} />

      <MenuItems type={"popular"} />

      <Button name={"VIEW FULL MENU"} />
    </div>
  );
};

export default PopularMenu;
