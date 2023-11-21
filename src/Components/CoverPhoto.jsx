import { Parallax } from "react-parallax";

const CoverPhoto = ({ img, title, subtitle, font }) => {
  return (
    <Parallax
      bgImage={img}
      blur={{ min: -30, max: 30 }}
      bgImageStyle={{ width: "100vw", height: "" }}
    >
      <div>
        <div className="text-white font-cinzel text-center px-4 md:px-10 lg:px-60 -mt-3 md:-mt-0 pb-8 md:pt-6 md:pb-16 lg:py-24">
          <div className="bg-black4 mt-24 py-8 md:py-20 lg:py-40">
            <h1 className="text-2xl md:text-6xl lg:text-7xl font-bold pb-2 md:pb-4">
              {title}
            </h1>
            <p className={`md:text-xl font-medium font-${font}`}>{subtitle}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default CoverPhoto;
