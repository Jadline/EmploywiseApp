import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import UsersList from "./Pages/UserList";
import Login from "./Pages/Login";
import ProtectedRoutes from "./Components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      {/* Redirect root path to UsersList */}
      <Route path="/" element={<Navigate replace to="/login" />} />

      {/* Public Route - Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes - Only accessible if logged in */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/userslist" element={<UsersList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
