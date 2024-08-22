import React, { useEffect, useRef } from "react";
import Container from "../layout/Container";
import Button from "../ui/Button";
import { useData } from "../../hooks/useData";
import Spinner from "../ui/Spinner";
import Card from "../course/Card";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const FeaturedSection = () => {
  const { data, isPending } = useData({
    key: ["featuredSection"],
    endpoint: "/course",
  });

  const containerRef = useRef(null);

  const { isIntersecting, observeSection } = useIntersectionObserver();

  useEffect(() => {
    observeSection(containerRef.current);
  }, []);

  return (
    <section className="bg-[url('/assets/banner.png')] bg-cover bg-no-repeat py-16">
      <div
        className={`opacity-0 ${isIntersecting && "slideUp"}`}
        ref={containerRef}
      >
        <Container>
          {isPending ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-richblack-700 text-xl 400px:text-2xl sm:text-4xl font-semibold">
                    Featured Courses
                  </h3>
                </div>
                <Button outline to={"/course"}>
                  All Courses
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 mt-8">
                {data?.courses?.slice(0, 6).map((course) => (
                  <Card key={course._id} course={course} />
                ))}
              </div>
            </>
          )}
        </Container>
      </div>
    </section>
  );
};

export default FeaturedSection;
