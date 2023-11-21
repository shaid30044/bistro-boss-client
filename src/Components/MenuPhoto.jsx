import { Parallax } from "react-parallax";

const MenuPhoto = ({ img, title, subtitle, font }) => {
  return (
    <Parallax
      bgImage={img}
      blur={{ min: -30, max: 30 }}
      bgImageStyle={{ width: "100vw", height: "" }}
    >
      <div className="text-white font-cinzel text-center px-4 md:px-10 lg:px-60 py-10 md:py-16 lg:py-24">
        <div className="bg-black4 px-3 md:px-12 lg:px-28 py-5 md:py-10 lg:py-20">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold pb-2 md:pb-4">
            {title}
          </h1>
          <p
            className={`text-sm md:text-base lg:text-lg md:font-medium font-${font}`}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </Parallax>
  );
};

export default MenuPhoto;
