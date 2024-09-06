import React, { useState } from "react";
import Modal from "./Modal";
import FormButton from "../inputs/FormButton";
import CancelButton from "../../dashboard/common/CancelButton";
import { IoIosStarHalf, IoIosStar } from "react-icons/io";
import Label from "../../dashboard/common/form/inputs/Label";
import { useApi } from '../../../hooks/useApi'
import { useSelector } from "react-redux";
import { useToast } from "../../../hooks/useToast";


const ReviewModal = ({ setShowModal }) => {
  

  const [rating, setRating] = useState(1);
  const [mouseOver, setMouseOver] = useState(0);
  const [reviews,setReview]=useState("");

  const { success, error, warning } = useToast();

  const { viewCourse } = useSelector(state => state.course);

  const courseId = viewCourse?.course?._id;

  const {mutate,isPending}=useApi({
    success:(data)=>{
        setShowModal(false);
        success(data.message)
    },
    error:(err)=>{
        setShowModal(false);
        error(err)
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
      <div className="rounded-xl max-w-[450px] w-11/12 border border-solid border-border flex flex-col overflow-clip">
        <div className="bg-background border-b border-border border-solid px-6 py-3 text-[22px] font-semibold flex items-center justify-between text-richblack-600">
          <h2>Write a Review</h2>
        </div>

        <div className="p-4 flex flex-col gap-3 bg-white">
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
                    <IoIosStar color="#ffb931" size={20} />
                  ) : (
                    <IoIosStar color="gray" size={20} />
                  )}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <Label >Add Your experiencs</Label>
              <textarea
                className="bg-background border border-solid border-border text-base p-3 focus:outline-none rounded-lg w-full drop-shadow-[0_1px_rgba(255,255,255,0.5)] relative disabled:bg-grey-5 disabled:cursor-not-allowed text-richblack-600"
                rows={4}
                placeholder={"Write your review about the course"}
                value={reviews}
                onChange={(e)=>setReview(e.target.value)}
              />
            </div>
          </div>
          <div className="flex 400px:flex-row flex-col items-center gap-2 mt-2 w-full">
            <FormButton extraClass="!mt-0 w-full flex items-center bg-primary justify-center" onClick={submitReview}>
              {isPending ? "Submitting..." : "Submit"}
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
