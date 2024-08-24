import React, { useState } from "react";
import Container from "../layout/Container";
import { FAQ_CONTENT } from "../util/data";
import FaqDropdown from "./FaqDropdown";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 bg-[#fafafa]">
      <Container>
        <h2 className="text-richblack-700 font-semibold text-2xl md:text-3xl">
          Most frequently asked questions
        </h2>
        <p className="text-richblack-600 my-4 md:max-w-[45%]">
          Here are the most frequently asked questions you may check before
          getting started
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            {FAQ_CONTENT.slice(0, 3).map((faq, i) => (
              <FaqDropdown
                key={faq.id}
                index={faq.id}
                title={faq.title}
                desc1={faq.desc1}
                desc2={faq.desc2}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {FAQ_CONTENT.slice(3).map((faq, i) => (
              <FaqDropdown
                key={faq.id}
                index={faq.id}
                title={faq.title}
                desc1={faq.desc1}
                desc2={faq.desc2}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Faq;
