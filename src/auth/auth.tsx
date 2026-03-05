import { Navigate } from "react-router-dom";
import { getUserRole } from "@/auth/auth";
// Role-based ProtectedRoute
export function RoleProtectedRoute({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) {
    const userRole = getUserRole();
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return children;
}
