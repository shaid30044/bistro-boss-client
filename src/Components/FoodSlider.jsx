import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import img1 from "../assets/home/slide1.jpg";
import img2 from "../assets/home/slide2.jpg";
import img3 from "../assets/home/slide3.jpg";
import img4 from "../assets/home/slide4.jpg";
import img5 from "../assets/home/slide5.jpg";
import { Pagination } from "swiper/modules";
import SectionTitle from "./SectionTitle";

const FoodSlider = () => {
  const images = [
    {
      title: "SALADS",
      img: img1,
    },
    {
      title: "PIZZAS",
      img: img2,
    },
    {
      title: "SOUPS",
      img: img3,
    },
    {
      title: "DESSERTS",
      img: img4,
    },
    {
      title: "Salad",
      img: img5,
    },
  ];

  return (
    <div className="px-4 md:px-10 lg:px-60 py-20">
      <SectionTitle
        subtitle={"---From 11:00am to 10:00pm---"}
        title={"ORDER ONLINE"}
      />
      <Swiper
        slidesPerView={4}
        spaceBetween={16}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat pb-10"
          >
            <img
              src={image.img}
              alt={`Slide ${index + 1}`}
              className="max-w-xs transition duration-500 ease-in-out hover:scale-110"
            />
            <h1 className="absolute bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 md:text-xl lg:text-3xl font-cinzel text-white">
              {image.title}
            </h1>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FoodSlider;
