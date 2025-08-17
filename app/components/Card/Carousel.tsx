import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { isString } from "../Extra/Extra";
import { useDispatch } from "react-redux";
import { cartAction } from "~/store/CartSlice";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type Props = {
  productImg?: undefined | string | string[];
  viewMode?: undefined | boolean;
  inProduct?: undefined | boolean;
};

export default function Carousel({ productImg, viewMode, inProduct }: Props) {
  const dispatch = useDispatch();

  if (productImg === undefined) return;
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      pagination={{ clickable: true }}
      navigation
      loop={
        Array?.isArray(productImg)
          ? productImg?.length >= 2
            ? true
            : false
          : false
      }
      spaceBetween={0}
      slidesPerView={1}
      onSwiper={() => {}}
      style={{ width: "100%", height: "fit-content" }}
    >
      {(Array.isArray(productImg) ? productImg : [productImg])?.map(
        (pic, index) => (
          <SwiperSlide key={index}>
            <img
              onClick={() => {
                if (inProduct) {
                  dispatch(cartAction.setViewer(true));
                }
              }}
              onKeyDown={() => {}}
              tabIndex={-1}
              role="button"
              loading="lazy"
              src={isString(pic) ? pic : URL.createObjectURL(pic)}
              className="image w-full"
              style={
                productImg
                  ? {
                      aspectRatio: "1 / 1",
                      objectFit: viewMode ? "contain" : "cover",
                    }
                  : {}
              }
              alt="..."
            />
          </SwiperSlide>
        )
      )}
    </Swiper>
  );
}
