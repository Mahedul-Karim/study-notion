import { combineReducers } from "@reduxjs/toolkit";
import auth from "../slices/auth";
import profile from "../slices/profile";

export const rootReducer = combineReducers({
  auth,
  profile,
});

export const signupReducer = (state, action) => {
  switch (action.type) {
    case "FIRST_NAME":
      return {
        ...state,
        firstName: action.payload,
      };
    case "LAST_NAME":
      return {
        ...state,
        lastName: action.payload,
      };
    case "EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "CONFIRM_PASSWORD":
      return {
        ...state,
        confirmPassword: action.payload,
      };
    case "ACCOUNT_TYPE":
      return {
        ...state,
        accountType: action.payload,
      };
    default:
      return state;
  }
};
