import React from "react";
import { useSelector } from "react-redux";

const Details = () => {

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex flex-col gap-8">
      <h4 className="font-bold">Personal Details</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
        <div>
          <p className="text-[14px] text-richblack-300">First Name</p>
          <p className="text-[15px] font-bold">{user?.firstName}</p>
        </div>
        <div>
          <p className="text-[14px] text-richblack-300">Last Name</p>
          <p className="text-[15px] font-bold">{user?.lastName}</p>
        </div>
        <div>
          <p className="text-[14px] text-richblack-300">Email</p>
          <p className="text-[15px] font-bold">{user?.email}</p>
        </div>
        <div>
          <p className="text-[14px] text-richblack-300">Contact Number</p>
          <p className="text-[15px] font-bold">{user?.additionalDetails?.contactNumber || '+00000000000'}</p>
        </div>
        {user?.additionalDetails?.dateOfBirth && <div>
          <p className="text-[14px] text-richblack-300">Date of Birth</p>
          <p className="text-[15px] font-bold">{user?.additionalDetails?.dateOfBirth }</p>
        </div>}
        {user?.additionalDetails?.gender && <div>
          <p className="text-[14px] text-richblack-300">Gender</p>
          <p className="text-[15px] font-bold">{user?.additionalDetails?.gender }</p>
        </div>}
      </div>
    </div>
  );
};

export default Details;
