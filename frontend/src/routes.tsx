import { createBrowserRouter } from "react-router-dom";
import App from "./App";
// import DriverMainPage from 'src/pages/pages/driver/DriverMainPage';
// import DriverLayout from "@components/driver/DriverLayout";
import DriverMainPage from "./pages/driver/DriverMainPage";
import DriverLayout from "./components/driver/DriverLayout";
import DriverNaviPage from "./pages/driver/DriverNaviPage";
import DriverCarPage from "./pages/driver/DriverCarPage";
import DriverReportPage from "./pages/driver/DriverReportPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "driver",
    element: <DriverLayout></DriverLayout>,
    children: [
      { path: "", element: <DriverMainPage /> },
      { path: "navigation", element: <DriverNaviPage /> },
      { path: "car-control", element: <DriverCarPage /> },
      { path: "report", element: <DriverReportPage /> },
    ],
  },
]);

export default router;
