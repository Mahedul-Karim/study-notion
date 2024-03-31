import React from "react";
import Input from "../ui/inputs/Input";

const ContactUs = () => {
  return (
    <>
      <h5 className="text-4xl font-bold text-richblack-5">Get in Touch</h5>
      <p className="text-richblack-300 mt-2">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <form className="flex flex-col mt-10 gap-4 max-w-[400px]" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center gap-6">
          <div>
            <Input
              label={"First Name"}
              placeholder={"Enter First Name"}
              type={"text"}
            />
          </div>
          <div>
            <Input
              label={"Last Name"}
              placeholder={"Enter Last Name"}
              type={"text"}
            />
          </div>
        </div>
        <div>
            <Input
              label={"Email"}
              placeholder={"Enter Email Address"}
              type={"email"}
            />
          </div>
      </form>
    </>
  );
};

export default ContactUs;
