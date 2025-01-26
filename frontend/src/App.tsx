import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import rootRoutes from "./routes/root.routes";

export default function App() {
  return (
    <>
      <RouterProvider router={rootRoutes} />
      <Toaster />
    </>
  );
}
