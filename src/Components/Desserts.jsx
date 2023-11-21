import Button from "./Button";
import MenuItems from "./MenuItems";
import img from "../assets/menu/dessert-bg.jpeg";
import MenuPhoto from "./MenuPhoto";

const Desserts = () => {
  return (
    <div>
      <MenuPhoto
        img={img}
        title={"DESSERTS"}
        subtitle={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
        font={"inter"}
      />
      <div className="px-4 md:px-10 lg:px-60 pt-10 pb-20 md:pt-16 lg:py-20">
        <MenuItems type={"dessert"} />
        <Button
          name={"ORDER YOUR FAVORITE FOOD"}
          path={`/ourShop/${"desserts"}`}
        />
      </div>
    </div>
  );
};

export default Desserts;
