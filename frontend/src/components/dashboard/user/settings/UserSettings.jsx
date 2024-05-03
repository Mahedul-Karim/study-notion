import React from "react";
import Heading from "../../common/Heading";
import Section from "../../common/Section";
import Upload from "./Upload";

import UserInformation from "./UserInformation";
import ChangePassword from "./ChangePassword";

const UserSettings = () => {
  return (
    <>
      <Heading>Edit Profile</Heading>
      <Section extraClass="flex gap-2 400px:gap-4 flex-col 400px:flex-row 400px:items-center">
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
