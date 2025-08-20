import React, { useEffect, useRef } from "react";
import Hero from "../components/home/Hero";
import Container from "../components/layout/Container";
import CodeBlock from "../components/home/CodeBlock";
import HighlightText from "../components/ui/HighlightText";
import TimelineSection from "../components/home/TimelineSection";
import {
  BTN_1,
  BTN_2,
  TYPE_STRING_1,
  TYPE_STRING_2,
} from "../components/util/data";
import AboutSection from "../components/home/AboutSection";
import CourseWidget from "../components/home/CourseWidget";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import FeaturedSection from "../components/home/FeaturedSection";
import Mentor from "../components/home/Mentor";
import Testimonials from "../components/home/testimonials/Testimonials";

const Home = () => {
  const codeSection = useRef(null);

  const { isIntersecting, observeSection } = useIntersectionObserver();

  useEffect(() => {
    observeSection(codeSection.current);
  }, []);

  return (
    <>
      <section className="min-h-screen pb-10 pt-16 relative z-[1]">
      <div className="absolute inset-0 bg-[url('/assets/banner.png')] bg-cover bg-no-repeat z-[-1] opacity-40" />
        <Container>
          <Hero />
        </Container>
      </section>
      <section>
        <Container>
          <CourseWidget />
          <div
            className={`px-4 400px:p-10 flex flex-col gap-8 mt-4 ${
              isIntersecting ? "slideUp" : "opacity-0"
            } `}
            ref={codeSection}
          >
            <CodeBlock
              blur={1}
              title={
                <>
                  Unlock your{" "}
                  <HighlightText blue> coding potential</HighlightText> with our
                  online courses.
                </>
              }
              paragraph={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              btn1={BTN_1}
              btn2={BTN_2}
              textColor={"text-[#392C7D]"}
              text={TYPE_STRING_1}
            />
            <CodeBlock
              order1="order-1 md:order-2"
              order2="order-2 md:order-1"
              blur={2}
              textColor={"text-[#392C7D]"}
              btn1={BTN_1}
              btn2={BTN_2}
              text={TYPE_STRING_2}
              title={
                <>
                  Start <HighlightText blue> coding in seconds</HighlightText>
                </>
              }
              paragraph={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              }
            />
          </div>
        </Container>
      </section>
      <FeaturedSection />
      <Container>
        <TimelineSection />
        <AboutSection />
      </Container>
      <Mentor />
      <Testimonials />
    </>
  );
};

export default Home;
