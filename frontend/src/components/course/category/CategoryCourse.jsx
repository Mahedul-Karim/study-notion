import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../layout/Container";
import { NAV_CATEGORY } from "../../util/data";
import Card from "../Card";
import CourseSlider from "../CourseSlider";

const CategoryCourse = () => {
  const { categoryName } = useParams();
  const [selectedCategory, setSelectedCategory] = useState();
  const [active, setActive] = useState(0);
 

  useEffect(() => {
    const cat = NAV_CATEGORY.find(
      (el) => el.title === categoryName?.replace("-", " ")
    );
    setSelectedCategory(cat);
  }, [categoryName]);

  return (
    <>
      <div className="py-3 bg-richblack-700">
        <Container>
          <p className="text-sm text-richblack-200">
            Home / Category /{" "}
            <span className="capitalize text-yellow">
              {categoryName?.replace("-", " ")}
            </span>
          </p>
          <h1 className="text-3xl font-semibold text-richblack-25 capitalize mt-2">
            {categoryName?.replace("-", " ")}
          </h1>
          <p className="text-richblack-200 mt-2 w-[80%]">
            {selectedCategory?.description}
          </p>
        </Container>
      </div>
      <Container extraClass="py-3 text-richblack-25">
        <div className="text-sm flex gap-2 border-b border-solid border-richblack-700">
          <button
            className={`py-3 px-4  ${
              active === 0 && "border-b border-solid border-yellow text-yellow"
            }`}
            onClick={setActive.bind(null, 0)}
          >
            Most Popular
          </button>
          <button
            className={`py-3 px-4 ${
              active === 1 && "border-b border-solid border-yellow text-yellow"
            } `}
            onClick={setActive.bind(null, 1)}
          >
            New
          </button>
        </div>
        <div className="grid 400px:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className="mt-6">
          <CourseSlider />
          
        </div>
      </Container>
    </>
  );
};

export default CategoryCourse;
