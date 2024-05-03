import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { Toaster } from "react-hot-toast";

import { useEffect } from "react";
import { axiosInstance } from "./components/util/api";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/profile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const data = await axiosInstance({
        url: "user/me",
        method: "GET",
      });
      if (!data.data.success) return;
      dispatch(setUser(data?.data?.user));
    })();
  }, []);

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "5px 8px",
            backgroundColor: "#fff",
            color: "#243757",
            zIndex: 99999999,
          },
        }}
      />
    </>
  );
}

export default App;
