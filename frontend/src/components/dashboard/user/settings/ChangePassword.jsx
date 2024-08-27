import React from "react";
import Section from "../../common/Section";
import Title from "../../common/Title";
import Input from "../../../ui/inputs/Input";
import CancelButton from "../../common/CancelButton";
import FormButton from "../../../ui/inputs/FormButton";

const ChangePassword = () => {
  return (
    <>
      <Section>
        <Title>Password</Title>
        <div className="flex gap-4 mt-4 sm:flex-row flex-col">
          <div className="basis-[50%] relative">
            <Input
              label={"Password"}
              type={"password"}
              placeholder={"Enter Current Password"}
            />
          </div>
          <div className="basis-[50%] relative">
            <Input
              label={"New Password"}
              type={"password"}
              placeholder={"Enter New Password"}
            />
          </div>
        </div>
      </Section>
      <div className="flex gap-4 justify-end items-center mt-4">
        <CancelButton />
        <FormButton extraClass="!mt-0 bg-primary">Update</FormButton>
      </div>
    </>
  );
};

export default ChangePassword;
