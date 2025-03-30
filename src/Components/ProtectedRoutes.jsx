import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const token = localStorage.getItem("auth_token");
  
  console.log("Auth Token in ProtectedRoutes:", token); // Debugging

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoutes;
