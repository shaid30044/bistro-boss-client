import img from "../assets/home/featured.jpg";

const Check = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div style={backgroundImageStyle} className="bg-fixed">
      {/* title and subtitle */}

      <div className="bg-black4 px-4 md:px-10 lg:px-60 py-16 lg:py-24">
        <div>
          <div className="text-center font-inter pb-16 lg:pb-24">
            <p className="lg:text-xl italic text-brown3 pb-8 lg:pb-12">
              ---Check it out---
            </p>
            <h1>
              <span className="text-2xl md:text-3xl lg:text-4xl text-white border-y-[3px] lg:border-y-4 border-dark6 px-8 lg:px-16 py-4">
                FROM OUR MENU
              </span>
            </h1>
          </div>

          <div className="grid md:grid-cols-2 justify-center items-center gap-6 md:gap-16">
            <div>
              <img src={img} />
            </div>
            <div className="flex flex-col gap-6">
              <div className="text-white text-justify md:text-start">
                <h3 className="md:text-lg pb-2">
                  March 20, 2023
                  <br />
                  WHERE CAN I GET SOME?
                </h3>
                <p className="text-xs md:text-base">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur fugit qui non quas saepe esse aperiam eaque dolor
                  inventore officiis.
                </p>
              </div>
              <div>
                <button className="btn md:text-lg font-medium text-white bg-transparent hover:bg-transparent border-0 border-b-2 border-white hover:border-white">
                  READ MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Check;
