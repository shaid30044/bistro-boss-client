import SectionTitle from "./SectionTitle";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bistro-boss-server-ten-mu.vercel.app/reviews"
        );
        const data = response.data;

        setReviews(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="font-inter px-4 md:px-10 lg:px-60 py-20">
      <SectionTitle
        subtitle={"---What Our Clients Say---"}
        title={"TESTIMONIALS"}
      />

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id} className="text-center px-12 md:px-20">
            <div className="flex justify-center">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
            </div>
            <p className="flex justify-center text-7xl text-dark1 pt-12 pb-10">
              <FaQuoteLeft />
            </p>
            <p className="md:text-lg text-dark2 pb-1">{review.details}</p>
            <p className="text-2xl md:text-3xl font-medium text-brown2 uppercase">
              {review.name}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
