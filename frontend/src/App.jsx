import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  
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
            zIndex:99999999
          },
        }}
      />
    </>
  );
}

export default App;
