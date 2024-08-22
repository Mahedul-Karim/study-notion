import React, { useEffect } from "react";
import { useData } from "../../../hooks/useData";
import FilterCard from "./common/FilterCard";
import Title from "./common/Title";
import List from "./common/List";
import { useSearchParams } from "react-router-dom";

const Instructors = () => {
  const { data, isPending } = useData({
    key: ["instructors"],
    endpoint: "/user/instructors",
  });

  const [searchParams, setSearchParams] = useSearchParams();


  const query = searchParams.get("instructor") || "all";

  const handleSearchParams = (e) => {
    searchParams.set("instructor", e.target.value);
    setSearchParams(searchParams);
  };

  const newArray = data?.instructors?.map((ins) => ({
    name: ins?.firstName + " " + ins.lastName,
  }));

 

  return (
    <FilterCard>
      <Title>Instructors</Title>

      <ul className="py-2 flex flex-col gap-2 ">
        {newArray?.length > 0 &&
          [{ name: "all" }, ...newArray].map((ins, i) => (
            <List
              key={i}
              i={i}
              value={ins.name}
              checkId={"instructor"}
              label={ins.name}
              query={query}
              onChange={handleSearchParams}
            />
          ))}
      </ul>
    </FilterCard>
  );
};

export default Instructors;
