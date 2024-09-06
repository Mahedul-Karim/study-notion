import React, { useState } from "react";

import PieChart from "./PieChart";
import { useInsctructorCourses } from "../../../../hooks/useInsctructorCourses";

import Card from "../../../course/Card";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../ui/Spinner";
import { useSelector } from "react-redux";
import Heading from "../../common/Heading";
import Sales from "./Sales";

const Analytics = () => {

  const { data, isPending } = useInsctructorCourses();

  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const totalStudents = data?.courses?.flatMap(
    (course) => course.studentsEnrolled
  );

  const stats = [
    {
      label: "Total Courses",
      data: data?.courses?.length,
    },
    {
      label: "Students Enrolled",
      data: totalStudents?.length,
    },
    {
      label: "Total Earnings",
      data: "$565",
    },
  ];

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="text-richblack-700">
      <Heading>Hi, {user?.firstName}!</Heading>
      <p className="text-sm text-richblack-300 my-1">
        Let&apos;s start something new
      </p>
      
      <div className="grid md:grid-cols-[1fr_0.4fr] gap-4 my-4">
        <div className="bg-background border border-solid border-border rounded-md p-4">
        <p className="font-bold text-lg text-richblack-600">Visualize</p>
          <PieChart />
        </div>
        <div className="bg-background border border-solid border-border rounded-md p-4">
          <h4 className="font-bold text-lg">Statistics</h4>
          <div className="flex flex-col gap-2 mt-4">
            {stats?.map((stat, index) => (
              <div key={index}>
                <p className="text-lg text-richblack-600">{stat.label}</p>
                <p className="text-richblack-500 font-bold text-2xl">
                  {stat.data}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-background border border-solid border-border mt-4 p-4 rounded-md">
      <p className="font-bold text-lg text-richblack-600 mb-4">Overview</p>
        <Sales />
      </div>
      <div className="bg-background border border-solid border-border mt-4 p-4 rounded-md">
        <div className="flex items-center mb-4 justify-between">
          <h4 className="text-lg font-bold text-richblack-600">Your Courses</h4>
          <button
            className="text-secondary text-xs"
            onClick={() => navigate("/dashboard/instructor/my-courses")}
          >
            View All
          </button>
        </div>
        <div className="grid 400px:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.courses?.slice(0, 3)?.map((course) => (
            <Card key={course._id} course={course} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Analytics;
