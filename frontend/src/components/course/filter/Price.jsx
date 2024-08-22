import React from "react";
import FilterCard from "./common/FilterCard";
import Title from "./common/Title";
import List from "./common/List";
import { useSearchParams } from "react-router-dom";

const Price = () => {
  const pricingArray = [
    {
      value: "all",
    },
    {
      value: "paid",
    },
    {
      value: "free",
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("price") || "all";

  const handleSearchParams = (e) => {
    searchParams.set("price", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <FilterCard>
      <Title>Price</Title>

      <ul className="py-2 flex flex-col gap-2 ">
        {pricingArray.map((ins, i) => (
          <List
            key={i}
            i={i}
            value={ins.value}
            checkId={"price"}
            label={ins.value}
            query={query}
            onChange={handleSearchParams}
          />
        ))}
      </ul>
    </FilterCard>
  );
};

export default Price;
