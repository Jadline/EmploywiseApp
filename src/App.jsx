import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import UsersList from "./Pages/UserList";
import Login from "./Pages/Login";
import ProtectedRoutes from "./Components/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
       
        <Route path="/" element={<Navigate replace to="/login" />} />

       
        <Route path="/login" element={<Login />} />

       
        
          <Route element={<AppLayout />}>
            <Route path="/userslist" element={<UsersList />} />
          </Route>
        
      </Routes>
    </>
  );
}

export default App;
