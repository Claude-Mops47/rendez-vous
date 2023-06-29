import { Flowbite } from "flowbite-react";
import React from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import DefaultFooter from "./components/Footer";
import DefaultNavbar from "./components/Navbar";
import HomePage from "./pages/Home";
import AdminPage from "./pages/Admin";
import ManagerPage from "./pages/Manager";
import { AuthLayout } from "./auth/AuthLayout";
import { DefaultAlert } from "./components/Alert";
import { history } from "./helpers";
import { useSelector } from "react-redux";

function PrivateRoute({ role, children }) {
  const auth = useSelector((state) => state.auth);

  if (!auth.value) {
    return <Navigate to="/auth/login" state={{ from: history.location }} />;
  }

  if (role && auth.value.role !== role && auth.value.role !== 'Admin') {
    return <Navigate to="/" state={{ from: history.location }} />;
  }
  return <Outlet>{children}</Outlet>;
}

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <>
      <Flowbite>
        <DefaultNavbar />
        <DefaultAlert />
        <div className="flex-grow">
          <Routes>
            <Route exact path="auth/*" element={<AuthLayout />} />
           
            {/* Admin routes */}
            <Route element={<PrivateRoute role="Admin" />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            {/* Manager routes */}
            <Route element={<PrivateRoute role="Manager" />}>
              <Route path="/manager" element={<ManagerPage />} />
            </Route>

            {/* User routes */}
            <Route element={<PrivateRoute role="User" />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <DefaultFooter />
      </Flowbite>
    </>
  );
}

export default App;
