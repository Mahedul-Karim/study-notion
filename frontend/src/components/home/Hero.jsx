import { IoSearch, IoChevronDown } from "react-icons/io5";
import { NAV_CATEGORY } from "../util/data";
import { useState } from "react";
import Dropdown from "./search/Dropdown";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("category");
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const openDropdown = (e) => {
    if (e.target.classList.contains("dropdown")) {
      return;
    }
    setOpen((prev) => !prev);
  };

  const handleSearchClick = () => {
    if (category === "category") {
      toast.error("Please select a category");
      return;
    }

    navigate(`/course?category=${category}&search=${searchText?.toLowerCase()}`);
  };

  return (
    <div className="grid sm:grid-cols-[1fr_1fr] gap-4 mt-10 slideUp">
      <div className="flex flex-col justify-center gap-4">
        <h2 className="md:text-xl text-richblack-500 font-medium">
          The Leader in Online Learning
        </h2>
        <h1 className="text-3xl md:text-5xl font-bold max-w-[80%] md:max-w-[500px] !leading-[1.2] text-richblack-700">
          Engaging & Accessible Online Courses For All
        </h1>
        <p className="md:text-xl text-richblack-500 font-medium">
          Own your future learning new skills online
        </p>
        <div className="bg-white p-[4px] md:p-[5px] hidden 400px:flex items-center rounded-md 400px:rounded-full max-w-fit w-full 400px:gap-3 mt-4 gap-1">
          <Dropdown
            openDropdown={openDropdown}
            setOpen={setOpen}
            open={open}
            category={category}
            setCategory={setCategory}
          />
          <input
            type="text"
            placeholder="Search Courses...."
            className="grow-[1] shrink focus:outline-none text-richblack-700 bg-transparent"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="self-start bg-primary text-white p-[5px] md:p-[15px] flex items-center justify-center rounded-full text-2xl"
            onClick={handleSearchClick}
          >
            <IoSearch />
          </button>
        </div>
        <p className="md:text-xl text-richblack-500 font-medium max-w-[50%] leading-[1.7]">
          Trusted by over 15K Users worldwide since 2024
        </p>
      </div>
      <div>
        <img src={"/assets/object.png"} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Hero;
