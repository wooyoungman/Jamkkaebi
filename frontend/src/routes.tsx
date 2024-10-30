import { createBrowserRouter } from "react-router-dom";
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
]);

export default router;
