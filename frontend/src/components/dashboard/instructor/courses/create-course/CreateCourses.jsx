import React, { useState } from "react";
import Heading from "../../../common/Heading";
import Section from "../../../common/Section";
import Tracking from "./Tracking";
import { TRCKING_BAR } from "../../../../util/data";
import CourseForm from "../../../common/form/CourseForm";
import CourseBuilder from "../../../common/form/CourseBuilder";

const CreateCourses = () => {
  const [active, setActive] = useState(1);
  const [isFormEdit, setIsFormEdit] = useState(false);

  return (
    <>
      <Heading>Add Course</Heading>
      <div className="max-w-[550px]">
        <div className="flex items-center mb-6 w-full justify-center">
          {TRCKING_BAR.map((track, i) => (
            <Tracking track={track} key={i} active={active} />
          ))}
        </div>
        <Section>
          {active === 1 && (
            <CourseForm
              active={active}
              setActive={setActive}
              isFormEdit={isFormEdit}
              setIsFormEdit={setIsFormEdit}
            />
          )}
          {active === 2 && (
            <CourseBuilder setActive={setActive} setIsEditing={setIsFormEdit} />
          )}
        </Section>
      </div>
    </>
  );
};

export default CreateCourses;
