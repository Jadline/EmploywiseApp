import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import UsersList from "./Pages/UserList";
import Login from "./Pages/Login";

function App() {
  return (
    <Routes>
      {/* Redirect root path to UsersList */}
      <Route path="/" element={<Navigate replace to="/userslist" />} />

      {/* Public Route - UsersList (No protection) */}
      <Route element={<AppLayout />}>
        <Route path="/userslist" element={<UsersList />} />
      </Route>

      {/* Public Route - Login Page */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
