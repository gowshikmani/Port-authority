import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Ships from "./pages/Ships";
import Cargo from "./pages/Cargo";
import Dock from "./pages/Dock";
import Containers from "./pages/Containers";
import Timeline from "./pages/Timeline";
import Maps from "./pages/Maps";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  const isAuthenticated = Boolean(localStorage.getItem("auth"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/"
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Dashboard />} />
          <Route path="ships" element={<Ships />} />
          <Route path="cargo" element={<Cargo />} />
          <Route path="docks" element={<Dock />} />
          <Route path="containers" element={<Containers />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="maps" element={<Maps />} />
        </Route>

        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;