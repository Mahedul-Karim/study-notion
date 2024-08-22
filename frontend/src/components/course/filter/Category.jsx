import React from "react";
import { NAV_CATEGORY } from "../../util/data";
import FilterCard from "./common/FilterCard";
import Title from "./common/Title";
import List from "./common/List";
import { useSearchParams } from "react-router-dom";

const Category = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("category") || "all";

  const handleSearchParams = (e) => {
    searchParams.set("category", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <FilterCard>
      <Title>Course Categories</Title>

      <ul className="py-2 flex flex-col gap-2 ">
        {NAV_CATEGORY.map((nav, i) => (
          <List
            key={i}
            i={i}
            value={nav.title}
            checkId={"category"}
            label={nav.title}
            query={query}
            onChange={handleSearchParams}
          />
        ))}
      </ul>
    </FilterCard>
  );
};

export default Category;
