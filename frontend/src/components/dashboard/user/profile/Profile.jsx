import React from "react";
import Img from "../../common/Img";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex 400px:items-center gap-3 flex-col 400px:flex-row">
      <Img src={user?.image} alt="" />

      <div>
        <h4 className="font-bold 400px:text-base text-[14px]">
          {user?.firstName + " " + user?.lastName}
        </h4>
        <p className="text-[12px] 400px:text-[14px] text-richblack-300">
          {user?.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
