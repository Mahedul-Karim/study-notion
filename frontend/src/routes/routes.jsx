import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import Fallback from "./Fallback";

const Main = lazy(() => import("../pages/Main"));
const Home = lazy(() => import("../pages/Home"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Login = lazy(() => import("../pages/Login"));
const VerifyEmail = lazy(() => import("../pages/VerifyEmail"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPassword"));
const AboutUsPage = lazy(() => import("../pages/AboutUs"));
const FAQPage = lazy(() => import("../pages/FAQ"));
const UserDashboardPage = lazy(() =>
  import("../pages/dashboard/user/UserDashboardPage")
);
const UserProfile = lazy(() =>
  import("../components/dashboard/user/profile/UserProfile")
);
const EnrolledCourses = lazy(() =>
  import("../components/dashboard/user/enrolled-courses/EnrolledCourses")
);
const Chat = lazy(() => import("../components/dashboard/user/chat/Chat"));
const Error = lazy(() => import("../pages/Error"));
const Cart = lazy(() => import("../components/dashboard/user/cart/Cart"));
const UserSettings = lazy(() =>
  import("../components/dashboard/user/settings/UserSettings")
);
const InstructorDashboardPage = lazy(() =>
  import("../pages/dashboard/instructor/InstructorDashboardPage")
);
const InstructorProfile = lazy(() =>
  import("../components/dashboard/instructor/profile/InstructorProfile")
);
const InstructorSettings = lazy(() =>
  import("../components/dashboard/instructor/settings/InstructorSettings")
);
const MyCourses = lazy(() =>
  import("../components/dashboard/instructor/courses/my-course/MyCourses")
);
const CreateCourses = lazy(() =>
  import(
    "../components/dashboard/instructor/courses/create-course/CreateCourses"
  )
);
const Analytics = lazy(() =>
  import("../components/dashboard/instructor/analytics/Analytics")
);
const Course = lazy(() => import("../pages/course/Course"));
const CourseDetailsPage = lazy(() =>
  import("../pages/course/CourseDetailsPage")
);
const ViewCoursePage = lazy(() => import("../pages/course/ViewCoursePage"));
const EditCoursePage = lazy(() => import("../pages/course/EditCoursePage"));
const InstructorChat = lazy(() =>
  import("../components/dashboard/instructor/chat/Chat")
);

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Fallback>
        {" "}
        <Main />
      </Fallback>
    ),
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
        path: "/faq",
        element: <FAQPage />,
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
            path: "/dashboard/user/chats",
            element: <Chat />,
          },
          {
            path: "/dashboard/user/wishlist",
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
            path: "/dashboard/instructor/chats",
            element: <InstructorChat />,
          },
          {
            path: "/dashboard/instructor/edit-course",
            element: <EditCoursePage />,
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
        path: "/course",
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
