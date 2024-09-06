import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";

import { useEffect } from "react";
import { axiosInstance } from "./components/util/api";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/profile";
import { socket } from "./components/util/helpers";
import { setOnlineUsers } from "./store/slices/chat";
import Toast from "./components/ui/Toast";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connection was successfull!");
    });
  }, []);

  useEffect(() => {
    (async function () {
      const data = await axiosInstance({
        url: "user/me",
        method: "GET",
      });
      if (!data.data.success) return;
      dispatch(setUser(data?.data?.user));
      socket.emit("setUser", data?.data?.user._id);
      socket.on("getUsers", (user) => {
        dispatch(setOnlineUsers(user));
      });
    })();
  }, []);

  return (
    <>
      
      <RouterProvider router={routes} />
      <Toast />
    </>
  );
}

export default App;
