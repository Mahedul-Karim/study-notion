import React from "react";
import Input from "../../../ui/inputs/Input";
import CancelButton from "../../common/CancelButton";
import FormButton from "../../../ui/inputs/FormButton";
import Title from "../../common/Title";
import Section from "../../common/Section";
import TextArea from "../../../ui/inputs/TextArea";
import Select from "../../../ui/inputs/Select";

const UserInformation = () => {
  return (
    <>
      <Section extraClass="flex flex-col gap-2">
        <Title>Profile information</Title>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 sm:flex-row flex-col">
            <div className="basis-[50%]">
              <Input
                label={"First Name"}
                type={"text"}
                placeholder={"Enter First Name"}
              />
            </div>
            <div className="basis-[50%]">
              <Input
                label={"Last Name"}
                type={"text"}
                placeholder={"Enter Last Name"}
              />
            </div>
          </div>
          <div className="flex gap-4 sm:flex-row flex-col">
            <div className="basis-[50%]">
              <Input label={"Date of Birth"} type={"date"} />
            </div>
            <div className="basis-[50%]">
              <label className="text-[15px] text-richblack-5 mb-1">
                Gender
              </label>
              <Select>
                <option>Select a gender</option>
                <option>Male</option>
                <option>Female</option>
              </Select>
            </div>
          </div>
          <div>
            <Input
              label={"Contact Number"}
              type={"number"}
              placeholder={"Enter Contact Number"}
            />
          </div>
          <div>
            <label className="text-[15px] text-richblack-5 mb-1">About</label>
            <TextArea placeholder={"Enter Bio Details"} />
          </div>
        </div>
      </Section>
      <div className="flex gap-4 justify-end items-center mt-4">
        <CancelButton />
        <FormButton extraClass="!mt-0">Save</FormButton>
      </div>
    </>
  );
};

export default UserInformation;
