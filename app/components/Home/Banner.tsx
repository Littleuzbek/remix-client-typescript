import Image1 from "../../assets/onlineShoping2.jpg";
import Image2 from "../../assets/onlineShoping4.jpg";
import Image3 from "../../assets/onlineShoping5.jpg";
import Image4 from "../../assets/onlineShoping.jpg";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar"

export default function Banner() {
  const bannerImages = [Image1, Image2, Image3, Image4];
  return (
    <div className="banner w-full m-[1rem_0]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        loop
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => {}}
        onSwiper={() => {}}
        style={{ width: "100%", height: "auto" }}
      >
        {bannerImages?.map((pic, index) => (
          <SwiperSlide key={index}>
            <img loading="eager" src={pic} className="image w-full object-cover" alt="..." />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
