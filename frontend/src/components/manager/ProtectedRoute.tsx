import { useAtom } from "jotai";
import { Navigate, useLocation } from "react-router-dom";
import { authAtom } from "@atoms/manager/user";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean; // true: 인증 필요, false: 비인증 필요
}

const ProtectedRoute = ({
  children,
  requireAuth = true,
}: ProtectedRouteProps) => {
  const [auth] = useAtom(authAtom);
  const location = useLocation();

  if (requireAuth && !auth.isAuthenticated) {
    // 인증이 필요한데 로그인이 안 되어 있으면 로그인 페이지로
    return <Navigate to="/manager" state={{ from: location }} replace />;
  }

  if (!requireAuth && auth.isAuthenticated) {
    // 비인증이 필요한데 이미 로그인되어 있으면 대시보드로
    return <Navigate to="/manager/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
