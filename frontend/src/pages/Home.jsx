import React from "react";
import Hero from "../components/home/Hero";
import Container from "../components/layout/Container";
import Banner from "../components/home/Banner";
import CodeBlock from "../components/home/CodeBlock";
import HighlightText from "../components/ui/HighlightText";
import LearnMoreSection from "../components/home/LearnMoreSection";
import TimelineSection from "../components/home/TimelineSection";
import {
  BTN_1,
  BTN_2,
  TYPE_STRING_1,
  TYPE_STRING_2,
} from "../components/util/data";


const Home = () => {
  return (
    <>
      <section className="bg-richblack-900">
        <Container>
          <Hero />
          <Banner />
          <div className="px-4 400px:p-10 flex flex-col gap-8">
            <CodeBlock
              order={[1, 2]}
              title={
                <>
                  Unlock your <HighlightText> coding potential</HighlightText>{" "}
                  with our online courses.
                </>
              }
              paragraph={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              btn1={BTN_1}
              btn2={BTN_2}
              textColor={"text-yellow"}
              text={TYPE_STRING_1}
            />
            <CodeBlock
              order={[2, 1]}
              textColor={"text-white"}
              btn1={BTN_1}
              btn2={BTN_2}
              text={TYPE_STRING_2}
            />
          </div>
        </Container>
      </section>
      <section className="bg-grey-5">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
            <LearnMoreSection />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 mt-20 justify-items-center">
            <TimelineSection />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;
