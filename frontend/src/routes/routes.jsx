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
import InstructorDashboardPage from "../pages/dashboard/instructor/InstructorDashboardPage";
import InstructorProfile from "../components/dashboard/instructor/profile/InstructorProfile";
import InstructorSettings from "../components/dashboard/instructor/settings/InstructorSettings";
import MyCourses from "../components/dashboard/instructor/courses/my-course/MyCourses";
import CreateCourses from "../components/dashboard/instructor/courses/create-course/CreateCourses";
import Analytics from "../components/dashboard/instructor/analytics/Analytics";
import Course from "../pages/course/Course";
import CourseDetailsPage from "../pages/course/CourseDetailsPage";
import ViewCoursePage from "../pages/course/ViewCoursePage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
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
            path: "/dashboard/user/settings",
            element: <UserSettings />,
          },
        ],
      },
      {
        path: "/dashboard/instructor",
        element: <InstructorDashboardPage />,
        children: [
          {
            element: <InstructorProfile />,
            index: true,
          },
          {
            path: "/dashboard/instructor/settings",
            element: <InstructorSettings />,
          },
          {
            path: "/dashboard/instructor/my-courses",
            element: <MyCourses />,
          },
          {
            path: "/dashboard/instructor/add-course",
            element: <CreateCourses />,
          },
          {
            path: "/dashboard/instructor/analytics",
            element: <Analytics />,
          },
        ],
      },
      {
        path: "/category/:categoryName",
        element: <Course />,
      },
      {
        path: "/course/:courseName",
        element: <CourseDetailsPage />,
      },
      {
        path: "/view-course",
        element: <ViewCoursePage />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
