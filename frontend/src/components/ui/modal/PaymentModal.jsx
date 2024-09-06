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
import { apiConnector } from "../../util/api";

import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../../../store/slices/profile";
import { useToast } from "../../../hooks/useToast";

const PaymentModal = ({ setShowModal, price, courseId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { success, error, warning } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const handlePayment = async () => {
    if (!user) {
      warning("Login first to enroll in a course!");
      return;
    }

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
      success("You have successfully enrolled to the course!");
      dispatch(setUser(enrollStudent.user));
    } catch (err) {
      setShowModal(false);
      error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      <div className="bg-white rounded-md max-w-[450px] w-11/12 border border-solid border-border flex flex-col gap-3 overflow-clip">
        <div className="bg-background px-6 py-3 text-[22px] font-semibold flex items-center justify-between text-richblack-700">
          <h2>Make Payment</h2>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div>
            <CardNumberElement
              className="bg-white border border-solid border-border text-base p-3 focus:outline-none rounded-lg w-full relative disabled:bg-grey-5 disabled:cursor-not-allowed text-richblack-700 placeholder:text-richblack-700"
              options={{
                style: {
                  base: {
                    color: "#2c333f",
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
                className="bg-white border border-solid border-border text-base p-3 focus:outline-none rounded-lg w-full relative disabled:bg-grey-5 disabled:cursor-not-allowed text-richblack-700 placeholder:text-richblack-700"
                options={{
                  style: {
                    base: {
                      color: "#2c333f",
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
                className="bg-white border border-solid border-border text-base p-3 focus:outline-none rounded-lg w-full relative disabled:bg-grey-5 disabled:cursor-not-allowed text-richblack-700 placeholder:text-richblack-700"
                options={{
                  style: {
                    base: {
                      color: "#2c333f",
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
            <FormButton
              extraClass="!mt-0 w-full bg-tertiary disabled:bg-tertiary/[0.4]"
              disabled={isLoading}
              onClick={handlePayment}
            >
              {isLoading ? "Submitting..." : "Submit"}
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
