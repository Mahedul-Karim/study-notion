import React from "react";
import Container from "../layout/Container";
import Heading from "../ui/Heading";
import HighlightText from "../ui/HighlightText";
import FoundingStory from "./founding-story/FoundingStory";
import { WIDGET_DATA } from '../util/data'
import Methods from "./Methods";
import Widget from "../home/Widget";

const About = () => {
  return (
    <main className="bg-[#fafafa]">
      <section className="bg-[url('/assets/banner.png')] py-16 relative">
        <Container
          extraClass={
            "flex flex-col md:items-center justify-center text-center gap-2"
          }
        >
          <Heading
            title1={"Driving Innovation in Online Education for a"}
            title2={""}
            textColor={"text-richblack-700"}
            highlightText={"Brighter Future"}
            extraClass={"lg:w-[70%]"}
          />
          <p className="text-richblack-300 lg:w-[65%] mt-2">
            Studynotion is at the forefront of driving innovation in online
            education. We&apos;re passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
          <div className="h-[30px] md:h-[80px] lg:h-[120px]" />
          <div className="self-center flex items-center gap-2 lg:gap-5 justify-center absolute bottom-0 translate-y-[50%] w-[100%]">
            {Array.from({ length: 3 }).map((image, i) => (
              <img
                src={`/assets/aboutus${i + 1}.webp`}
                className="w-[30%] max-w-[300px] object-cover"
                key={i}
              />
            ))}
          </div>
        </Container>
      </section>
      <Container
        extraClass={
          "grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10 mt-[100px] sm:mt-[150px] lg:mt-[200px]"
        }
      >
        <FoundingStory />
      </Container>
      
        <Container extraClass={"grid grid-cols-2 md:grid-cols-4 gap-4"}>
        {WIDGET_DATA.map((data, index) => (
        <Widget
          key={index}
          src={data.src}
          text={data.text}
          duration={data.duration}
          unit={data.unit}
          number={data.number}
        />
      ))}
        </Container>
      
      <Container
        extraClass={
          "grid grid-cols-1 400px:grid-cols-2 gap-6 lg:gap-0 lg:grid-cols-4 !py-16"
        }
      >
        <Methods />
      </Container>
      
    </main>
  );
};

export default About;
