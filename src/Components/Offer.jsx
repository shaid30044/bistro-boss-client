import Button from "./Button";
import MenuItems from "./MenuItems";
import SectionTitle from "./SectionTitle";

const Offer = () => {
  return (
    <div className="px-4 md:px-10 lg:px-60 py-20">
      <SectionTitle subtitle={"---Don't miss---"} title={"TODAY'S OFFER"} />

      <MenuItems type={"offered"} />

      <Button name={"ORDER YOUR FAVORITE FOOD"} path={"/ourShop"} />
    </div>
  );
};

export default Offer;
