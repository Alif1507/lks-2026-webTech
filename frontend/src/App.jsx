import { useAuth } from "./lib/Auth"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import Login from "./pages/Login";
import Home from "./pages/Home";
import Department from "./pages/Department";
import Doctor from "./pages/Doctor";
import Schedule from "./pages/schedule";
import DepartmentEdit from "./pages/edit/DepartmentEdit";
import DoctorEdit from "./pages/DoctorEdit";

const PrivateWrapper = () => {
  const { user } = useAuth();
  const isAuth = user || localStorage.getItem("token")
  return isAuth ? <Outlet /> : <Navigate to="/" replace />

}

const App = () => {
  const { user } = useAuth()
  const isAuth = user || localStorage.getItem("token")


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to="/home" replace/> : <Login />} />
        <Route element={<PrivateWrapper />}>
            <Route path="/home" element={<Home />} />
            <Route path="/department" element={<Department />} />
            <Route path="/department/:id" element={<DepartmentEdit />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/doctor/:id" element={<DoctorEdit />} />
            <Route path="/schedule" element={<Schedule />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} replace />
      </Routes>
    </BrowserRouter>
  )
}

export default App
