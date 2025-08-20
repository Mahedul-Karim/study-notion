import React, { useEffect, useRef } from "react";
import Container from "../layout/Container";
import Button from "../ui/Button";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const Mentor = () => {
  const containerRef = useRef();

  const { isIntersecting, observeSection } = useIntersectionObserver();

  useEffect(() => {
    observeSection(containerRef.current);
  }, []);

  return (
    <section className="py-4 relative">
      <div className="bg-[url('/assets/banner.png')] bg-cover bg-no-repeat inset-0 opacity-40 absolute" />
      <div
        className={`opacity-0 ${isIntersecting && "slideUp"}`}
        ref={containerRef}
      >
        <Container extraClass="grid 400px:grid-cols-2">
          <div>
            <img src="/assets/share.png" alt="" />
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <h3 className="text-xl sm:text-3xl font-bold max-w-[92%] !leading-[1.2] text-richblack-700">
              Want to share your knowledge? Join us a Mentor
            </h3>
            <p className="text-richblack-500 text-sm md:text-base">
              High-definition video is video of higher resolution and quality
              than standard-definition. While there is no standardized meaning
              for high-definition, generally any video.
            </p>
            <Button outline to={"/signup"} extraClass="self-start">
              Join Now
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Mentor;
