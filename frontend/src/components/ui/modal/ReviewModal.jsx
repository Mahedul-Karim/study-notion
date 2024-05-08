import React, { useState } from "react";
import Modal from "./Modal";
import FormButton from "../inputs/FormButton";
import Spinner from "../Spinner";
import CancelButton from "../../dashboard/common/CancelButton";
import { IoIosStarHalf, IoIosStar } from "react-icons/io";
import Label from "../../dashboard/common/form/inputs/Label";
import { useApi } from '../../../hooks/useApi'
import { toast } from 'react-hot-toast'
import { useSelector } from "react-redux";


const ReviewModal = ({ setShowModal }) => {
  

  const [rating, setRating] = useState(1);
  const [mouseOver, setMouseOver] = useState(0);
  const [reviews,setReview]=useState("");

  const { viewCourse } = useSelector(state => state.course);

  const courseId = viewCourse?.course?._id;

  const {mutate,isPending}=useApi({
    success:(data)=>{
        setShowModal(false);
        toast.success(data.message)
    },
    error:(err)=>{
        setShowModal(false);
        toast.error(err)
    }
  });


  const submitReview = ()=>{

    const options ={
        method:'POST',
        data:{
            courseId,
            rating,
            reviews
        }
    }
    mutate({endpoint:'rating',options})
  }

  return (
    <Modal>
      <div className="bg-richblack-800 rounded-md max-w-[450px] w-11/12 border border-solid border-richblack-400 flex flex-col gap-3 overflow-clip">
        <div className="bg-richblack-700 px-6 py-3 text-[22px] font-semibold flex items-center justify-between text-richblack-25">
          <h2>Write a Review</h2>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((rat, i) => (
                <span
                  key={i}
                  className="cursor-pointer"
                  onClick={setRating.bind(null, rat)}
                  onMouseOver={setMouseOver.bind(null, rat)}
                  onMouseLeave={setMouseOver.bind(null, 0)}
                >
                  {rat <= rating || rat <= mouseOver ? (
                    <IoIosStar color="yellow" size={20} />
                  ) : (
                    <IoIosStar color="gray" size={20} />
                  )}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Add Your experiencs</Label>
              <textarea
                className="bg-richblack-700 text-base p-3 focus:outline-none rounded-lg w-full drop-shadow-[0_1px_rgba(255,255,255,0.5)] relative disabled:bg-richblack-500 disabled:cursor-not-allowed text-richblack-25"
                rows={4}
                placeholder={"Write your review about the course"}
                value={reviews}
                onChange={(e)=>setReview(e.target.value)}
              />
            </div>
          </div>
          <div className="flex 400px:flex-row flex-col items-center gap-2 mt-2 w-full">
            <FormButton extraClass="!mt-0 w-full flex items-center justify-center" onClick={submitReview}>
              {isPending ? <Spinner button /> : "Submit"}
            </FormButton>
            <CancelButton
              extraClass={"!text-richblack-25 w-full"}
              onClick={setShowModal?.bind(null, false)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewModal;
