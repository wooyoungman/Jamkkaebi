import { createBrowserRouter } from "react-router-dom";
// Driver
// import DriverMainPage from 'src/pages/pages/driver/DriverMainPage';
// import DriverLayout from "@components/driver/DriverLayout";
import DriverMainPage from "./pages/driver/DriverMainPage";
import DriverLayout from "./components/driver/DriverLayout";
import DriverNaviPage from "./pages/driver/DriverNaviPage";
import DriverCarPage from "./pages/driver/DriverCarPage";
import DriverReportPage from "./pages/driver/DriverReportPage";
import DriverTempPage from "./pages/driver/DriverTempPage";

// Manager
import Layout from "@components/manager/Layout";
import ProtectedRoute from "@components/manager/ProtectedRoute";
import MainPage from "@pages/manager/MainPage";
import DashboardPage from "@pages/manager/DashboardPage";
import DriverListPage from "@/pages/manager/DriverListPage";
import ReportPage from "@pages/manager/ReportPage";
import HistoryPage from "@pages/manager/HistoryPage";

const router = createBrowserRouter([
  {
    path: "/manager",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute requireAuth={false}>
            <MainPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "report",
        element: (
          <ProtectedRoute>
            <DriverListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "report/:id",
        element: (
          <ProtectedRoute>
            <ReportPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "history",
        element: (
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "driver",
    element: <DriverLayout />,
    children: [
      { path: "", element: <DriverMainPage /> },
      { path: "navigation", element: <DriverNaviPage /> },
      { path: "car-control", element: <DriverCarPage /> },
      { path: "report", element: <DriverReportPage /> },
      { path: "temp", element: <DriverTempPage /> },
    ],
  },
]);

export default router;
