import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const LoadStripe = ({ children }) => {
  const loadedStripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);

  return <Elements stripe={loadedStripe}>{children}</Elements>;
};

export default LoadStripe;
