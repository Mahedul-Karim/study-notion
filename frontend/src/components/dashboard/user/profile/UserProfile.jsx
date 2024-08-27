import React from "react";
import Heading from "../../common/Heading";
import Section from "../../common/Section";
import SettingButton from '../../common/SettingButton'
import About from "./About";
import Profile from "./Profile";
import Details from "./Details";
const UserProfile = ({isInstructor=false}) => {
  return (
    <>
      <Heading>My Profile</Heading>
      <Section extraClass="flex items-center justify-between">
        <Profile />
        <SettingButton isInstructor={isInstructor}/>
      </Section>
      <Section extraClass="flex items-center justify-between">
        <About />
        <SettingButton isInstructor={isInstructor}/>
      </Section>
      <Section extraClass="flex justify-between">
        <Details />
        <SettingButton isInstructor={isInstructor}/>
      </Section>
    </>
  );
};

export default UserProfile;
