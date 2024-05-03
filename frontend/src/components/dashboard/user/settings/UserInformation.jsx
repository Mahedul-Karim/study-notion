import React, { useEffect, useRef } from "react";
import Input from "../../../ui/inputs/Input";
import CancelButton from "../../common/CancelButton";
import FormButton from "../../../ui/inputs/FormButton";
import Title from "../../common/Title";
import Section from "../../common/Section";
import TextArea from "../../../ui/inputs/TextArea";
import Select from "../../../ui/inputs/Select";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useApi } from "../../../../hooks/useApi";
import { toast } from "react-hot-toast";
import SpinnerModal from "../../../ui/modal/SpinnerModal";
import { setUser } from "../../../../store/slices/profile";

const UserInformation = () => {
  const { user } = useSelector((state) => state.profile);

  const {
    register,
    formState: { errors },
    handleSubmit,
    
  } = useForm({
    defaultValues: user ? { ...user, ...user?.additionalDetails } : "",
  });

  const dispatch = useDispatch();

  const { mutate, isPending } = useApi({
    success: (data) => {
      toast.success("User information updated successfully!");
      dispatch(setUser(data.user));
    },
    error: function (err) {
      toast.error(err);
    },
  });

  const onSubmitHandler = (data) => {
    const { firstName, lastName, about, dateOfBirth, gender, contactNumber } =
      data;

    const options = {
      method: "PATCH",
      data: {
        firstName,
        lastName,
        about,
        dateOfBirth,
        gender,
        contactNumber,
      },
    };

    mutate({ endpoint: "profile", options });
  };

  return (
    <>
      <Section extraClass="flex flex-col gap-2">
        <Title>Profile information</Title>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex gap-4 sm:flex-row flex-col">
            <div className="basis-[50%]">
              <Input
                label={"First Name"}
                type={"text"}
                placeholder={"Enter First Name"}
                register={register("firstName")}
              />
            </div>
            <div className="basis-[50%]">
              <Input
                label={"Last Name"}
                type={"text"}
                placeholder={"Enter Last Name"}
                register={register("lastName")}
              />
            </div>
          </div>
          <div className="flex gap-4 sm:flex-row flex-col">
            <div className="basis-[50%]">
              <Input
                label={"Date of Birth"}
                type={"date"}
                register={register("dateOfBirth")}
              />
            </div>
            <div className="basis-[50%]">
              <label className="text-[15px] text-richblack-5 mb-1">
                Gender
              </label>
              <Select register={register("gender")}>
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
              register={register("contactNumber")}
            />
          </div>
          <div>
            <label className="text-[15px] text-richblack-5 mb-1">About</label>
            <TextArea
              placeholder={"Enter Bio Details"}
              register={register("about")}
            />
          </div>
          <div className="flex gap-4 justify-end items-center mt-4">
            <CancelButton />
            <FormButton extraClass="!mt-0" type="submit">
              Save
            </FormButton>
          </div>
        </form>
      </Section>
      {isPending && <SpinnerModal />}
    </>
  );
};

export default UserInformation;
