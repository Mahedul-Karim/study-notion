import React from "react";
import Heading from "../ui/Heading";
import Text from "./founding-story/Text";

const Methods = () => {
  return (
    <>
      <div className="400px:col-span-2">
        <Heading
        textColor={"text-richblack-700"}
          title1={"World-Class Learning for"}
          title2={""}
          highlightText={"Anyone, Anywhere"}
        />
        <Text>
          Studynotion partners with more than 275+ leading universities and
          companies to bring flexible, affordable, job-relevant online learning
          to individuals and organizations worldwide.
        </Text>
      </div>
      <div className="bg-secondary py-8 px-4 min-h-[250px]">
        <h4 className="text-white text-[18px] lg:w-[80%]">
          Curriculum Based on Industry Needs
        </h4>
        <Text >
          Save time and money! The Belajar curriculum is made to be easier to
          understand and in line with industry needs
        </Text>
      </div>
      <div className="bg-blue-200 py-8 px-4 min-h-[250px]">
        <h4 className="text-white text-[18px] lg:w-[80%]">
          Our Learning Methods
        </h4>
        <Text extraClass={"text-richblack-900"}>
          Studynotion partners with more than 275+ leading universities and
          companies to bring
        </Text>
      </div>
      <div className="lg:col-start-2 bg-secondary py-8 px-4 min-h-[250px]">
        <h4 className="text-white text-[18px] lg:w-[80%]">Certification</h4>
        <Text >
          Studynotion partners with more than 275+ leading universities and
          companies to bring
        </Text>
      </div>
      <div className="bg-blue-200 py-8 px-4 min-h-[250px]">
        <h4 className="text-white text-[18px] lg:w-[80%]">Rating</h4>
        <Text extraClass={"text-richblack-900"}>
          Studynotion partners with more than 275+ leading universities and
          companies to bring
        </Text>
      </div>
      <div className="bg-secondary py-8 px-4 min-h-[250px]">
        <h4 className="text-white text-[18px] lg:w-[80%]">Ready to Work</h4>
        <Text>
          Save time and money! The Belajar curriculum is made to be easier to
          understand and in line with industry needs
        </Text>
      </div>
    </>
  );
};

export default Methods;
