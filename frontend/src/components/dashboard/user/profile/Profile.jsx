import React from "react";
import Img from "../../common/Img";

const Profile = () => {
  return (
    <div className="flex 400px:items-center gap-3 flex-col 400px:flex-row">
      <Img
        src={"https://api.dicebear.com/5.x/initials/svg?seed=Test User"}
        alt=""
      />

      <div>
        <h4 className="font-bold 400px:text-base text-[14px]">Test User</h4>
        <p className="text-[12px] 400px:text-[14px] text-richblack-300">
          karimrupo16@gmail.com
        </p>
      </div>
    </div>
  );
};

export default Profile;
