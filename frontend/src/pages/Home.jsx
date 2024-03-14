import React from "react";
import Hero from "../components/home/Hero";
import Container from "../components/ui/Container";
import Banner from "../components/home/Banner";
import CodeBlock from "../components/home/CodeBlock";
import HighlightText from "../components/ui/HighlightText";
const BTN_1 = {
  text: "Try it yourself",
  to: "/login",
};
const BTN_2 = {
  text: "Learn more",
  to: "/about",
};

const TYPE_STRING_1='<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is my page</title>\n</head>\n<body>\n<h1><a href="#">Header</a></h1>\n<nav><a href="#">One</a><a href="#">Two</a>\n<a href="#">Three</a></nav>\n</body>\n</html>';

const TYPE_STRING_2='import React from react\nimport Button from button\nimport { TypeAnimation } from react-type-animation\nimport { FaArrowRight } from react-icons/fa;\n\nconst home = () => {\nreturn(\n<div>Home</div>\n)\n}\nexport default Home; '

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
    </>
  );
};

export default Home;
