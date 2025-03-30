import { Routes,Route,Navigate } from "react-router-dom"
import AppLayout from "./Pages/AppLayout"
import UsersList from "./Pages/UserList"
import Login from "./Pages/Login"
import { GlobalStyles } from "./Styles/GlobalStyles"
import ProtectedRoutes from "./Components/ProtectedRoutes"


function App(){
  return (
    
     <>
       <Routes>
        <Route element={<ProtectedRoutes/>}>
        <Route element={<AppLayout/>}>
        <Route path='/' index element={<Navigate replace to ='userslist'/>}/>
        <Route path='/userslist' element={<UsersList/>}/>
      </Route>
        </Route>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    
     </>
  )
}
export default App