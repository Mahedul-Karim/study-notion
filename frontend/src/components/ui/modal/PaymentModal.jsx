import React from "react";
import Modal from "./Modal";
import LoadStripe from "../../../routes/LoadStripe";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import FormButton from "../inputs/FormButton";
import CancelButton from "../../dashboard/common/CancelButton";

const PaymentModal = ({ setShowModal }) => {
  return (
    <LoadStripe>
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
              <FormButton extraClass="!mt-0 w-full">Submit</FormButton>
              <CancelButton
                extraClass={"!text-richblack-25 w-full"}
                onClick={setShowModal?.bind(null, false)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </LoadStripe>
  );
};

export default PaymentModal;
