import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { getItem, removeItem } from "./utils/storage";
import { users } from "./data/users";

export default function MainRoutes() {
  function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem("token");

    const findUser = users.find((user) => user.id === Number(isAuthenticated));

    if (!findUser) {
      removeItem("token");
    }

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
  }

  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route element={<ProtectedRoutes redirectTo={"/login"} />}>
        <Route path="/main" element={<Main />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
