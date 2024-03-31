import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import VerifyEmail from "../pages/VerifyEmail";
import ForgotPasswordPage from "../pages/ForgotPassword";
import AboutUsPage from "../pages/AboutUs";
import Error from "../pages/Error";
import UserDashboardPage from "../pages/dashboard/user/UserDashboardPage";
import UserProfile from "../components/dashboard/user/profile/UserProfile";
import EnrolledCourses from "../components/dashboard/user/enrolled-courses/EnrolledCourses";
import Cart from "../components/dashboard/user/cart/Cart";
import UserSettings from "../components/dashboard/user/settings/UserSettings";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index:true,
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/about",
        element: <AboutUsPage />,
      },
      {
        path: "/dashboard/user",
        element: <UserDashboardPage />,
        children: [
          {
            
            element: <UserProfile />,
            index: true,
          },
          {
            path: "/dashboard/user/enrolled-courses",
            element: <EnrolledCourses />,
          },
          {
            path: "/dashboard/user/cart",
            element: <Cart />,
          },
          {
            path:'/dashboard/user/settings',
            element:<UserSettings />
          }
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
