import { Navigate, useLocation } from "react-router-dom";
import ownerIsLoggedIn from "./functions/ownerIsLoggedIn";

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  if (!ownerIsLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default RequireAuth;
