import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import axios from "axios";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sliderv4.css";

// install Swiper modules

const SliderImageV4 = () => {
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const monthIndex = date.getMonth();
  //   const month = months[monthIndex];
  //   const day = date.getDate();
  //   const year = date.getFullYear();
  //   return `${month} ${day}, ${year}`;
  // };

  const [data, setData] = useState([]);

  const sliderApi = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/post/slider`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sliderApi();
  }, []);

  return (
    <>
      <div className="slider_v4">
        <Swiper
          autoHeight={true}
          effect={"coverflow"}
          grabCursor={true}
          navigation={true}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 1000 }}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="swiper_container mt-4"
        >
          {data.map((i, el) => {
            return (
              <SwiperSlide key={el}>
                <Link className="link-style" to={`/post/${i.title_slug}`}>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${i.image_big}`}
                    className="img-fluid"
                    alt="Responsive image"
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default SliderImageV4;
