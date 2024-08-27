import React, { useState } from "react";
import FormButton from "../../ui/inputs/FormButton";
import { FaRegShareSquare } from "react-icons/fa";
import { toast } from "react-hot-toast";
import PaymentModal from "../../ui/modal/PaymentModal";
import { formatCurrency } from "../../util/format";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadStripe from "../../../routes/LoadStripe";
import { useApi } from "../../../hooks/useApi";

const Action = ({ thumbnail, price, instructorId, instructions, courseId }) => {
  const [showModal, setShowModal] = useState(false);

  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const { mutate, isPending } = useApi({
    success: (data) => {
      toast.success(data?.message);
    },
    error: (err) => {
      toast.error(err);
    },
  });

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success("URL copied to clipboard");
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  const handleAddToCart = () => {
    const userId = user?._id;

    if (!userId) {
      toast.error("Login first to add to wishlist");
      return;
    }

    const options = {
      method: "POST",
      data: { userId, courseId },
    };

    mutate({ endpoint: "/course/cart", options });
  };

  return (
    <aside className="bg-white border border-solid border-border rounded-xl p-4 flex flex-col gap-2 h-max">
      <img className="aspect-video object-cover rounded-xl" src={thumbnail} />
      <h4 className="font-bold text-2xl text-secondary">
        {formatCurrency(price)}
      </h4>
      {user?._id !== instructorId && (
        <>
          {!user?.courses?.includes(courseId) ? (
            <>
              {" "}
              <FormButton
                extraClass="!mt-0 bg-primary"
                onClick={setShowModal.bind(null, true)}
              >
                Buy Now
              </FormButton>
              <button
                className="rounded-lg bg-richblack-800 py-[6px] 400px:py-[8px] px-[8px] 400px:px-[12px] font-medium text-richblack-25 text-[14px] 400px:text-base disabled:bg-richblack-800/[0.7] disabled:cursor-not-allowed"
                disabled={isPending}
                onClick={handleAddToCart}
              >
                {isPending ? "Adding..." : "Add to Wishlist"}
              </button>{" "}
            </>
          ) : (
            <FormButton
              extraClass="mt-0"
              onClick={() => navigate("/dashboard/user/enrolled-courses")}
            >
              Go To Course
            </FormButton>
          )}
        </>
      )}

      <p className="text-sm text-center text-richblack-700">
        30-Day Money-Back Guarantee
      </p>
      <div className="mt-4">
        <p className="text-xl font-bold">This course includes:</p>
        <ul className="text-secondary gap-1 text-sm mt-3 flex flex-col">
          {instructions.map((ins, index) => (
            <li className="flex items-center gap-2" key={index}>
              <span className="text-lg">✓</span>
              {ins}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="flex gap-2 items-center justify-center text-tertiary"
        onClick={copyToClipboard}
      >
        <FaRegShareSquare />
        Share
      </button>
      {showModal && (
        <LoadStripe>
          <PaymentModal
            setShowModal={setShowModal}
            price={price * 100}
            courseId={courseId}
          />
        </LoadStripe>
      )}
    </aside>
  );
};

export default Action;
