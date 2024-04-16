import React, { useRef } from "react";

import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import FormButton from "../ui/inputs/FormButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const CourseSlider = () => {
  const swiperRef = useRef();
  return (
    <>
      <div className="flex justify-between mb-6">
        <h3 className="text-2xl font-bold">Similar courses</h3>
        <div className="flex items-center gap-4">
          <FormButton
            onClick={() => swiperRef.current.slidePrev()}
            extraClass="!mt-0 !rounded-full"
          >
            <FaChevronLeft />
          </FormButton>
          <FormButton
            onClick={() => swiperRef.current.slideNext()}
            extraClass="!mt-0 !rounded-full"
          >
            <FaChevronRight />
          </FormButton>
        </div>
      </div>
      <div>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          loop
          modules={[Pagination]}
          spaceBetween={20}
          breakpoints={{
            1024: {
              slidesPerView: 4,
            },
            640: {
              slidesPerView: 3,
            },
            400: {
              slidesPerView: 2,
            },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default CourseSlider;
