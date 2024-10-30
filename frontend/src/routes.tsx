import { createBrowserRouter } from "react-router-dom";
// Driver
// import DriverMainPage from 'src/pages/pages/driver/DriverMainPage';
// import DriverLayout from "@components/driver/DriverLayout";
import DriverMainPage from "./pages/driver/DriverMainPage";
import DriverLayout from "./components/driver/DriverLayout";
import DriverNaviPage from "./pages/driver/DriverNaviPage";
import DriverCarPage from "./pages/driver/DriverCarPage";
import DriverReportPage from "./pages/driver/DriverReportPage";

// Manager
import Layout from "@components/manager/Layout";
import MainPage from "@pages/manager/MainPage";
// import DashboardPage from "@pages/manager/DashboardPage";
// import DriverListPage from "@/pages/manager/DriverListPage";
// import ReportPage from "@pages/manager/ReportPage";
// import HistoryPage from "@pages/manager/HistoryPage";

const router = createBrowserRouter([
  {
    path: "/manager",
    element: <Layout />,
    children: [
      { path: "", element: <MainPage /> },
      // { path: "dashboard", element: <DashboardPage /> },
      // { path: "report", element: <DriverListPage /> },
      // { path: "report/:id", element: <ReportPage /> },
      // { path: "history", element: <HistoryPage /> },
    ],
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