import { Navigate, useLocation } from "react-router-dom";
import userIsLoggedIn from "./functions/userIsLoggedIn";

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  if (!userIsLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default RequireAuth;
