import React, { useEffect, useRef, useState } from "react";
import Container from "../../layout/Container";
import TestimonialsSlide from "./TestimonialsSlide";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";

const TESTIMONIALS_DATA = [
  {
    src: "/assets/user1.jpg",
    paragraph: `Thank you very much for your help. This is exactly what
                  I was looking for. You will not regret it. It really saves me
                  time and effort. Skill is what our business lacked. Thank you
                  very much for your help. This is exactly what I was looking
                  for. You will not regret it. It really saves me time and
                  effort. Skill is what our business lacked.`,
    name: "Daziy Miller",
  },
  {
    src: "/assets/user2.jpg",
    paragraph: `Thank you very much for your help. This is exactly what
                  I was looking for. You will not regret it. It really saves me
                  time and effort. Skill is what our business lacked. Thank you
                  very much for your help. This is exactly what I was looking
                  for. You will not regret it. It really saves me time and
                  effort. Skill is what our business lacked.`,
    name: "David Lee",
  },
  {
    src: "/assets/user3.jpg",
    paragraph: `Thank you very much for your help. This is exactly what
                  I was looking for. You will not regret it. It really saves me
                  time and effort. Skill is what our business lacked. Thank you
                  very much for your help. This is exactly what I was looking
                  for. You will not regret it. It really saves me time and
                  effort. Skill is what our business lacked.`,
    name: "John Smith",
  },
];

let active = 1;
let isDragging = false;
let initialState = -100;
let finalState;
let clickedPoint;

const Testimonials = () => {
  const [data, setData] = useState(TESTIMONIALS_DATA);
  const [activeButton, setActiveButton] = useState(1);

  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.style.transform = `translateX(-100%)`;

    const clonedData = [...data];

    clonedData.push(clonedData[0]);
    clonedData.unshift(clonedData[clonedData.length - 2]);

    setData(clonedData);
  }, []);

  const gotoSlide = (doc, num) => {
    initialState = -num;
    doc.style.transform = `translateX(-${num}%)`;
  };

  const nextSlide = (number) => {
    const doc = containerRef.current;

    doc.style.transition = "0.3s";

    const children = doc.childNodes;

    if (!number && active === children.length - 2) {
      const tranlateValue = 100 * (active + 1);

      gotoSlide(doc, tranlateValue);

      active = 1;
      setActiveButton(active);
      setTimeout(() => {
        doc.style.transition = "0s";
        gotoSlide(doc, 100);
      }, 310);
      return;
    }

    active = number ? number : active + 1;

    setActiveButton(active);
    gotoSlide(doc, 100 * active);
  };

  const prevSlide = () => {
    const doc = containerRef.current;

    doc.style.transition = "0.3s";

    if (active === 1) {
      active = 3;
      setActiveButton(active);
      gotoSlide(doc, 0);

      setTimeout(() => {
        doc.style.transition = "0s";
        gotoSlide(doc, 100 * active);
      }, 310);
      return;
    }
    active--;
    setActiveButton(active);
    gotoSlide(doc, 100 * active);
  };

  const handleMouseDown = (e) => {
    isDragging = true;

    clickedPoint = e.nativeEvent.pageX || e.touches[0].pageX;
  };

  const handleMouseUp = () => {
    isDragging = false;

    const movedValue = finalState - initialState;

    if (movedValue <= -10) {
      nextSlide();
    } else if (movedValue > 10) {
      prevSlide();
    } else {
      gotoSlide(containerRef.current, -initialState);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) {
      return;
    }

    e.preventDefault();

    const movingPoint = e.nativeEvent.pageX || e.touches[0].pageX;

    const finalTranslate = initialState + (movingPoint - clickedPoint);

    finalState = Math.ceil(finalTranslate);

    containerRef.current.style.transform = `translateX(${finalState}%)`;
  };

  return (
    <section className="bg-tertiary py-16">
      <div>
        <Container>
          <div className="flex flex-col items-center justify-center">
            <div className="flex max-w-[80%] sm:max-w-[450px] lg:max-w-[50%] shrink-0 overflow-clip transition-all duration-300 relative">
              <div className="absolute bg-primary size-16 400px:size-24 bottom-0 right-0 z-[5] flex items-center justify-center rounded-tl-full gap-2">
                {TESTIMONIALS_DATA.map((_, i) => (
                  <button
                    className={`w-[8px] h-[8px] 400px:w-[10px] 400px:h-[10px] mt-4 ${
                      activeButton === i + 1 ? "bg-yellow50" : "bg-richblack-25"
                    }  rounded-full`}
                    key={i}
                    onClick={nextSlide.bind(null, i + 1)}
                  />
                ))}
              </div>
              <div
                id="testimonialContainer"
                className="transition-all duration-300 flex shrink-0 w-full"
                ref={containerRef}
                onMouseLeave={() => (isDragging = false)}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
              >
                {data?.map((data, index) => (
                  <TestimonialsSlide
                    src={data?.src}
                    key={index}
                    paragraph={data?.paragraph}
                    name={data?.name}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6 w-full">
              <button
                className="bg-white p-3 rounded-md hover:bg-primary hover:text-white transition-all duration-300"
                onClick={prevSlide}
              >
                <FaChevronLeft />{" "}
              </button>
              <button
                className="bg-white p-3 rounded-md hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => nextSlide()}
              >
                <FaChevronRight />{" "}
              </button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Testimonials;
