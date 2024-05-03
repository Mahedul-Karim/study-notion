import React, { useRef } from "react";

import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import FormButton from "../ui/inputs/FormButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useData } from "../../hooks/useData";
import Spinner from "../ui/Spinner";

const CourseSlider = () => {
  const swiperRef = useRef();

  const { data, isPending } = useData({
    key: ["allCourses"],
    endpoint: `course`,
  });

  return (
    <>
      <div className="flex justify-between mb-6">
        <h3 className="text-2xl font-bold">Similar courses</h3>

        <div
          className={`items-center gap-4 ${
            data?.courses?.length === 0 ? "hidden" : "flex"
          }`}
        >
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
      {isPending ? (
        <div className="flex items-center justify-center my-16">
          <Spinner />
        </div>
      ) : data?.courses?.length === 0 ? (
        <p className="text-center text-xl font-semibold my-6">
          No Courses Found!Try a different category
        </p>
      ) : (
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
            {data?.courses?.map((course) => (
              <SwiperSlide key={course?._id}>
                <Card course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default CourseSlider;
