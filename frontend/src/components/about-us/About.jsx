import React from "react";
import Container from "../layout/Container";
import Heading from "../ui/Heading";
import HighlightText from "../ui/HighlightText";
import FoundingStory from "./founding-story/FoundingStory";
import Overview from "./Overview";
import Methods from "./Methods";
import ContactUs from "./ContactUs";

const About = () => {
  return (
    <main>
      <section className="bg-richblack-700 py-4 lg:py-8 relative">
        <Container
          extraClass={
            "flex flex-col md:items-center justify-center text-center gap-2"
          }
        >
          <Heading
            title1={"Driving Innovation in Online Education for a"}
            title2={""}
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
      <section className="bg-richblack-700">
        <Container extraClass={"grid grid-cols-2 gap-y-6 sm:grid-cols-4"}>
          <Overview />
        </Container>
      </section>
      <Container
        extraClass={
          "grid grid-cols-1 400px:grid-cols-2 gap-6 lg:gap-0 lg:grid-cols-4 !py-16"
        }
      >
        <Methods />
      </Container>
      <Container extraClass={"flex flex-col items-center"}>
        <ContactUs />
      </Container>
    </main>
  );
};

export default About;
