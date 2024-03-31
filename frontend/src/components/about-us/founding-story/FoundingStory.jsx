import React from "react";
import Title from "./Title";
import Text from "./Text";

const FoundingStory = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Title red>Our founding story</Title>
        <Text>
          Our e-learning platform was born out of a shared vision and passion
          for transforming education. It all began with a group of educators,
          technologists, and lifelong learners who recognized the need for
          accessible, flexible, and high-quality learning opportunities in a
          rapidly evolving digital world.
        </Text>
        
      </div>
      <div className="md:justify-self-end w-full md:w-auto">
        <img
          src="/assets/FoundingStory.png"
          className="shadow-[0_0_20px] shadow-[#FC6767] w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Title orange>Our Vision</Title>
        <Text>
          With this vision in mind, we set out on a journey to create an
          e-learning platform that would revolutionize the way people learn. Our
          team of dedicated experts worked tirelessly to develop a robust and
          intuitive platform that combines cutting-edge technology with engaging
          content, fostering a dynamic and interactive learning experience.
        </Text>
      </div>
      <div>
        <Title blue>Our Mission</Title>
        <Text>
          Our mission goes beyond just delivering courses online. We wanted to
          create a vibrant community of learners, where individuals can connect,
          collaborate, and learn from one another. We believe that knowledge
          thrives in an environment of sharing and dialogue, and we foster this
          spirit of collaboration through forums, live sessions, and networking
          opportunities.
        </Text>
      </div>
    </>
  );
};

export default FoundingStory;
