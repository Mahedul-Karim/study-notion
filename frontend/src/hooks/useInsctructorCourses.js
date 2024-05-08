import React from "react";
import { useData } from "./useData";

export const useInsctructorCourses = () => {
  const { data, isPending } = useData({
    key: ["instructorCourses"],
    endpoint: "course/instructor/course",
  });
  return { data, isPending };
};
