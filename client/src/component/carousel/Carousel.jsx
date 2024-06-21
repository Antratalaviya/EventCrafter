import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

// import required modules
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import SponserEventCard from "./SponserEventCard";
import { img } from "../../assets/assets";



function Carousel() {
  return (
    <div className="h-full flex items-center justify-center md:-mx-6 rounded-md overflow-x-hidden">
      <Swiper
        style={{
          "--swiper-pagination-color": "white",
          "--swiper-pagination-bullet-inactive-color": "#565656",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "5px",
          "--swiper-pagination-bottom": "-5px",
          paddingBottom: "15px"
        }}
        speed={1000}
        autoplay={{
          delay: 24*60*1000
        }}
        effect={"coverflow"}
        loop={true}
        slidesPerGroup={1}
        slidesPerView={1.5}
        // spaceBetween={10}
        grabCursor={true}
        centeredSlides={true}
        pagination={{ clickable: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 75,
          depth: 100,
          modifier: 3.4,
          slideShadows: false
        }}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        className="w-[90%] h-[85%] overflow-hidden pb-10"
      >
        <SwiperSlide className="w-full h-full">
          <SponserEventCard src={img.event1} add="4140 Parker Rd. Apartment" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-full hidden">
          <SponserEventCard src={img.event2} add="4140 Parker Rd. Apartment" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-full">
          <SponserEventCard src={img.event3} add="4140 Parker Rd. Apartment" />
        </SwiperSlide>
        <SwiperSlide className="w-full h-full">
          <SponserEventCard src={img.event1} add="4140 Parker Rd. Apartment" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Carousel

