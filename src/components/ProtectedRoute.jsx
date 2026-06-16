import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../lib/auth";

export default function ProtectedRoute({ role, children }) {
	const location = useLocation();
	const user = getUser();

	if (!user) {
		return <Navigate to="/login" replace state={{ from: location.pathname }} />;
	}

	if (role && user.role !== role) {
		return <Navigate to="/dashboard" replace />;
	}

	return children;
}
