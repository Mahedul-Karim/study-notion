import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const [searchText, setSearchText] = useState(search);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!searchText) {
        searchParams.delete("search");
      } else {
        searchParams.set("search", searchText);
      }

      setSearchParams(searchParams);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchText]);

  return (
    <div className="flex justify-end">
      <div className="bg-white w-full 400px:w-[60%] md:w-[30%] flex items-center px-3 py-2 gap-2 rounded-md border border-solid border-[#f1f2ff]">
        <input
          type="text"
          placeholder="Search Our Courses..."
          className="focus:outline-none bg-transparent w-full placeholder:text-sm text-sm text-richblack-600"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <span className="flex items-center justify-center text-2xl cursor-pointer">
          <CiSearch className="text-primary" />
        </span>
      </div>
    </div>
  );
};

export default Search;
