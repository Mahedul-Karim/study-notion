import React, { useState } from "react";
import Modal from "./Modal";
import LoadStripe from "../../../routes/LoadStripe";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import FormButton from "../inputs/FormButton";
import CancelButton from "../../dashboard/common/CancelButton";
import toast from "react-hot-toast";
import { apiConnector } from "../../util/api";

import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../../../store/slices/profile";
import Spinner from "../../ui/Spinner";

const PaymentModal = ({ setShowModal, price, courseId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      const orderOption = {
        method: "POST",
        data: {
          amount: price,
        },
      };

      const sendOrder = await apiConnector("payment", orderOption);

      const clientSecret = sendOrder.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      const enrollOptions = {
        method: "PATCH",
        data: {
          courseId,
          userId: user._id,
        },
      };

      const enrollStudent = await apiConnector("payment", enrollOptions);

      setShowModal(false);
      toast.success("You have successfully enrolled to the course!");
      dispatch(setUser(enrollStudent.user));
    } catch (err) {
      setShowModal(false);
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      <div className="bg-richblack-800 rounded-md max-w-[450px] w-11/12 border border-solid border-richblack-400 flex flex-col gap-3 overflow-clip">
        <div className="bg-richblack-700 px-6 py-3 text-[22px] font-semibold flex items-center justify-between text-richblack-25">
          <h2>Make Payment</h2>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div>
            <CardNumberElement
              className="bg-richblack-700 text-base p-3 focus:outline-none rounded-lg w-full drop-shadow-[0_1px_rgba(255,255,255,0.5)] relative disabled:bg-richblack-500 disabled:cursor-not-allowed text-richblack-25 placeholder:text-richblack-25"
              options={{
                style: {
                  base: {
                    color: "rgb(219 221 234)",
                    fontSize: "17px",
                  },
                  "::placeholder": {
                    color: "rgb(219 221 234)",
                  },
                },
              }}
            />
          </div>
          <div className="flex 400px:flex-row flex-col items-center gap-4 w-full">
            <div className="w-full">
              <CardExpiryElement
                className="bg-richblack-700 text-base p-3 focus:outline-none rounded-lg w-full drop-shadow-[0_1px_rgba(255,255,255,0.5)] relative disabled:bg-richblack-500 disabled:cursor-not-allowed text-richblack-25"
                options={{
                  style: {
                    base: {
                      color: "rgb(219 221 234)",
                      fontSize: "17px",
                    },
                    "::placeholder": {
                      color: "rgb(219 221 234)",
                    },
                  },
                }}
              />
            </div>
            <div className="w-full">
              <CardCvcElement
                className="bg-richblack-700 text-base p-3 focus:outline-none rounded-lg w-full drop-shadow-[0_1px_rgba(255,255,255,0.5)] relative disabled:bg-richblack-500 disabled:cursor-not-allowed text-richblack-25"
                options={{
                  style: {
                    base: {
                      color: "rgb(219 221 234)",
                      fontSize: "17px",
                    },
                    "::placeholder": {
                      color: "rgb(219 221 234)",
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="flex 400px:flex-row flex-col items-center gap-2 mt-2 w-full">
            <FormButton extraClass="!mt-0 w-full" onClick={handlePayment}>
              {isLoading ? <Spinner button /> : "Submit"}
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

export default PaymentModal;
