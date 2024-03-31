import React from "react";
import Heading from "../../common/Heading";
import Section from "../../common/Section";
import Upload from "./Upload";
import Title from "../../common/Title";
import Input from "../../../ui/inputs/Input";
import CancelButton from '../../common/CancelButton'
import FormButton from "../../../ui/inputs/FormButton";
import UserInformation from "./UserInformation";
import ChangePassword from "./ChangePassword";

const UserSettings = () => {
  return (
    <>
      <Heading>Edit Profile</Heading>
      <Section extraClass="flex gap-2 400px:gap-4 flex-col 400px:flex-row">
        <Upload />
      </Section>
      <div>
      <UserInformation />
      </div>
      <div>
        <ChangePassword />
      </div>
    </>
  );
};

export default UserSettings;
